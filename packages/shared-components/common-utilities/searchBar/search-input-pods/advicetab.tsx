"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GADataLayerFn } from "@packages/lib/utlils/helper-function";

import Form from "next/form";
interface AdviceTabProps {
  searchFormHandle: any;
  setsearchFormHandle: any;
}
const AdviceTab: React.FC<AdviceTabProps> = ({
  searchFormHandle,
  setsearchFormHandle,
}) => {
  const [adviceerror, setAdviceerror] = useState(false);
  const router = useRouter();
  function handleSubmit() {
    if (searchFormHandle?.advice.trim()) {
      const formattedAdvice = searchFormHandle.advice
        .trim()
        .replace(/[^a-zA-Z0-9\s]+/g, "-")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();
      GADataLayerFn(
        "ga_events",
        "homepage_search",
        "advice_search",
        "NA",
        "NA",
        "NA",
        localStorage?.getItem("gaPageName") || "",
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        "in_year",
        "0",
        "NA",
        "NA",
        "NA",
        formattedAdvice,
        "NA",
        "NA",
        `${process.env.PROJECT}`,
        "NA",
        "NA"
      );
      return router.push(`/article-search/?keyword=${formattedAdvice}`);
    } else {
      setAdviceerror(true);
    }
  }
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="bg-white rounded-[24px] p-[16px] border border-grey-200 hover:border-primary-500 shadow-custom-1 md:rounded-[32px] md:pl-[24px] md:p-[10px]">
        <Form
          action={handleSubmit}
          className="flex flex-col gap-[16px] small md:flex-row"
        >
          <div className="relative grow">
            <input
              autoComplete="off"
              name="keyword"
              onChange={(event) => {
                setsearchFormHandle((preData: any) => ({
                  ...preData,
                  advice: event.target.value
                    .replace(/\s{2,}/g, " ")
                    .trimStart(),
                }));
                setAdviceerror(false);
              }}
              type="text"
              className="w-full focus:outline-none pt-0 pb-[16px] text-black placeholder:text-gray-500 border-b border-grey-200 md:py-[10px] md:border-none"
              aria-label=""
              placeholder="Enter keyword"
              value={searchFormHandle?.advice}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary flex items-center justify-center gap-[6px] px-[24px] py-[10px] md:w-[114px]"
          >
            <Image
              src="/static/assets/icons/search_icon.svg"
              width="18"
              height="18"
              alt="Search icon"
            />
            Search
          </button>
        </Form>
      </div>
      {adviceerror && (
        <p className="small text-negative-default">
          Please enter valid keyword
        </p>
      )}
    </div>
  );
};

export default AdviceTab;
