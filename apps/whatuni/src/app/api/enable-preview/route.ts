import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  //const bypass = searchParams.get("x-vercel-protection-bypass");
  //const referer = request.headers.get("referer");
  //onst isIframe = request.headers.get('x-from-iframe') === 'true';
  const fetchDest = request.headers.get("sec-fetch-dest");
  let query;
  if (fetchDest === "iframe") {
    query = slug + "?preview=MY_SECRET_TOKEN";
  } else {
    query = slug;
  }

  // Check the secret and next parameters
  // This secret should only be known to this Route Handler and the CMS
  if (secret !== "MY_SECRET_TOKEN" || !slug) {
    return new Response("Invalid token", { status: 401 });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  // const post = await getPostBySlug(slug)

  // If the slug doesn't exist prevent draft mode from being enabled
  //   if (!post) {
  //     return new Response('Invalid slug', { status: 401 })
  //   }

  // Enable Draft Mode by setting the cookie
  (await draftMode()).enable();

  const cookieStore = await cookies();
  const cookie = cookieStore.get("__prerender_bypass")!;
  cookieStore.set({
    name: "__prerender_bypass",
    value: cookie?.value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });

  redirect(`${query}`);
}
