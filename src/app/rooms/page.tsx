import { db } from "@/lib/db";
import { RoomsClient, RoomCategoryData } from "./RoomsClient";
import { MOCK_ROOM_CATEGORIES } from "@/lib/mock-hotel-data";

export const dynamic = "force-dynamic";

export default async function RoomsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  let categories: RoomCategoryData[] = [];

  try {
    const dbCategories = await db.roomCategory.findMany({
      where: { isActive: true },
      orderBy: { basePrice: "asc" },
    });

    if (Array.isArray(dbCategories) && dbCategories.length > 0) {
      categories = dbCategories.map((c) => {
        const amenitiesArr = Array.isArray(c.amenities)
          ? (c.amenities as string[])
          : typeof c.amenities === "string"
          ? JSON.parse(c.amenities)
          : [];

        const imagesArr = Array.isArray(c.images)
          ? (c.images as string[])
          : typeof c.images === "string"
          ? JSON.parse(c.images)
          : ["/images/aurora/deluxe-king.jpg"];

        const isOcean = c.slug.includes("ocean") || c.slug.includes("presidential") || c.slug.includes("executive");
        const isGarden = c.slug.includes("garden") || c.slug.includes("family");
        const viewType = isOcean ? "OCEAN" : isGarden ? "GARDEN" : "CITY";

        return {
          id: c.id,
          slug: c.slug,
          name: c.name,
          description: c.description,
          basePrice: c.basePrice,
          maxOccupancy: c.maxOccupancy,
          areaSqM: c.sizeSqm,
          bedConfig: c.bedConfiguration,
          viewType,
          image: imagesArr[0] || "/images/aurora/deluxe-king.jpg",
          gallery: imagesArr.length > 1 ? imagesArr : [imagesArr[0] || "/images/aurora/deluxe-king.jpg", "/images/aurora/hero-01.jpg", "/images/aurora/hero-02.jpg"],
          amenities: amenitiesArr,
        };
      });
    } else {
      categories = MOCK_ROOM_CATEGORIES.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        description: c.description,
        basePrice: c.basePrice,
        maxOccupancy: c.maxOccupancy,
        areaSqM: c.sizeSqm,
        bedConfig: c.bedConfiguration,
        viewType: c.viewType || "OCEAN",
        image: c.image || "/images/aurora/deluxe-king.jpg",
        gallery: c.gallery || [c.image || "/images/aurora/deluxe-king.jpg"],
        amenities: c.amenities,
      }));
    }
  } catch {
    categories = MOCK_ROOM_CATEGORIES.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      description: c.description,
      basePrice: c.basePrice,
      maxOccupancy: c.maxOccupancy,
      areaSqM: c.sizeSqm,
      bedConfig: c.bedConfiguration,
      viewType: c.viewType || "OCEAN",
      image: c.image || "/images/aurora/deluxe-king.jpg",
      gallery: c.gallery || [c.image || "/images/aurora/deluxe-king.jpg"],
      amenities: c.amenities,
    }));
  }

  const query = (await searchParams) || {};
  const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;

  return (
    <RoomsClient
      initialCategories={categories}
      searchContext={{
        checkIn: first(query.checkIn),
        checkOut: first(query.checkOut),
        guests: first(query.guests),
      }}
    />
  );
}
