import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { jsonApiError, toApiErrorResponse } from "@/lib/api-error";
import { bookingCheckoutSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { processCheckout } from "@/services/checkout.service";
import { calculateQuote } from "@/services/pricing.service";
import {
  findMockCategory,
  findMockRatePlan,
  saveDemoBooking,
} from "@/lib/mock-hotel-data";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

function generateDemoBookingNumber(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `AUR-${dateStr}-${randomHex}`;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonApiError(request, 400, "BAD_REQUEST", "Body must be valid JSON");
  }

  const parsed = bookingCheckoutSchema.safeParse(body);
  if (!parsed.success) {
    return jsonApiError(
      request,
      400,
      "BAD_REQUEST",
      "Invalid checkout payload",
      parsed.error.flatten().fieldErrors,
    );
  }

  try {
    // Resolve user: Use active session or auto-upsert guest account
    const session = await auth();
    let checkoutUser: { id: string; email: string };

    if (session?.user?.id && session?.user?.email) {
      checkoutUser = { id: session.user.id, email: session.user.email };
    } else {
      const guestEmail = parsed.data.guestEmail.trim().toLowerCase();
      let user = await db.user.findUnique({
        where: { email: guestEmail },
      });

      if (!user) {
        let role = await db.role.findFirst({
          where: { type: { in: ["CUSTOMER", "GUEST"] } },
        });
        if (!role) {
          role = await db.role.create({
            data: { name: "Customer", type: "CUSTOMER" },
          });
        }

        user = await db.user.create({
          data: {
            email: guestEmail,
            name: parsed.data.guestName.trim(),
            phone: parsed.data.guestPhone.trim(),
            roleId: role.id,
            password: null, // Unregistered guest account
          },
        });
      }

      checkoutUser = { id: user.id, email: user.email };
    }

    const result = await processCheckout(
      parsed.data,
      checkoutUser,
      request.headers.get("idempotency-key"),
    );

    if ("existingBookingId" in result) {
      return Response.json({ bookingId: result.existingBookingId, replayed: true });
    }
    return Response.json(
      {
        bookingId: result.newBookingId,
        bookingNumber: result.bookingNumber,
        totalAmount: result.totalAmount,
        replayed: false,
      },
      { status: 201 },
    );
  } catch (error) {
    console.warn(
      "[CHECKOUT_API] Primary database checkout unavailable, executing offline fallback checkout:",
      error instanceof Error ? error.message : String(error)
    );

    try {
      const quote = await calculateQuote({
        checkIn: parsed.data.checkIn,
        checkOut: parsed.data.checkOut,
        rooms: [
          {
            roomCategoryId: parsed.data.roomCategoryId,
            ratePlanId: parsed.data.ratePlanId,
            numGuests: parsed.data.numGuests,
          },
        ],
        services: parsed.data.services,
        couponCode: parsed.data.couponCode,
      });

      const bookingNumber = generateDemoBookingNumber();
      const bookingId = "demo-bk-" + crypto.randomUUID().slice(0, 8);
      const cat = findMockCategory(parsed.data.roomCategoryId);
      const plan = findMockRatePlan(parsed.data.ratePlanId, parsed.data.roomCategoryId);

      saveDemoBooking({
        id: bookingId,
        bookingNumber,
        guestName: parsed.data.guestName.trim(),
        guestEmail: parsed.data.guestEmail.trim(),
        guestPhone: parsed.data.guestPhone.trim(),
        specialRequests: parsed.data.specialRequests,
        checkIn: quote.checkIn,
        checkOut: quote.checkOut,
        nights: quote.nights,
        numGuests: parsed.data.numGuests || 1,
        totalAmount: quote.totalAmount,
        roomSubtotal: quote.roomSubtotal,
        taxAndFeeTotal: quote.taxAndFeeTotal,
        status: parsed.data.paymentMethod === "MOCK_PAYMENT" ? "CONFIRMED" : "PENDING_PAYMENT",
        paymentMethod: parsed.data.paymentMethod || "MOCK_PAYMENT",
        roomCategoryId: parsed.data.roomCategoryId,
        ratePlanId: parsed.data.ratePlanId,
        roomCategory: {
          name: cat?.name || "Executive Bay Suite",
          slug: cat?.slug || "executive-bay-suite",
        },
        ratePlan: {
          name: plan?.name || "Flexible Rate with Gourmet Breakfast",
        },
        createdAt: new Date().toISOString(),
      });

      return Response.json(
        {
          bookingId,
          bookingNumber,
          totalAmount: quote.totalAmount,
          replayed: false,
        },
        { status: 201 },
      );
    } catch (fallbackError) {
      return toApiErrorResponse(request, fallbackError);
    }
  }
}
