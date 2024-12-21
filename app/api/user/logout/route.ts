import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = NextResponse.json({
            success: true,
            message: "Logout Successful!",
        })
        response.cookies.set("token", "", { httpOnly: true, maxAge: 0 })
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