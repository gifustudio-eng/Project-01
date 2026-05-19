import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  const supabase = await createClient();

  // get current logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // reject if not logged in
  if (!user) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const res = await fetch(
      "https://pwdlab.app.n8n.cloud/webhook/e2979040-1a1c-4fb0-8568-08d7f652077a",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // 👇 merge frontend body + user info
        body: JSON.stringify({
          ...body,
          user_id: user.id,
          email: user.email,
        }),
      }
    );

    const data = await res.text();

    return new Response(data, {
      status: 200,
    });
  } catch (err) {
    console.error(err);

    return new Response("n8n error", {
      status: 500,
    });
  }
}