import { prisma } from "@/prisma/db_client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { roleName } = await request.json()
        const userRole = await prisma.userRole.create({
            data: {
                name: roleName,
            }
        })
        return NextResponse.json({
            success: true,
            userRole
        })
    } catch (error: any) {
        return NextResponse.json({
            success: true,
            error: error.message
        })
    }
}

export async function GET() {
    try {
        const userRoles = await prisma.userRole.findMany()
        return NextResponse.json({
            success: true,
            userRoles
        })
    } catch (error: any) {
        return NextResponse.json({
            success: true,
            error: error.message
        })
    }
}