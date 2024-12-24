import { NextRequest, NextResponse } from "next/server";
import { pinata } from "@/utils/config"

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // If you're going to use auth you'll want to verify here
  const { name } = await request.json();
  try {
    const url = await pinata.upload.createSignedURL({
      expires: 30, // The only required param
      name: name,
      // groupId: groupId,
    })
    return NextResponse.json({ url: url }, { status: 200 }); // Returns the signed upload URL
  } catch (error) {
    console.log(error);
    return NextResponse.json({ text: "Error creating API Key:" }, { status: 500 });
  }
}
