
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { ROLE } from './utilities/roleUtils/role';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
interface roleJwt extends JwtPayload {
  role: string;

}
export function middleware(request: NextRequestWithAuth) {

  const token = cookies().get('token');
  const currentRole = cookies().get('role');
  if (
    !token &&
    (request.nextUrl.pathname.startsWith('/customer') ||
      request.nextUrl.pathname.startsWith('/admin') ||
      request.nextUrl.pathname.startsWith('/shopOwner'))
  ) {
    return NextResponse.redirect(new URL('/logIn', request.url));
  };
  if (request.nextUrl.pathname.startsWith('/customer') && currentRole?.value != ROLE.role1 && token) {
    return NextResponse.redirect(new URL('/403', request.url));
  };
  if (request.nextUrl.pathname.startsWith('/shopOwner') && currentRole?.value != ROLE.role2 && token) {
    return NextResponse.redirect(new URL('/403', request.url));
  };
  if (request.nextUrl.pathname.startsWith('/admin') && currentRole?.value != ROLE.role3 && token) {
    return NextResponse.redirect(new URL('/403', request.url));
  };
  if ((request.nextUrl.pathname.startsWith('/logIn') || request.nextUrl.pathname.startsWith('/signup')) && token) {
    switch (currentRole?.value) {
      case ROLE.role3: {
        return NextResponse.redirect(new URL('/admin', request.url));
      };
      case ROLE.role2: {
        return NextResponse.redirect(new URL('/shopOwner', request.url));
      };
      default: {
        return NextResponse.redirect(new URL('/', request.url));
      };
    };
  };
};

// export const config = {
//   matcher: ['/admin/:path*', '/creator/:path*', '/customer/:path*', '/login', '/signup', '/'],
// };