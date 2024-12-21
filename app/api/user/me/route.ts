import { getDataFromToken } from "@/lib/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || ""

        if (!token) {
            return NextResponse.json({
                message: "User is not logged in",
                success: false,
                token
            })
        }

        const tokenData = await getDataFromToken(token)

        return NextResponse.json({
            message: "User is logged in",
            success: true,
            token,
            user: tokenData
        })

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