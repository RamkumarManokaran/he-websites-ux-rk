"use client";

import { getCurrentUser } from "@aws-amplify/auth";
// import { callClickstreamAPI } from "../server-actions/server-action";
import { currentAuthenticatedUser } from "./helper-function";
import { fetchAuthSession } from "@aws-amplify/auth";
import { API_END_POINTS } from "../utlils/API_END_POINTS";
import { v4 as uuidv4 } from "uuid";

export interface ClickstreamInterface {
  eventType?: any;
  pageName?: any;
  sectionName?: any;
  functionalityName?: any;
  actionType?: any;
  CTATitle?: any;
  videoName?: any;
  videoCategory?: any;
  institutionCountryName?: any;
  idpInstitutionId?: any;
  idpcInstitutionId?: any;
  interestedIntakeYear?: any;
  signupMethod?: any;
  signupFailureReason?: any;
  networkId?: any;
  sessionTrackId?: any;
  userId?: any;
  articleTopic?: any;
}

export function logClickstreamEvent(data: ClickstreamInterface) {
  log(data);
}
async function log(data: ClickstreamInterface) {
  const userLoggedIn = await currentAuthenticatedUser();
  const userId = userLoggedIn === "1" ? (await getCurrentUser())?.userId : "0";
  let defaultAttributes = {
    affiliateId: "220703",
    userloggedIn: userLoggedIn,
    userId: userId,
    siteName: "Whatuni",
    refererURL: document?.referrer,
    requestURL: encodeURIComponent(window.location.href),
    siteLanguage: "English",
    isMobileUser: `${window.innerWidth < 1024 ? "Y" : "N"}`,
    screenResolution:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    systemname: "Domestic",
  };
  userId && (defaultAttributes = { ...defaultAttributes, userId: userId });

  async function callClickstreamAPI(payload: any) {
    try {
      const session = await fetchAuthSession();
      const tracksession_id = uuidv4().replace(/\D/g, "").slice(0, 8);
      const headers: any = {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
        tracksessionid: tracksession_id,
      };
      let apiUrl = `${process.env.NEXT_PUBLIC_BFF_API_DOMAIN}`;

      if (session.tokens?.idToken) {
        headers.Authorization = `${session.tokens.idToken}`;
        apiUrl += API_END_POINTS.user.clickstream;
      } else {
        apiUrl += API_END_POINTS.guest.clickstream;
      }
      //console.log("before clickstream CS APT call for: ", payload);
      const respone = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: payload ? JSON.stringify(payload) : undefined,
      });
      //console.log("after clickstream CS APT call: ", respone);
    } catch (error: any) {
      console.log("Clickstram error: ", error);
    }
  }
  callClickstreamAPI({ ...defaultAttributes, ...data });
}
