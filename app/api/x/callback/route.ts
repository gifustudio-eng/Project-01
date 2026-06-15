import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  console.log("X CALLBACK HIT");

  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");

  console.log("CODE:", code);

  if (!code) {
    return NextResponse.json({ error: "No code" });
  }

  const credentials = Buffer.from(
  `${process.env.NEXT_PUBLIC_X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`
  ).toString("base64");

  const tokenRes = await fetch(
    "https://api.twitter.com/2/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_X_REDIRECT_URI!,
        code_verifier: "challenge",
      }),
    }
  );

  const tokenData = await tokenRes.json();

  /*console.log("TOKEN DATA:", tokenData);
  console.log(process.env.X_CLIENT_SECRET);*/

  console.log("CLIENT ID EXISTS:", !!process.env.NEXT_PUBLIC_X_CLIENT_ID);
  console.log("SECRET EXISTS:", !!process.env.X_CLIENT_SECRET);

  if (!tokenRes.ok) {
    return NextResponse.json(tokenData, {
      status: tokenRes.status,
    });
  }

  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  console.log("SUPABASE USER:", user);

  const result = await supabase
    .from("user_x_accounts")
    .insert({
      user_id: user.data.user?.id,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
    });

  console.log("INSERT RESULT:", result);

  return NextResponse.redirect(new URL("/connected-to-x", req.url));
}