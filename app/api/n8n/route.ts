export async function POST(req: Request) {
  const body = await req.json();

  try {
    const res = await fetch("https://pwdlab.app.n8n.cloud/webhook-test/e2979040-1a1c-4fb0-8568-08d7f652077a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.text();

    return new Response(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("n8n error", { status: 500 });
  }
}

