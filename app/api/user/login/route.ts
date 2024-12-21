import { prisma } from "@/prisma/db_client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
    const { username, password } = await request.json()
    try {
        const user = await prisma.user.findUnique({ where: { username } })

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User not found"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({
                success: false,
                error: "Invalid password"
            });
        }

        const token = createToken({ 
            id: user.id,
            username: user.username, 
            email: user.email,
            userRoleId: user.userRoleId
        })

        const response = NextResponse.json({
            success: true,
            message: "Login Successful!",
            token
        })

        response.cookies.set("token", token, { httpOnly: true, maxAge: 3600 })

        return response;

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ 
                success: false,
                error: error.message
            })
        } else {
            return NextResponse.json({ 
                success: false,
                error: "An unknown error occurred"
            })
        }
    }
}