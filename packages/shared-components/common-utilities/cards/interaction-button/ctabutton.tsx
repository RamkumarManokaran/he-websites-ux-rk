import React from "react";
import Link from "next/link";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import { GA4DataLayerFn } from "@packages/lib/utlils/helper-function";
import ClickTrackerWrapper from "@packages/lib/utlils/clicktrackerwrapper";
const Ctabutton = ({
  index,
  cta,
  sysId,
  iscontentPreview,
  title,
  category,
  subCategory,
}: any) => {
  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: sysId,
              fieldId: "cta",
              targetSelector: `#eligibility_cta_btn${index}`,
            },
          ]}
        />
      )}
      <ClickTrackerWrapper
        gaData={{
          event: "ga_contentful_events",
          eventName: cta?.primaryCtaEventName || "",
          cta_name: cta?.primaryCtaLabel || "",
          cta_url: cta.primaryCtaUrl || "",
          website_name: `${process.env.PROJECT}`,
          page_name:
            typeof window !== "undefined"
              ? localStorage?.getItem("gaPageName") || ""
              : "",
          contentful_1: title,
          data_label: subCategory || "",
          article_category: category || "",
        }}
      >
        <Link
          href={cta?.primaryCtaUrl || "/"}
          id={`eligibility_cta_btn${index}`}
          className="btn btn-primary flex items-center justify-center min-w-[117px] w-fit gap-[8px] p-[10px_20px] group-hover:bg-primary-500"
        >
          {cta?.primaryCtaLabel}
        </Link>
      </ClickTrackerWrapper>
    </>
  );
};

export default Ctabutton;
