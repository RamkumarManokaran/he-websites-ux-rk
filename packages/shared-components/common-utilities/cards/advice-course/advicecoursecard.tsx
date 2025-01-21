"use client";
import React from "react";
import Image from "next/image";
import { formatDate } from "@packages/lib/utlils/helper-function";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const AdviceCourseCard = ({ jsondata, iscontentPreview, index }: any) => {
  let data = useContentfulLiveUpdates(jsondata);
  if (!iscontentPreview) {
    data = jsondata;
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
          className="card flex flex-col bg-white border border-grey-200 hover:border-primary-400 rounded-[8px] shadow-custom-2 overflow-hidden"
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
          <div className="card-body flex flex-col gap-[10px] p-[16px]">
            <h5
              className="card-title font-semibold text-para-lg text-grey300 line-clamp-2"
              id={`advice_carosoul_pod_title${index}${data?.sys?.id}`}
            >
              {data?.pageTitle}
            </h5>
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
        </a>
      )}
    </>
  );
};

export default AdviceCourseCard;
