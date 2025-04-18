import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import httpClient from './infra/httpClient'
import baseUrl from './infra/back-end-connection'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth')?.value;

  try {
    // Faz uma requisição autenticada para verificar se o token é válido
   const response = await httpClient.get(`${baseUrl}/user`, token);
    return NextResponse.next();
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: '/((?!login|api|_next/static|favicon.ico).*)', // ignora rotas públicas
};
