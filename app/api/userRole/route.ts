import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        return NextResponse.json({
            success: true,
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
        
    } catch (error: any) {
        return NextResponse.json({
            success: true,
            error: error.message
        })
    }
}