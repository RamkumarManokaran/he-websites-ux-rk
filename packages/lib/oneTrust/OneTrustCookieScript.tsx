"use client";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect, useState } from "react";
import { createCookieConsent } from "./OneTrustcookie";
import { getCookieValue, setNewCookie } from "../utlils/commonFunction";

let OptanonConsent: string | undefined = undefined;
let OptanonAlertBoxClosed: string | undefined = undefined;

export default function OneTrustCookieScript({
  domianValue,
}: {
  domianValue: string;
}) {
  const [useinteraction, setUserinteraction] = useState(false);
  const loadAnalyticsScripts = async (): Promise<boolean> => {
    //if (window.Optanon && typeof window.Optanon.IsConsented === 'function') {

    const cookieDate = new Date();
    //
    const defaultCookieCategoryId = "C0001";
    const functionalCookieCategoryId = "C0002";
    const performanceCookieCategoryId = "C0003";
    const targetingCookieCategoryId = "C0004";
    //
    OptanonConsent = getCookieValue("OptanonConsent");
    OptanonAlertBoxClosed = getCookieValue("OptanonAlertBoxClosed");

    //
    const strickCK = OnetrustActiveGroups.includes(defaultCookieCategoryId)
      ? "0"
      : "1";
    const funCK = OnetrustActiveGroups.includes(functionalCookieCategoryId)
      ? "0"
      : "1";
    const perCK = OnetrustActiveGroups.includes(performanceCookieCategoryId)
      ? "0"
      : "1";
    const targetCK = OnetrustActiveGroups.includes(targetingCookieCategoryId)
      ? "0"
      : "1";

    //
    const oneTrustCookieconsentVal = strickCK + funCK + perCK + targetCK;

    const isUserAcctpedCookie: boolean =
      OptanonConsent &&
      OptanonConsent != "" &&
      OptanonAlertBoxClosed &&
      OptanonAlertBoxClosed != ""
        ? true
        : false;
    const cookieConsentVal = isUserAcctpedCookie
      ? oneTrustCookieconsentVal
      : "0111";

    // --> dataLayerFn("cookieconsent_ga4", "NA", dataLabel, "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA","NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA");
    if (isUserAcctpedCookie) {
      const formattedDate =
        cookieDate.getDate() +
        "-" +
        cookieDate.getMonth() +
        "-" +
        cookieDate.getFullYear() +
        " " +
        cookieDate.getHours() +
        ":" +
        cookieDate.getMinutes() +
        ":" +
        cookieDate.getSeconds();
      setNewCookie(
        `cookie_splash_flag_new=${encodeURI(formattedDate)}; path=/; secure`
      );
      setNewCookie(
        `cookie_splash_flag=${encodeURI(formattedDate)}; path=/; secure`
      );
    }
    setNewCookie(`cookieconsent=${cookieConsentVal}; path=/; secure`);

    // if (bannerCheck == "bannerExist") {
    // 	var limitedAdStatus = targetCK == "0" ? true : false;
    // 	window?.googletag?.cmd?.push(function() {
    // 		window?.googletag?.pubads().setPrivacySettings({
    // 			limitedAds: limitedAdStatus,
    // 		});
    // 	});
    // 	displayBanner();
    // }

    //loadDynamicJs("https://accounts.google.com/gsi/client"); */
    //}
    return isUserAcctpedCookie;
  };

  const watchOnetrustClosedcookie = async () => {
    const timeOutTime = setTimeout(async () => {
      OptanonAlertBoxClosed = getCookieValue("OptanonAlertBoxClosed");
      OptanonConsent = getCookieValue("OptanonConsent");

      if (
        OptanonConsent &&
        OptanonConsent != "" &&
        OptanonAlertBoxClosed &&
        OptanonAlertBoxClosed != ""
      ) {
        loadAnalyticsScripts();
      } else {
        watchOnetrustClosedcookie();
      }
    }, 1000);
  };
  const searchParams = useSearchParams();
  const ispreviewtrue =
    searchParams.get("preview") === "MY_SECRET_TOKEN" ? true : false;
  const [userConsentGiven, setUserConsentGiven] = useState<boolean>(false);
  useEffect(() => {
    // Function to check consent, when event fires
    const handleConsentChange = async () => {
      const returnVal = await loadAnalyticsScripts();
      setUserConsentGiven(() => returnVal);
      //watchOnetrustClosedcookie();
    };

    window.OptanonWrapper = handleConsentChange;

    const handleUserInteraction = () => {
      setUserinteraction(true);
      window.OptanonWrapper = handleConsentChange;
      // Remove event listeners after loading the script

     
    };
    handleUserInteraction()
   

   
  }, []);

  return (
    <Suspense fallback={<p>loading</p>}>
      {useinteraction && !ispreviewtrue && (
        <>
          {userConsentGiven ? (
            <Script
              src="https://accounts.google.com/gsi/client"
              id="googleGsiId"
              strategy="beforeInteractive"
            />
          ) : (
            <>
              <Script
                src={`${process.env.NEXT_PUBLIC_ONE_TRUST_SRC}`}
                id="oneTrustCookieeId"
                data-domain-script={domianValue}
                strategy="beforeInteractive"
              />
            </>
          )}
        </>
      )}
    </Suspense>
  );
}
