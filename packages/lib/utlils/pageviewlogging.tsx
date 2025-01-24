"use client";

import { useEffect } from "react";

import {
  GA4DataLayerFn,
  GADataLayerFn,
  currentAuthenticatedUser,
} from "@packages/lib/utlils/helper-function";
import { DataLayerGA4AttrType } from "../types/datalayerGA";
import { logClickstreamEvent, ClickstreamInterface } from "./clickstream";

interface PageViewLoggingProps {
  gaData: DataLayerGA4AttrType,
  csData?: ClickstreamInterface,
}
const PageViewLogging: React.FC<PageViewLoggingProps> = ({ gaData, csData }) => {
  useEffect(() => {

    if (typeof window !== "undefined") {
      localStorage.setItem("gaPageName", gaData.page_name?.toString() ?? "");
    }
    gaData.event = "pageview";
    gaData.clearing = gaData.clearing ?? "in_year";
    const GAData = async () => GA4DataLayerFn(gaData);
    GAData();
    if(csData){
      //console.log("CS for pageview");
      csData.eventType = csData.eventType ?? "pageViewed";
      logClickstreamEvent(csData);
    }
  }, []);
  return <></>;
};

export default PageViewLogging;