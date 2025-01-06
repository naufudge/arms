import { prisma } from "@/prisma/db_client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await prisma.file.findMany({include: {record: true}})

        if (response) {
            return NextResponse.json({
                success: true,
                files: response
            })
        } else {
            return NextResponse.json({
                success: false,
                error: "No files found."
            })
        }
    } catch (error: unknown) {
        let errorMessage = "";
        if (error instanceof Error) {
            errorMessage = error.message
        } else { errorMessage = "An unknown error occurred." }
        return NextResponse.json({
            success: false,
            error: errorMessage
        })
    }
}