import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.json({ error: "No code" });

  const tokenRes = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:3000/api/x/callback",
      client_id: "WEpkT0VLV25wMVB3QWhCMkRsaHM6MTpjaQ",
      code_verifier: "challenge",
    }),
  });

  const tokenData = await tokenRes.json();

  const supabase = createClient();

  await supabase.from("user_x_accounts").insert({
    user_id: (await supabase.auth.getUser()).data.user?.id,
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
  });

  return NextResponse.redirect("http://localhost:3000");
}