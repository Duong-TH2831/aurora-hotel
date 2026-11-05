import { db } from "../../../lib/db.ts";
import { MOCK_ROOM_CATEGORIES } from "../../../lib/mock-hotel-data.ts";

export async function GET() {
  try {
    const queryPromise = db.roomCategory.findMany({
      where: { isActive: true },
      include: {
        ratePlans: { where: { isActive: true } },
      },
      orderBy: { basePrice: "asc" },
    });
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DB_TIMEOUT")), 1500),
    );
    const categories = await Promise.race([queryPromise, timeoutPromise]);
    if (Array.isArray(categories) && categories.length > 0) {
      return Response.json({ success: true, data: categories });
    }
    return Response.json({ success: true, data: MOCK_ROOM_CATEGORIES });
  } catch (error) {
    console.warn(
      "[ROOMS_API] Database unavailable or timed out, returning rich mock categories for offline demo:",
      error instanceof Error ? error.message : String(error)
    );
    return Response.json({ success: true, data: MOCK_ROOM_CATEGORIES });
  }
}
