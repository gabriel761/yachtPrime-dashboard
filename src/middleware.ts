import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import httpClient from './infra/httpClient'
import baseUrl from './infra/back-end-connection'
import { auth } from './lib/firebase/firebaseConfig'
import { cookies } from 'next/headers'


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const allCookies = await cookies();
  const cookie = allCookies.get('auth');
  const token = cookie?.value
 
  
  try {
    const result = await httpClient.get(`${baseUrl}/user`, token)
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
}

export const config = {
  matcher: '/((?!login|api|_next/static|favicon.ico).*)', // Exclui login, API, arquivos estáticos e favicon
};