export async function triggerN8N(payload: any) {
  const res = await fetch("/api/n8n", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to trigger n8n");
  }

  return await res.text();
}