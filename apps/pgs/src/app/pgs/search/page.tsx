"use server";
import React from "react";
import SrPageComponent from "@packages/shared-components/sr-page/srpage-component";
const page = async ({ searchParams }: any) => {
  const searchparams = await searchParams;
  return <SrPageComponent searchparams={searchparams} />;
};

export default page;
