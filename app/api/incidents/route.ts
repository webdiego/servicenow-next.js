import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const incident = await req.json();

  const res = await fetch(
    "https://dev313524.service-now.com/api/now/table/incident",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${process.env.SN_AUTH}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(incident),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    return NextResponse.json({ error: errText }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data.result);
}
