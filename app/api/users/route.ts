import { generateRandomPassword } from "@/utils/Helpers";
import { prisma } from "@/prisma/db_client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface RequestBodyType {
    username: string;
    email: string;
    userRoleId: number;
}

export async function POST(request: NextRequest) {
    try {
        const {username, email, userRoleId}: RequestBodyType = await request.json()
        const initialPassword = generateRandomPassword()
        const hashedPassword = await bcrypt.hash(initialPassword, 10)        

        const user = await prisma.user.create({
            data: {
                username,
                email,
                userRoleId,
                password: hashedPassword
            }
        })
        return NextResponse.json({
            success: true,
            user,
            initialPassword
        })
    } catch (error: unknown) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }
        return NextResponse.json({
            success: true,
            error: errorMessage
        })
    }
}

export async function GET() {
    try {
        const users = await prisma.user.findMany({include: {
            userRole: true,
        }})

        return NextResponse.json({
            success: true,
            users
        })
    } catch (error: unknown) {
        let errorMessage = ""
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }
        return NextResponse.json({
            success: true,
            error: errorMessage
        })
    }
}