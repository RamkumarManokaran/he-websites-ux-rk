"use client";

import { getCurrentUser } from "@aws-amplify/auth";
import { DataLayerGA4AttrType } from "../types/datalayerGA";
import { usePathname } from "next/navigation";

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
  return value !=null && value != undefined && value != "" ? replaceSpaceWithUnderscore(value) : "NA";
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

export function GA4DataLayerFn(dataLog: DataLayerGA4AttrType){
  const waitForDataLayer = async() => {
    const cookiesval1: any = decodeURIComponent(getCookie("UCAS") || "{}");
    const point: any = JSON.parse(cookiesval1);
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: replaceWithNA(dataLog.event),
        "event name": replaceWithNA(dataLog.eventName),
        data_label: replaceWithNA(dataLog.data_label),
        data_label2: replaceWithNA(dataLog.data_label2),
        cpe_parent_subject: replaceWithNA(dataLog.cpe_parent_subject),
        cpe_child_subject: replaceWithNA(dataLog.cpe_child_subject),
        page_name: replaceWithNA(dataLog.page_name),
        college_name: replaceWithNA(dataLog.college_name),
        provider_type: replaceWithNA(dataLog.provider_type),
        course_name: replaceWithNA(dataLog.course_name),
        sponsored_sr: replaceWithNA(dataLog.sponsored_sr),
        college_id: replaceWithNA(dataLog.college_id),
        ucas_points: replaceWithNA(point?.ucasPoint),
        study_mode: replaceWithNA(dataLog.study_mode),
        target_year: replaceWithNA(dataLog.target_year),
        clearing: replaceWithNA(dataLog.clearing),
        wu_user_id: !dataLog.user_id ? await currentAuthenticatedUser() : replaceWithNA(dataLog.user_id),
        study_level: replaceWithNA(dataLog.study_level),
        article_category: replaceWithNA(dataLog.article_category),
        destination_country: replaceWithNA(dataLog.destination_country),
        data_label3: replaceWithNA(dataLog.data_label3),
        data_label4: replaceWithNA(dataLog.data_label4),
        data_label5: replaceWithNA(dataLog.data_label5),
        cta_name: replaceWithNA(dataLog.cta_name),
        cta_url: replaceWithNA(dataLog.cta_url),
        website_name: replaceWithNA(`${process.env.PROJECT}`)?.toLowerCase(),
        contentful_1: replaceWithNA(dataLog.contentful_1),
        contentful_2: replaceWithNA(dataLog.contentful_2),
      });
    } else {
      setTimeout(waitForDataLayer, 100); // Retry after 100ms
    }
  };

  waitForDataLayer();
}

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

export function getArticleDetailUrlParamValues(){
  let category, subCategory, articleTitle = "";
  if(typeof localStorage !== 'undefined' && localStorage.getItem("gaPageName")?.toString() == "articleDetail"){
    let pathArr = usePathname()?.split("/").filter((pathvar) => pathvar != "");
    if(pathArr.length >= 3){
      category = pathArr[0];
      subCategory = pathArr[1];
      articleTitle = pathArr[2];
    }
  }
  return {category, subCategory, articleTitle};
}
