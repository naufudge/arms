import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getDataFromToken } from '@/lib/jwt'


export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value || ''

    const isPublicPath = path === "/login"
    const isPrivatePath = path != "/login"

    let tokenData = null
    if (token) {
        tokenData = await getDataFromToken(token)
    }

    if (tokenData && isPublicPath) return NextResponse.redirect(new URL('/', request.url))

    if (!tokenData && isPrivatePath) return NextResponse.redirect(new URL('/login', request.url))

    // if (path === "/dashboard" && tokenData?.role === "normal") return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
    matcher: [
        '/',
        '/login',
        '/settings',
        '/settings/roles',
        '/settings/collections',
        '/search',
        '/upload',
        '/users',
    ],
  }