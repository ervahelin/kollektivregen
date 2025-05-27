export async function GET() {
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    },
  });

  const data = await res.json();

  if (!data.success) {
    return new Response(JSON.stringify({ error: "Token creation failed" }), { status: 500 });
  }

  return new Response(JSON.stringify({ uploadURL: data.result.uploadURL }), { status: 200 });
}
