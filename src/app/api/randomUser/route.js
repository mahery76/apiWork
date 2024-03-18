import { dataUsers } from "@/app/db";
import { NextResponse, NextRequest } from "next/server";
// "http://localhost:3000/api/randomUser"
export async function GET(req) {
  try {
    return NextResponse.json({
      results: dataUsers,
      info: {
        seed: "cbef01c14e88ca8f",
        results: 10,
        page: 1,
        version: "1.4",
      },
    });
  } catch (err) {
    NextResponse.status(500).json({
      message: "THERE IS AN ERROR FROM THE SERVER",
    });
  }
}
