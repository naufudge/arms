import { prisma } from "@/prisma/db_client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    const { username, password } = await request.json();

    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
            include: { userRole: true }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({
                success: false,
                error: "Invalid password"
            });
        }

        if (passwordMatch && user.passChange) {
            return NextResponse.json({
                success: true,
                passChange: true,
                user
            });
        } else if (passwordMatch && !user.passChange) {
            return NextResponse.json({
                success: true,
                passChange: false,
                user
            });
        }

        // return NextResponse.json({
        //     success: true,
        //     user
        // });

    } catch (error: unknown) {
        let errorMessage = "";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }

        return NextResponse.json({
            success: false,
            error: errorMessage
        }, { status: 500 });
    }
}