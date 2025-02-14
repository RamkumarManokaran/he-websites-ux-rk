"use server";
import React from "react";
import SearchResultComponent from "@packages/shared-components/sr-page/srpage-component";
const Page = async ({ searchParams }: any) => {
  const searchparams = await searchParams;
  return <SearchResultComponent searchparams={searchparams} />;
};

export default Page;
