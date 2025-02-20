"use client";

import { fetchAuthSession } from "@aws-amplify/auth";
import { useEffect } from "react";

export default function SetCookiewuIdToken() {
  useEffect(() => {
    async function setCookie() {
      try {
        const session = await fetchAuthSession();
        if (session?.tokens?.idToken) {
          // Set the cookie with the idToken
          document.cookie = `wuIdToken=${session.tokens.idToken}; path=/; secure; samesite=strict`;
        } else {
          document.cookie = `wuIdToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
        }
      } catch (error) {
        console.error("Failed to fetch session or set cookie:", error);

        document.cookie = `wuIdToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
      }
    }

    setCookie();
  }, []);

  return null;
}
