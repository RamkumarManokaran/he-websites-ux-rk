"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getCookieValue, setNewCookie } from "../utlils/commonFunction";
let OptanonConsent: string | undefined = undefined;
let OptanonAlertBoxClosed: string | undefined = undefined;
export default function OneTrustCookieScript({
  domianValue,
}: {
  domianValue: string;
}) {
  let ispreviewtrue = false;

  const [userConsentGiven, setUserConsentGiven] = useState<boolean>(false);
  const loadAnalyticsScripts = () => {
    const cookieDate = new Date();
    const defaultCookieCategoryId = "C0001";
    const functionalCookieCategoryId = "C0002";
    const performanceCookieCategoryId = "C0003";
    const targetingCookieCategoryId = "C0004";
    OptanonConsent = getCookieValue("OptanonConsent");
    OptanonAlertBoxClosed = getCookieValue("OptanonAlertBoxClosed");
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

    return isUserAcctpedCookie;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window?.location?.search);
    ispreviewtrue = searchParams.get("preview") === "MY_SECRET_TOKEN";
    const handleConsentChange = () => {
      const returnVal = loadAnalyticsScripts();
      setUserConsentGiven(() => returnVal);
    };
    window.OptanonWrapper = handleConsentChange;
  }, []);

  return (
    <>
      {!ispreviewtrue && (
        <>
          {userConsentGiven ? (
            <Script
              src="https://accounts.google.com/gsi/client"
              id="googleGsiId"
              strategy="lazyOnload"
            />
          ) : (
            <>
              <Script
                src={`${process.env.NEXT_PUBLIC_ONE_TRUST_SRC}`}
                id="oneTrustCookieeId"
                data-domain-script={domianValue}
                strategy="lazyOnload"
              />
            </>
          )}
        </>
      )}
    </>
  );
}
