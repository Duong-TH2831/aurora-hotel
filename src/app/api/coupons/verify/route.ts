import type { NextRequest } from "next/server";
import { jsonApiError, toApiErrorResponse } from "@/lib/api-error";
import { verifyCoupon } from "@/services/coupon.service";
import { MOCK_COUPONS } from "@/lib/mock-hotel-data";
import { auth } from "@/auth";
import { z } from "zod";

export const dynamic = "force-dynamic";

const verifySchema = z.object({
  code: z.string().min(1).max(50),
  bookingAmount: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonApiError(request, 400, "BAD_REQUEST", "Body must be valid JSON");
    }

    const parsed = verifySchema.safeParse(body);
    if (!parsed.success) {
      return jsonApiError(
        request,
        400,
        "BAD_REQUEST",
        "Invalid coupon payload",
        parsed.error.flatten().fieldErrors,
      );
    }

    const session = await auth();
    const userId = session?.user ? (session.user as { id?: string }).id : undefined;

    try {
      const result = await verifyCoupon({
        code: parsed.data.code,
        bookingAmount: parsed.data.bookingAmount,
        userId,
      });
      return Response.json({ success: true, data: result });
    } catch (dbErr) {
      const upper = parsed.data.code.toUpperCase().trim();
      const mock = MOCK_COUPONS.find((c) => c.code === upper);
      if (mock && mock.isActive && parsed.data.bookingAmount >= mock.minBookingAmount) {
        let discount = 0;
        if (mock.discountAmount > 0) {
          discount = mock.discountAmount;
        } else if (mock.discountPercent > 0) {
          discount = Math.round((parsed.data.bookingAmount * mock.discountPercent) / 100);
          if (mock.maxDiscountAmount && discount > mock.maxDiscountAmount) {
            discount = mock.maxDiscountAmount;
          }
        }
        return Response.json({
          success: true,
          data: {
            code: mock.code,
            discountAmount: discount,
            valid: true,
          },
        });
      }
      throw dbErr;
    }
  } catch (error) {
    return toApiErrorResponse(request, error);
  }
}
