"use server";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import React, { Suspense } from "react";
import { homePageComponentQueryFormation } from "@packages/lib/graphQL/fetch-function";
import { FaqsQuery } from "@packages/lib/graphQL/article-landing";
import FaqClient from "./faq-clientwrap";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
const Faqcomponents = async ({
  heading,
  subheading,
  internalName,
  routename,
  contentModelName,
  iscontentPreview,
  parentSysId,
}: any) => {
  const query = homePageComponentQueryFormation(
    internalName,
    FaqsQuery,
    routename,
    contentModelName,
    iscontentPreview
  );
  const jsondata = (await graphQlFetchFunction(query, iscontentPreview))?.data
    ?.contentData?.items[0]?.bodyContentCollection?.items[0]
    ?.mediaCardsCollection?.items[0];
  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: parentSysId,
              fieldId: "cardSectionTitle",
              targetSelector: "#fqa_heading",
            },
            {
              entryId: parentSysId,
              fieldId: "shortDescription",
              targetSelector: "#fqa_subheading",
            },
          ]}
        />
      )}
      <Suspense fallback={<p>loading</p>}>
        <div className="faq-container bg-white">
          <div className="max-w-container mx-auto">
            <div className="faq-card-container flex flex-col gap-[32px] px-[16px] py-[40px] md:py-[64px] md:px-[20px] xl:px-[0]">
              <div className="faq-header flex flex-col gap-[4px]">
                <div className="h2 font-bold" id="fqa_heading">
                  {heading}
                </div>
                <p className="font-normal small" id="fqa_subheading">
                  {subheading}
                </p>
              </div>
              <FaqClient
                jsondata={jsondata}
                isContentPreview={iscontentPreview}
              />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Faqcomponents;
