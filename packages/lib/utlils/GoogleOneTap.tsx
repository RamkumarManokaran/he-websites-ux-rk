"use client";
import { useEffect, use } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { signInWithRedirect } from "aws-amplify/auth";
import { v4 as uuidv4 } from "uuid";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
const GoogleOneTap = () => {
  const router = useRouter();
  const pathname = usePathname();

  const randomid = uuidv4();
  const tracksession_id = uuidv4().replace(/\D/g, "").slice(0, 8);
  const scriptId = "google-one-tap-script";
  const scriptSrc = "https://accounts.google.com/gsi/client";
  function getCookieValue(name: any) {
    const cookieArray = document.cookie.split("; ");
    const cookie = cookieArray.find((c) => c.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : "";
  }

  function setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  useEffect(() => {
    async function callRegisterfunction() {
      try {
        const cookieval = getCookieValue("Signinonetap");
        if (cookieval === "true") {
          const session: any = await fetchAuthSession();
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BFF_API_DOMAIN}/hewebsites/v1/users/registration`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
                siteCode: "WU_WEB",
                "x-correlation-id": randomid,
                authorization: session?.tokens?.idToken?.toString(), // Ensure it's a string
              },
              body: JSON.stringify({
                loginFlag: "Y",
              }),
            }
          );

          if (!response.ok) {
            await signOut({ global: true });
            router.push("/degrees/userLogin.html?e=logout");
          } else {
            const res = await response.json();
            if (res.message.toLowerCase() === "user updated") {
              // console.log(res, "User updated successfully");
            } else {
              try {
                const session: any = await fetchAuthSession();
                const clickstreamresponse = await fetch(
                  `${process.env.NEXT_PUBLIC_BFF_API_DOMAIN}/hewebsites/v1/logs/clickstream`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
                      tracksessionid: tracksession_id,
                      authorization: session?.tokens?.idToken?.toString(), // Ensure it's a string
                    },
                    body: JSON.stringify({
                      networkId: 2,
                      affiliateId: 220703,
                      userloggedIn: "Y",
                      functionalityName: "Sign Up",
                      signupMethod: "Google",
                      siteName: "Whatuni",
                      eventType: "UserRegistered",
                      refererURL: window.location.href,
                      pageName: "home",
                      actionType: "Interaction",
                      siteLanguage: "English",
                      sessionTrackId: tracksession_id,
                      isMobileUser: `${window.innerWidth < 1024 ? "Y" : "N"}`,
                      screenResolution:
                        window.innerWidth ||
                        document.documentElement.clientWidth ||
                        document.body.clientWidth,
                      CTATitle: "Continue with Google",
                    }),
                  }
                );
              } catch (error) {
                console.error("Error during clickstream logging:", error);
              }
            }
          }
          document.cookie = `Signinonetap=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
        }
      } catch (error) {
        console.error("Error during user registration:", error);
      }
    }
    callRegisterfunction();

    async function watchForCognitoCookie() {
      setCookie("Signinonetap", "true", 7);
      // const lis = localStorage.getItem("COLCSubmitRes");
        signInWithRedirect({
          provider: "Google",
          customState:pathname,
        });
    
    }
    const checkSession = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens) {
          const hasAccessToken = session.tokens.accessToken !== undefined;
          const hasIdToken = session.tokens.idToken !== undefined;
          if (hasAccessToken && hasIdToken) {
            return null;
          } else {
            watchForOptanonCookie();
          }
        } else {
          watchForOptanonCookie();
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
    const loadGoogleScript = () => {
      const scriptExists = Array.from(
        document.getElementsByTagName("script")
      ).some((script) => script.src === scriptSrc || script.id === scriptId);

      if (!scriptExists) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://accounts.google.com/gsi/client";
        script.defer = true;
        script.onload = () => initializeGoogleOneTap();
        document.body.appendChild(script);
      } else {
        initializeGoogleOneTap();
      }
    };

    const initializeGoogleOneTap = () => {
      if (typeof window !== "undefined" && (window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id:
            "310464352984-52q8deiepmmnslhkehui0llrmvlvq5lu.apps.googleusercontent.com",
          callback: (response: any) => {
            watchForCognitoCookie();
            const { credential } = response;
          },
        });
        (window as any).google.accounts.id.prompt();
      }
    };

    function watchForOptanonCookie() {
      let previousCookies = document.cookie;

      const observer = new MutationObserver(() => {
        if (document.cookie !== previousCookies) {
          previousCookies = document.cookie;

          if (document.cookie.includes("OptanonAlertBoxClosed")) {
            loadGoogleScript();
            observer.disconnect(); // Stop observing once cookie is found
          }
        }
      });

      // Start observing
      observer.observe(document, {
        subtree: true,
        childList: true,
      });

      // Initial check in case cookie is already present
      if (document.cookie.includes("OptanonAlertBoxClosed")) {
        loadGoogleScript();
        observer.disconnect();
      }
    }

    // Initialize the cookie watcher
  }, []);

  return null;
};
export default GoogleOneTap;
