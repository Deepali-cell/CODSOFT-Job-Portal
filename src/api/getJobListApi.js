import supabaseClient from "@/utils/supabase";

export async function getJobList(token, { location, company_id, searchQuery }) {
  const supabase = supabaseClient(token);

  let selectQuery = `
    *,
    company:companies(name, logo_url)
  `;

  if (token) {
    selectQuery += `, savedJob:saved_jobs(id)`;
  }

  let query = supabase.from("jobs").select(selectQuery);

  if (location) query = query.eq("location", location);
  if (company_id) query = query.eq("company_id", company_id);
  if (searchQuery) query = query.ilike("title", `%${searchQuery}%`);

  const { data, error } = await query;

  if (error) {
    console.error("Job fetch error:", error);
    return [];
  }

  return data;
}
