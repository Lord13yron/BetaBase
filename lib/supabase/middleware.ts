import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // if (
  //   request.nextUrl.pathname !== "/" &&
  //   !user &&
  //   !request.nextUrl.pathname.startsWith("/login") &&
  //   !request.nextUrl.pathname.startsWith("/auth") &&
  //   !request.nextUrl.pathname.startsWith("/api/webhooks")
  // ) {
  const protectedRoutes = ["/upload", "/profile", "/onboarding"];
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (!user && isProtected) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  if (user) {
    const isOnboarding = request.nextUrl.pathname.startsWith("/onboarding");
    const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");
    const isApiRoute = request.nextUrl.pathname.startsWith("/api");

    if (!isOnboarding && !isAuthRoute && !isApiRoute) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("username")
        .eq("id", user.sub)
        .single();

      if (!profile?.username) {
        const url = request.nextUrl.clone();
        url.pathname = "/onboarding";
        return NextResponse.redirect(url);
      }
    }
  }

  // Admin route guard
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    const segments = request.nextUrl.pathname.split("/");
    const gymSlug = segments[2];

    // /admin — superadmin only, handled by verifySuper() in the page itself
    if (!gymSlug) {
      return NextResponse.next();
    }

    // /admin/[gymSlug] — existing gym admin guard
    const gymId = gymSlug.split("-").slice(-1)[0];

    // Validate gymId is numeric before hitting the DB
    if (!gymId || !/^\d+$/.test(gymId)) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // Allow superusers to access any gym admin route
    const { data: superProfile } = await supabase
      .from("user_profiles")
      .select("is_superuser")
      .eq("id", user.sub)
      .single();

    if (superProfile?.is_superuser) {
      return supabaseResponse;
    }

    const { data: gym } = await supabase
      .from("gyms")
      .select("id")
      .eq("id", gymId)
      .single();

    if (!gym) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    const { data: adminRow } = await supabase
      .from("gym_admins")
      .select("id")
      .eq("gym_id", gym.id)
      .eq("user_id", user.sub)
      .single();

    if (!adminRow) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
