"use client";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";

const GoogleOneTapPgs = () => {
  const scriptId = "google-one-tap-script";
  const scriptSrc = "https://accounts.google.com/gsi/client";
  function getCookieValue(name: any) {
    const cookieArray = document.cookie.split("; ");
    const cookie = cookieArray.find((c) => c.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : "";
  }

  async function extractdetailsforregister(text: any) {
    // console.log("inside the extractdetailsforregister");
    const parts = text.toString().split("##SPLIT##");
    if (parts) {
      const initial =
        parts[1] && parts[1] !== '""' ? parts[1].replace(/"/g, "") : "";
      const count = parts[2] || "";
      const sessionId = parts[3] || "";
      if (initial) {
        setCookie("pgs_auth", initial, 7);
      }
      if (count) {
        setCookie("pgs_bskt_cnt", count, 7);
      }
      if (sessionId) {
        setCookie("pgs_x", sessionId, 7);
      }
      const sessionIdtolog = sessionId ? sessionId : getCookieValue("pgs_x");
      // console.log(sessionIdtolog, "session id for logging");
      if (sessionIdtolog) {
        // console.log(sessionIdtolog, "inside the if ");
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BFF_API_DOMAIN}/hewebsites/v1/guest/logs/clickstream`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
                tracksessionid: sessionIdtolog,
              },
              body: JSON.stringify({
                affiliateId: 607022,
                networkId: 3,
                userloggedIn: "Y",
                functionalityName: "Sign Up",
                signupMethod: "Google",
                siteName: "Pgs",
                eventType: "UserRegistered",
                refererURL: window.location.href,
                pageName: "home",
                actionType: "Interaction",
                siteLanguage: "English",
                sessionTrackId: sessionIdtolog,
                isMobileUser: `${window.innerWidth < 1024 ? "Y" : "N"}`,
                screenResolution:
                  window.innerWidth ||
                  document.documentElement.clientWidth ||
                  document.body.clientWidth,
                CTATitle: "Continue with Google",
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Clickstream logging failed");
          }
          console.log("Clickstream logged successfully");
        } catch (error) {
          console.error("Error during clickstream logging:", error);
        }
      }
      window.location.reload();
    } else {
      document.cookie = `pgs_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
      document.cookie = `pgs_bskt_cnt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
      document.cookie = `pgs_x=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
      window.location.reload();
    }
  }

  function extractDetails(text: any) {
    const parts = text.toString().split("##SPLIT##");
    if (parts) {
      const initial = parts[3] || "";
      const favCount = parts[4] || "";
      const sessionId = parts[5] || "";
      if (initial) {
        setCookie("pgs_auth", initial, 7);
      }
      if (favCount) {
        setCookie("pgs_bskt_cnt", favCount, 7);
      }
      if (sessionId) {
        setCookie("pgs_x", sessionId, 7);
      }
    }
    window.location.reload();
  }
  function setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }
  async function fetchData(credential: any) {
    try {
      const decodedToken: any = jwtDecode(credential.toString());
      const url = `pgs/pgs_interactive.check_email_exist_prc?p_email=${decodedToken?.email}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/html",
        },
      });

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("text/html")) {
        const htmlResponse = await response.text();

        if (htmlResponse.trim().toLowerCase() === "y") {
          // Second fetch if the response is 'Y'
          const loginResponse = await fetch(
            `pgs/pgs_user.do_login_lbx?pm_email=${decodedToken?.email}&p_from_page=GOOGLE ONE TAP`,
            {
              method: "GET",
              headers: {
                "Content-Type": "text/html",
              },
            }
          );

          const loginData = await loginResponse.text();
          if (loginData) {
            extractDetails(loginData);
          }
        } else {
          const RegisterResponse = await fetch(
            `/pgs/pgs_user.do_register_new?p_first_name=${decodedToken?.given_name}&p_last_name=${decodedToken?.family_name}&p_email=${decodedToken?.email}&p_form_type=GOOGLE ONE TAP`,
            {
              method: "GET",
              headers: {
                "Content-Type": "text/html",
              },
            }
          );
          const loginData = await RegisterResponse.text();

          extractdetailsforregister(loginData);
        }
      } else {
        const data = await response.json();
      }
    } catch (error) {
      console.error("Error fetching the email data:", error);
    }
  }
  useEffect(() => {
    async function checkSession() {
      try {
        const user_initial = getCookieValue("pgs_auth") || "";
        const pgs_x = getCookieValue("pgs_x") || "";
        if (user_initial !== "null" && user_initial && pgs_x) {
          return null;
        } else {
          watchForOptanonCookie();
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    }

    checkSession();
    function loadGoogleScript() {
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
    }
    function initializeGoogleOneTap() {
      if (typeof window !== "undefined" && (window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id:
            "1007776276005-306decchqtue4pjqffn8qidnphccg2km.apps.googleusercontent.com",
          callback: (response: any) => {
            const { credential } = response;
            fetchData(credential);
          },
        });
        (window as any).google.accounts.id.prompt();
      }
    }

    function watchForOptanonCookie() {
      let previousCookies = document.cookie;

      const observer = new MutationObserver(() => {
        if (document.cookie !== previousCookies) {
          previousCookies = document.cookie;

          if (document.cookie.includes("OptanonAlertBoxClosed")) {
            loadGoogleScript();
            observer.disconnect();
          }
        }
      });
      observer.observe(document, {
        subtree: true,
        childList: true,
      });
      if (document.cookie.includes("OptanonAlertBoxClosed")) {
        loadGoogleScript();
        observer.disconnect();
      }
    }
  }, []);

  return null;
};
export default GoogleOneTapPgs;
