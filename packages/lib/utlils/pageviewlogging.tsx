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
  gaData?: DataLayerGA4AttrType;
  csData?: ClickstreamInterface;
  pageNameLocal: string; //mandatory to set pageName in localStorage
  gaData?: DataLayerGA4AttrType;
  csData?: ClickstreamInterface;
  pageNameLocal: string; //mandatory to set pageName in localStorage
}
const PageViewLogging: React.FC<PageViewLoggingProps> = ({
  gaData,
  csData,
  pageNameLocal,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gaPageName", pageNameLocal ?? "");
    }

    //GA event
    if (gaData) {
      gaData.event = "pageview";
      gaData.clearing = gaData.clearing ?? "in_year";
      const GAData = async () => GA4DataLayerFn(gaData);
      GAData();
    }

    //CS event
    if (csData) {
      //console.log("CS for pageview");
      csData.eventType = csData.eventType ?? "pageViewed";
      logClickstreamEvent(csData);
    }

    //browser tap switch handling
    const handleTapSwitch = () => {
      if (document.visibilityState === "visible") {
        localStorage.setItem("gaPageName", pageNameLocal ?? "");
      }
    };

    //page on load handle
    const handleOnload = () => {
      document.addEventListener("visibilitychange", handleTapSwitch);
    };

    //on load, off load logic
    if (document.readyState === "complete") {
      handleOnload();
    } else {
      window.addEventListener("load", handleOnload);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleTapSwitch, true);
      window.removeEventListener("load", handleOnload);
    };
  }, []);
  return <></>;
};

export default PageViewLogging;
