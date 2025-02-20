import React from 'react'
import Link from 'next/link'
import ClickTrackerWrapper from "@packages/lib/utlils/clicktrackerwrapper";

const Findoutmore = ({ propsdata, key, preview, urlParams }: any) => {

  const category = urlParams.hero;
  const subCategory = urlParams.theme;
  const articleTitle = urlParams.article;

  let linkText = ""; //need to be removed once dynamic data added in contentful
  let linkURl = ""; //need to be removed once dynamic data added in contentful
  return (
    <div className="px-[20px] bg-grey-50 py-[16px] border-grey-500 border-l-4 flex flex-col gap-[8px]">
    <span className="x-small uppercase tracking-[1px] font-semibold grey300">
      FIND OUT MORE
    </span>
    <ClickTrackerWrapper gaData={
      {
        event: "ga_contentful_events",
        eventName: "", //to be logged in future when data availabe in contentful
        data_label: subCategory,
        article_category: category,
        cta_name: linkText,
        cta_url: linkURl,
        clearing: "in_year",
  
      }
    } >
        <Link className="para text-blue-400" href={linkURl}>
         {linkText} link1
        </Link>
    </ClickTrackerWrapper>
    <ClickTrackerWrapper gaData={
      {
        event: "ga_contentful_events",
        eventName: "",
        data_label: subCategory,
        article_category: category,
        cta_name: linkText,
        cta_url: linkURl,
        clearing: "in_year",
  
      }
    } >
        <Link className="para text-blue-400" href={linkURl}>
         {linkText}link2
        </Link>
    </ClickTrackerWrapper>
  </div>
  )
}

export default Findoutmore