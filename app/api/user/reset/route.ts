import { prisma } from "@/prisma/db_client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateRandomPassword } from "@/utils/Helpers";

export async function POST(request: NextRequest) {
    const { username } = await request.json()

    const newPassword = generateRandomPassword();

    try {
        const user = await prisma.user.findUnique({ where: { username } })

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { username },
            data: { 
                password: hashedPassword,
                passChange: true
            }
        });

        return NextResponse.json({
            success: true,
            message: "Password reset success!"
        });

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