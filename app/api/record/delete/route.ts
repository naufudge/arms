import { getDataFromToken } from "@/lib/jwt";
import { prisma } from "@/prisma/db_client";
import { DeleteRequest } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface DeleteRequestBody {
    type: "request" | "approve" | "reject";
    deleteRequest: Omit<DeleteRequest, "createdOn">
}

export async function POST(request: NextRequest) {
    const { type, deleteRequest }: DeleteRequestBody = await request.json()

    if (!deleteRequest.recordId) {
        return NextResponse.json({
            success: false,
            error: "Record ID doesn't exist in the delete request."
        })
    }

    const record = await prisma.record.findUnique({
        where: { id: deleteRequest.recordId },
        include: { files: true }
    })

    if (!record) {
        return NextResponse.json({
            success: false,
            error: "Record not found"
        })
    }

    try {
        switch (type) {
            case "request":
                // handle if request already exists
                const existingReq = await prisma.deleteRequest.findUnique({
                    where: { recordId: deleteRequest.recordId! }
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
                    where: { id: deleteRequest.recordId }
                })
                return NextResponse.json({
                    success: true,
                    deleted: response,
                    record: newRecord
                })

            case "approve":
                // delete File from DB
                await prisma.file.delete({ where: { id: record.files[0].id } })

                // delete Record from DB
                await prisma.record.delete({ where: { id: deleteRequest.recordId } })

                // update the delete request to approved
                await prisma.deleteRequest.update({
                    where: { id: deleteRequest.id },
                    data: { approved: true, approveUserId: deleteRequest.approveUserId }
                })

                return NextResponse.json({
                    success: true,
                    error: "Deleted record & file successfully."
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
            include: { record: true, reqUser: true, approveUser: true }
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