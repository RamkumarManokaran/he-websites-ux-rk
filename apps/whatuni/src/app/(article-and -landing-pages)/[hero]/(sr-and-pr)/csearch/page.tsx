"use server";
import React from "react";
import PrPageComponent from "@packages/shared-components/pr-page/prpage-component";
const page = async ({ searchParams }: any) => {
  const searchparams = await searchParams;
  return <PrPageComponent searchparams={searchparams} />;
};

export default page;
