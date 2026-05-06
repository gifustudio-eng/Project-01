import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  const response = await fetch("https://api.x.com/2/tweets", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.X_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  const data = await response.json();

  return NextResponse.json(data);
}