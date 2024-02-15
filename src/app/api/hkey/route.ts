
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
    // console.log("getting key: ", process.env.HCAPTCHA_SITE_KEY)
    return NextResponse.json({hkey: process.env.HCAPTCHA_SITE_KEY as string});
}

