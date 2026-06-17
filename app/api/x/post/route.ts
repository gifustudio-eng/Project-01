import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { text } = await req.json();
  const supabase = await createClient();
  const { data: { user }, error: userError, } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { data: account, error: accountError } = await supabase
    .from("user_x_accounts")
    .select("access_token")
    .eq("user_id", user.id)
    .single();

  if (accountError || !account) {
    return NextResponse.json(
      { error: "X account not connected" },
      { status: 404 }
    );
  }

  const response = await fetch("https://api.x.com/2/tweets", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${account.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  const data = await response.json();

  return NextResponse.json(data);
}