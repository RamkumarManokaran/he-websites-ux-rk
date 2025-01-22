"use client";

import { getCurrentUser } from "@aws-amplify/auth";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}
function replaceSpaceWithUnderscore(value: any) {
  return value && value != "NA"
    ? value.toString().trim().toLowerCase().replaceAll(" ", "_")
    : value;
}

function replaceWithNA(value: any) {
  return !value ? "NA" : replaceSpaceWithUnderscore(value);
}

async function currentAuthenticatedUser() {
  try {
    const userData = await getCurrentUser();
    // Return "1" if userId exists, otherwise "0"
    return userData?.userId ? "1" : "0";
  } catch (err) {
    // Optionally return "0" if an error occurs
    return "0";
  }
}

// function GADataLayerFn(
//   event?: any,
//   eventName?: any,
//   dataLabel?: any,
//   dataLabel2?: any,
//   cpeParentSubject?: any,
//   cpeChildSubject?: any,
//   pageName?: any,
//   pageNameContentful?: any,
//   collegeName?: any,
//   providerType?: any,
//   courseName?: any,
//   sponsoredSr?: any,
//   collegeId?: any,
//   ucasPoints?: any,
//   studyMode?: any,
//   targetYear?: any,
//   clearing?: any,
//   userId?: any,
//   studyLevel?: any,
//   articleCategory?: any,
//   destinationCountry?: any,
//   dataLabel3?: any,
//   dataLabel4?: any,
//   dataLabel5?: any,
//   website?: any,
//   ctaName?: any,
//   ctaUrl?: any,
//   contentful_1?: any,
//   contentful_2?: any
// ) {
//   if (typeof window !== "undefined") {
//     if (window.dataLayer) {
//       window.dataLayer.push({
//         event: replaceWithNA(event),
//         "event name": replaceWithNA(eventName),
//         data_label: replaceWithNA(dataLabel),
//         data_label2: replaceWithNA(dataLabel2),
//         cpe_parent_subject: replaceWithNA(cpeParentSubject),
//         cpe_child_subject: replaceWithNA(cpeChildSubject),
//         page_name: replaceWithNA(pageName)?.toLowerCase(),
//         college_name: replaceWithNA(collegeName),
//         provider_type: replaceWithNA(providerType),
//         course_name: replaceWithNA(courseName),
//         sponsored_sr: replaceWithNA(sponsoredSr),
//         college_id: replaceWithNA(collegeId),
//         ucas_points: replaceWithNA(getCookie("UCAS")),
//         study_mode: replaceWithNA(studyMode),
//         target_year: replaceWithNA(targetYear),
//         clearing: replaceWithNA(clearing),
//         wu_user_id: userId,
//         study_level: replaceWithNA(studyLevel),
//         article_category: replaceWithNA(articleCategory),
//         destination_country: replaceWithNA(destinationCountry),
//         data_label3: replaceWithNA(dataLabel3),
//         data_label4: replaceWithNA(dataLabel4),
//         data_label5: replaceWithNA(dataLabel5),
//         cta_name: replaceWithNA(ctaName),
//         ctaUrl: replaceWithNA(ctaUrl),
//         website_name: replaceWithNA(website)?.toLowerCase(),
//         contentful_1: replaceWithNA(contentful_1),
//         contentful_2: replaceWithNA(contentful_2),
//       });
//     } else {
//     }
//   } else {
//     console.warn("Window is not available to log GA");
//   }
// }

function GADataLayerFn(
  event?: any,
  eventName?: any,
  dataLabel?: any,
  dataLabel2?: any,
  cpeParentSubject?: any,
  cpeChildSubject?: any,
  pageName?: any,
  pageNameContentful?: any,
  collegeName?: any,
  providerType?: any,
  courseName?: any,
  sponsoredSr?: any,
  collegeId?: any,
  ucasPoints?: any,
  studyMode?: any,
  targetYear?: any,
  clearing?: any,
  userId?: any,
  studyLevel?: any,
  articleCategory?: any,
  destinationCountry?: any,
  dataLabel3?: any,
  dataLabel4?: any,
  dataLabel5?: any,
  website?: any,
  ctaName?: any,
  cta_url?: any,
  contentful_1?: any,
  contentful_2?: any
) {
  const waitForDataLayer = () => {
    const cookiesval1: any = decodeURIComponent(getCookie("UCAS") || "{}");
    const point: any = JSON.parse(cookiesval1);
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: replaceWithNA(event),
        "event name": replaceWithNA(eventName),
        data_label: replaceWithNA(dataLabel),
        data_label2: replaceWithNA(dataLabel2),
        cpe_parent_subject: replaceWithNA(cpeParentSubject),
        cpe_child_subject: replaceWithNA(cpeChildSubject),
        page_name: replaceWithNA(pageName),
        college_name: replaceWithNA(collegeName),
        provider_type: replaceWithNA(providerType),
        course_name: replaceWithNA(courseName),
        sponsored_sr: replaceWithNA(sponsoredSr),
        college_id: replaceWithNA(collegeId),
        ucas_points: replaceWithNA(point?.ucasPoint),
        study_mode: replaceWithNA(studyMode),
        target_year: "NA",
        clearing: replaceWithNA(clearing),
        wu_user_id: userId,
        study_level: replaceWithNA(studyLevel),
        article_category: replaceWithNA(articleCategory),
        destination_country: replaceWithNA(destinationCountry),
        data_label3: replaceWithNA(dataLabel3),
        data_label4: replaceWithNA(dataLabel4),
        data_label5: replaceWithNA(dataLabel5),
        cta_name: replaceWithNA(ctaName),
        cta_url: replaceWithNA(cta_url),
        website_name: replaceWithNA(website)?.toLowerCase(),
        contentful_1: replaceWithNA(contentful_1),
        contentful_2: replaceWithNA(contentful_2),
      });
    } else {
      setTimeout(waitForDataLayer, 100); // Retry after 100ms
    }
  };

  waitForDataLayer();
}
function getInitialsFromJWT(token: any) {
  const email = token?.payload?.email;
  if (!email) {
    throw new Error("Email not found in token payload");
  }
  const namePart = email.split("@")[0];
  const initials = namePart
    ?.split(".")
    ?.map((part: any) => part.charAt(0).toUpperCase())
    ?.join("")
    ?.slice(0, 2);
  return initials;
}
export {
  getCookie,
  replaceSpaceWithUnderscore,
  replaceWithNA,
  GADataLayerFn,
  currentAuthenticatedUser,
  getInitialsFromJWT,
};

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

console.log(formatDate("2025-01-20T14:00:00.000Z"));
