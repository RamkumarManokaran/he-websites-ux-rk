"use client";

import React from "react";
import { GA4DataLayerFn, GADataLayerFn, currentAuthenticatedUser} from "@packages/lib/utlils/helper-function";
import { DataLayerGA4AttrType } from "../types/datalayerGA";

interface ClickTrackingWrapperProps {
  children: React.ReactNode;
  gaData: DataLayerGA4AttrType;
}

const ClickTrackingWrapper: React.FC<ClickTrackingWrapperProps> = ({ children, gaData }) => {
  const handleClick = () => {
    if(!gaData.page_name || gaData.page_name === ""){
      gaData.page_name = localStorage?.getItem('gaPageName')?.toString();
    }
    const GAData = async() => {
      GA4DataLayerFn(gaData);
    }
    GAData();
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default ClickTrackingWrapper;