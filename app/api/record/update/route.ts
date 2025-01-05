import { prisma } from "@/prisma/db_client";
import { Record } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface UpdateRecordRequestBody {
    id: number;
    data: Record;
}

export async function POST(request: NextRequest) {
    const { id, data }: UpdateRecordRequestBody = await request.json()

    try {
        const response = await prisma.record.update({
            where: { id: id },
            data
        })
        if (response) {
            return NextResponse.json({
                success: true,
                response
            })
        } else {
            return NextResponse.json({
                success: false,
                error: "Could not update the record."
            })
        }
    } catch (error: unknown) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message
        } else { errorMessage = "An unknown error occurred." }
        
        return NextResponse.json({
            success: false,
            error: errorMessage
        })
    }
}