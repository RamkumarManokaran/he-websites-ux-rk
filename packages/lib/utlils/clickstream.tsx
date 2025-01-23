"use client"

import { getCurrentUser } from "@aws-amplify/auth";
import { callClickstreamAPI } from "../server-actions/server-action";
import { currentAuthenticatedUser } from "./helper-function";

interface ClickstreamInterface{
  eventType?: any,
  pageName?: any,
  sectionName?: any,
  functionalityName?: any,
  actionType?: any,
  CTATitle?: any,
  videoName?: any,
  videoCategory?: any,
  institutionCountryName?: any,
  idpInstitutionId?: any,
  idpcInstitutionId?: any,
  interestedIntakeYear?: any,
  signupMethod?: any,
  signupFailureReason?: any,
  networkId?: any,
  sessionTrackId?: any,
}

export function logClickstreamEvent(data: ClickstreamInterface) {
  log(data);
}
async function log(data: ClickstreamInterface) {
  const userLoggedIn = await currentAuthenticatedUser();
  const userId = userLoggedIn === "1" ? await getCurrentUser() : "0";
  let defaultAttributes = {

      affiliateId: "220703",
      userloggedIn: userLoggedIn,
      userId: userId,
      siteName: "Whatuni",
      refererURL: document?.referrer,
      requestURL:window.location.href,
      siteLanguage: "English",
      isMobileUser: `${window.innerWidth < 1024 ? "Y" : "N"}`,
      screenResolution:window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      systemname:"Domestic",
  }
  userId && (defaultAttributes = {...defaultAttributes, userId: userId});
  callClickstreamAPI({ ...defaultAttributes, ...data })
}
