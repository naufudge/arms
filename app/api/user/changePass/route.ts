import { prisma } from "@/prisma/db_client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import axios from "axios";


export async function POST(request: NextRequest) {
    const { username, newPassword } = await request.json()

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
                passChange: false
            }
        });

        // const response = await axios.post("/api/user/login", { username, password: hashedPassword })

        // if (response.data.success === false) {
        //     return NextResponse.json({
        //         success: false,
        //         error: response.data.error
        //     });
        // }

        return NextResponse.json({
            success: true,
            message: "Password updated successfully"
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