import { pinata } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { fileId }: { fileId: string } = await request.json();

        const url = await pinata.gateways.createSignedURL({
            cid: fileId,
            expires: 600, // Number of seconds link is valid for
        });

        const { contentType } = await pinata.gateways.get(fileId)

        if (url) {
            return NextResponse.json({
                success: true,
                file: url,
                contentType,
            })
        } else {
            return NextResponse.json({
                success: false,
                error: "Image for the ID not found."
            })
        }

    } catch (error: unknown) {
        let message = ""
        if (error instanceof Error) {
            message = error.message
        } else { message = "An unknown error occurred." }

        return NextResponse.json({
            success: false,
            error: message
        })
    }
}