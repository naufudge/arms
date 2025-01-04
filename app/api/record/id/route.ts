import { prisma } from "@/prisma/db_client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { id }: { id: number } = await request.json()
        const response = await prisma.record.findUnique({
            where: {
                id
            },
            include: {
                collection: true,
                user: true,
                files: true
            }
        })

        if (response) {
            return NextResponse.json({
                success: true,
                record: response,
            })
        } else {
            return NextResponse.json({
                success: false,
                error: "Record not found"
            })
        }

    } catch (error: unknown) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message
        } else {
            errorMessage = "An unknown error occurred!"
        }
        return NextResponse.json({
            success: false,
            error: errorMessage
        })
    }
}