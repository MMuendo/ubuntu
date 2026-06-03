import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "Ubuntu Analytiq",
    pixelId: "2033770513874581",
    commit: process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "local",
    branch: process.env.VERCEL_GIT_COMMIT_REF || "local",
    deployedAt: new Date().toISOString()
  });
}
