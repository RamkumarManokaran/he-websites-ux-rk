"use client";
import React from "react";
import Image from "next/image";
import { currentAuthenticatedUser, formatDate, GA4DataLayerFn, getArticleDetailUrlParamValues } from "@packages/lib/utlils/helper-function";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import { DataLayerGA4AttrType } from "@packages/lib/types/datalayerGA";
import { usePathname } from "next/navigation";
const AdviceCourseCard = ({ jsondata, iscontentPreview, index ,heading, parentCategory}: any) => {
  let data = useContentfulLiveUpdates(jsondata);
  if (!iscontentPreview) {
    data = jsondata;
  }

  const pathName = usePathname();
  const{category, subCategory, articleTitle} = getArticleDetailUrlParamValues();


  
  
  function handleGACTABannerCTAclick(urlSlug: string){
    const currPageName = localStorage.getItem("gaPageName")?.toString() ?? "";
    const GAlog = async() => {
      const datalog: DataLayerGA4AttrType = {
        event: "ga_contentful_events",
        eventName: "article_clicks",
        data_label: currPageName == "articleDetail" ? subCategory : data?.pageTitle,
        data_label3: index + 1,
        clearing: "in_year",
        page_name: localStorage.getItem("gaPageName")?.toString(),
        article_category: currPageName == "articleDetail" ? category : parentCategory,
        cta_url: window.location.origin + urlSlug,
        contentful_1: heading,
  
      };
      GA4DataLayerFn(datalog);
    }
    GAlog();
  }

  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: data?.sys?.id,
              fieldId: "imgUpload",
              targetSelector: `#advice_carosoul_image${index}${data?.sys?.id}`,
            },
            {
              entryId: data?.sys?.id,
              fieldId: "imgUpload",
              targetSelector: `#advice_carosoul_pod_title${index}${data?.sys?.id}`,
            },
            {
              entryId: data?.sys?.id,
              fieldId: "imgUpload",
              targetSelector: `#advice_carosoul_pod_description${index}${data?.sys?.id}`,
            },
            {
              entryId: data?.sys?.id,
              fieldId: "imgUpload",
              targetSelector: `#advice_carosoul_pod_date${index}${data?.sys?.id}`,
            },
          ]}
        />
      )}
      {data && (
        <a
          href={data?.urlSlug || "/"}
          onClick={() => handleGACTABannerCTAclick(data?.urlSlug)}
          className="card h-full flex flex-col bg-white border border-grey-200 hover:border-primary-400 rounded-[8px] shadow-custom-2 overflow-hidden"
        >
          <div className="card-header">
            {data?.bannerImageCollection?.items[0]?.imgUpload?.url && (
              <Image
                id={`advice_carosoul_image${index}${data?.sys?.id}`}
                src={
                  data?.bannerImageCollection?.items[0]?.imgUpload?.url ||
                  `${process.env.SUBDOMAIN}/static/assets/images/article_image1.jpg`
                }
                width="392"
                height="221"
                className="block w-full h-auto min-h-[185px]"
                alt={data?.bannerImageCollection?.items[0]?.imgAltText}
              />
            )}
          </div>
          <div className="card-body flex flex-col justify-start h-full gap-[10px] p-[16px]">
            <h5
              className="card-title font-semibold text-para-lg text-grey300 line-clamp-2"
              id={`advice_carosoul_pod_title${index}${data?.sys?.id}`}
            >
              {data?.pageTitle}
            </h5>
            <div className="flex flex-col gap-[10px]">
              <p
                className="card-description font-normal small text-grey-700 line-clamp-2"
                id={`advice_carosoul_pod_description${index}${data?.sys?.id}`}
              >
                {data?.shortDescription}
              </p>
              <p
                className="card-date font-normal x-small text-grey300"
                id={`advice_carosoul_pod_date${index}${data?.sys?.id}`}
              >
                {formatDate(data?.modifiedDate)}
              </p>
            </div>
          </div>
        </a>
      )}
    </>
  );
};

export default AdviceCourseCard;
