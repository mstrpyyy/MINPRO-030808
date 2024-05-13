import { NextResponse, NextRequest } from 'next/server';

const protectedPages = [
  '/users/dashboard/general',
  '/users/dashboard/transactions',
  '/users/dashboard/account-settings',
  '/organizers/dashboard/general',
  '/organizers/dashboard/event-management',
  '/organizers/dashboard/account-settings',
];

const protectedUserPages = [
  '/users/dashboard/general',
  '/users/dashboard/transactions',
  '/users/dashboard/account-settings'
]

const protectedOrganizerPages = [
  '/organizers/dashboard/general',
  '/organizers/dashboard/event-management',
  '/organizers/dashboard/account-settings'
]

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  console.log(token?.value);
  const url = request.nextUrl.pathname;
  if (protectedPages.includes(url)) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/no-auth-redirect`, request.url),
      );
    }
    try {
      const res = await fetch('http://localhost:8000/api/accounts/accountType', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token.value}`
        }
      })
      const data = await res.json()
      console.log(data);
      console.log(protectedUserPages.includes(url));
      console.log(protectedOrganizerPages.includes(url));
      
      if (protectedUserPages.includes(url) && data.accountType == 'user') {
        return NextResponse.next();
      }

      if (protectedOrganizerPages.includes(url) && data.accountType == 'organizer') {
        return NextResponse.next();
      }
      return NextResponse.redirect(
        new URL(`/no-auth-redirect`, request.url),
      );
    } catch (error) {
      return NextResponse.redirect(
        new URL(`/`, request.url),
      );
    }
  }
}
