import { prisma } from "@/prisma/db_client";
import { DeleteRequest, Record } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface DeleteRequestBody {
    type: "request" | "approve" | "reject";
    deleteRequest: Omit<DeleteRequest, "id" | "createdOn">
}

export async function POST(request: NextRequest) {
    const { type, deleteRequest }: DeleteRequestBody = await request.json()
    try {
        switch (type) {
            case "request":
                // handle if request already exists
                const existingReq = await prisma.deleteRequest.findUnique({
                    where: {recordId: deleteRequest.recordId!}
                })
                if (existingReq) {
                    return NextResponse.json({
                        success: false,
                        exists: true
                    })
                }

                const response = await prisma.deleteRequest.create({
                    data: deleteRequest
                })
                const newRecord = await prisma.record.findUnique({
                    where: {id: deleteRequest.recordId!}
                })
                return NextResponse.json({
                    success: true,
                    deleted: response,
                    record: newRecord
                })

            default:
                return NextResponse.json({
                    success: false,
                    error: "Delete request type is invalid."
                })
        }

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred!"

        return NextResponse.json({
            success: false,
            error: errorMessage
        })
    }
}

export async function GET() {
    try {
        const delRequests = await prisma.deleteRequest.findMany({
            include: {record: true, reqUser: true, approveUser: true}
        })
        return NextResponse.json({
            success: true,
            deleteRequests: delRequests
        })
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred!"

        return NextResponse.json({
            success: false,
            error: errorMessage
        })
    }
}