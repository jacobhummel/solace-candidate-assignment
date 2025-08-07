import { sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("search")?.toLowerCase();

  // @ts-expect-error TODO: fix Drizzle ts issue
  let query = db.select().from(advocates).limit(20);

  if (searchTerm) {
    query = db
      .select()
      .from(advocates)
      // @ts-expect-error TODO: fix Drizzle ts issue
      .where(
        sql`
          advocates.first_name ILIKE ${"%" + searchTerm + "%"}
          OR advocates.last_name ILIKE ${"%" + searchTerm + "%"}
          OR (advocates.first_name || ' ' || advocates.last_name) ILIKE ${
            "%" + searchTerm + "%"
          }
          OR advocates.city ILIKE ${"%" + searchTerm + "%"}
          OR advocates.degree ILIKE ${"%" + searchTerm + "%"}
          OR (
            CASE
              WHEN jsonb_typeof(advocates.payload) = 'array'
                THEN array_to_string(ARRAY(
                  SELECT jsonb_array_elements_text(advocates.payload)
                ), ' ')
              ELSE advocates.payload::text
            END
          ) ILIKE ${"%" + searchTerm + "%"}
          OR CAST(advocates.years_of_experience AS TEXT) ILIKE ${
            "%" + searchTerm + "%"
          }
        `
      )
      .limit(20);
  }

  const data = await query;

  return Response.json({ data });
}
