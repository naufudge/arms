import { prisma } from "@/prisma/db_client";
import { Collection } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const reqBody: Omit<Collection, "id" | "createdOn"> = await request.json()
        const response = await prisma.collection.create({
            data: reqBody
        })
        return NextResponse.json({
            success: true,
            data: response
        })
    } catch (error: unknown) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }
        return NextResponse.json({
            success: false,
            error: errorMessage
        })
    }
}

// Get all the existing Collections
export async function GET() {
    try {
        const collections = await prisma.collection.findMany()
        return NextResponse.json({
            success: true,
            collections
        })
    } catch (error: unknown) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }
        return NextResponse.json({
            success: false,
            error: errorMessage
        })
    }
}