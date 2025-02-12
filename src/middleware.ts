import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = cookies().get("COOKIE_ACCESS_TOKEN")?.value

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/chat", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
}
