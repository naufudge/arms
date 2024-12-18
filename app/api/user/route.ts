import { prisma } from "@/prisma/db_client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        // await prisma.user.create({
        //     data: {

        //     }
        // })
        return NextResponse.json({
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}

export async function GET() {
    try {
        const users = await prisma.user.findMany()
        return NextResponse.json({
            success: true,
            users
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}