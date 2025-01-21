"use server";

import { cookies } from "next/headers";

export async function createCookieConsent(
  cookieName: string,
  cookieValue: string
) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: cookieName,
    value: cookieValue,
    httpOnly: true,
    path: "/",
  });
}

export const getOnetrustCookieValue = async (
  cookieName: string
): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value;
};
