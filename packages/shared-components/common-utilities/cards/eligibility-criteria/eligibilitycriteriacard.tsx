import Link from "next/link";
import Image from "next/image";
import React from "react";
import Ctabutton from "../interaction-button/ctabutton";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const Eligibilitycriteriacard = ({
  index,
  data,
  sysId,
  iscontentPreview,
}: any) => {
  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: data?.image?.sys?.id,
              fieldId: "imgUpload",
              targetSelector: `#eligiblity_image_${index}`,
            },
            {
              entryId: sysId,
              fieldId: "title",
              targetSelector: `#eligiblity_title_${index}`,
            },
            {
              entryId: sysId,
              fieldId: "subtitle",
              targetSelector: `#eligiblity_subTitle_${index}`,
            },
          ]}
        />
      )}
      <div
        className="card group flex flex-col bg-white border border-grey-200 rounded-[8px] shadow-custom-2 overflow-hidden p-[16px] gap-[16px]"
      >
        <div className="card-body flex flex-col gap-[8px]">
          <div className="card-header w-[48px]">
            {data?.image?.imgUpload?.url && (
              <Image
                id={`eligiblity_image_${index}`}
                src={data?.image?.imgUpload?.url}
                width="48"
                height="48"
                className="block w-full h-auto min-h-[48px]"
                alt={data?.image?.imgAltText}
              />
            )}
          </div>
          <h5
            className="card-title font-farro para-lg font-semibold text-grey300 line-clamp-2"
            id={`eligiblity_title_${index}`}
          >
            {data?.title}
          </h5>
          <p
            className="card-description font-normal small text-grey300 line-clamp-2"
            id={`eligiblity_subTitle_${index}`}
          >
            {data?.subTitle}
          </p>
        </div>
        {data?.cta?.primaryCtaUrl && data?.cta?.primaryCtaLabel && (
          <Ctabutton
            cta={data?.cta}
            sysId={data?.sys?.id}
            iscontentPreview={iscontentPreview}
            index={index}
          />
        )}
      </div>
    </>
  );
};

export default Eligibilitycriteriacard;
