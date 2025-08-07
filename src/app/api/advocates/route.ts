import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("search")?.toLowerCase();

  // Uncomment this line to use a database
  let data = await db.select().from(advocates);

  // Uncomment this line to use local data
  // let data = advocateData;

  if (searchTerm) {
    data = data.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        `${advocate.firstName} ${advocate.lastName}`
          .toLowerCase()
          .includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        (Array.isArray(advocate.specialties) &&
          advocate.specialties.join(" ").toLowerCase().includes(searchTerm)) ||
        String(advocate.yearsOfExperience).includes(searchTerm)
      );
    });
  }

  return Response.json({ data });
}
