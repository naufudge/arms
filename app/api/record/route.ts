import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/db_client";
import { Record } from "@prisma/client";

export async function POST(request: NextRequest) {
    const reqBody: Omit<Record, "id"> = await request.json();
    console.log(reqBody)
    try {
        const response = await prisma.record.create({
            data: reqBody,
        });
        
        return NextResponse.json({
            success: true,
            data: response
        })

    } catch (error: unknown) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message
        } else { errorMessage = "An unknown error occurred" }

        return NextResponse.json({ success: false, message: errorMessage })
    }
}

export async function GET() {
    try {
        const response = await prisma.record.findMany({
            include: {
                user: true,
                collection: true
            }
        });
        return NextResponse.json({
            success: true,
            records: response
        })

    } catch (error: unknown) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message
        } else { errorMessage = "An unknown error occurred" }

        return NextResponse.json({ success: false, message: errorMessage })
    }
}