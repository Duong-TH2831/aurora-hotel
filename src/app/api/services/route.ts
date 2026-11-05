import { db } from "@/lib/db.ts";
import { MOCK_SERVICES } from "@/lib/mock-hotel-data.ts";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" },
    });
    if (Array.isArray(services) && services.length > 0) {
      return Response.json({ success: true, data: services });
    }
    return Response.json({ success: true, data: MOCK_SERVICES });
  } catch {
    return Response.json({ success: true, data: MOCK_SERVICES });
  }
}
