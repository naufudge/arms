import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/db_client";
import { Record } from "@prisma/client";
import { UploadResponse } from "pinata";

interface RecordCreateRequestBody {
    recordData: Omit<Record, "id" | "files" | "deleteReqId" | "createdOn">;
    uploadResponse: UploadResponse;
}

export async function POST(request: NextRequest) {
    const { recordData, uploadResponse }: RecordCreateRequestBody = await request.json();
    
    try {
        const recordResponse = await prisma.record.create({
            data: recordData,
        });

        if (!recordResponse) {
            return NextResponse.json({
                success: false,
                error: "Failed to create record"
            })
        }

        const fileResponse = await prisma.file.create({
            data: {
                id: uploadResponse.cid,
                name: uploadResponse.name,
                type: uploadResponse.mime_type,
                size: uploadResponse.size,
                recordId: recordResponse.id,
            }
        })
        
        return NextResponse.json({
            success: true,
            record: recordResponse,
            file: fileResponse
        })

    } catch (error: unknown) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message
        } else { errorMessage = "An unknown error occurred" }

        return NextResponse.json({ success: false, message: errorMessage })
    }
}

// Fetch all records
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