"use server";
import { Suspense } from "react";
import Eligibilitycriteriacard from "@packages/shared-components/common-utilities/cards/eligibility-criteria/eligibilitycriteriacard";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import React from "react";
import { discoverpodQuery } from "@packages/lib/graphQL/graphql-query";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { homePageComponentQueryFormation } from "@packages/lib/graphQL/fetch-function";
import Eligibilitycriteriacardskeleton from "@packages/shared-components/skeleton/eligibilitycriteriacardskeleton";
interface PropsInterface {
  heading: string | undefined;
  subheading: string | undefined;
  internalName: string | undefined;
  routename: string;
  contentModelName: string;
  iscontentPreview: boolean;
  parentSysId: string;
  category?: any;
  subCategory?: any;
}
const Eligibilitycriteriacomponents = async ({
  heading,
  subheading,
  internalName,
  routename,
  contentModelName,
  iscontentPreview,
  parentSysId,
  category,
  subCategory,
}: PropsInterface) => {
  const query = homePageComponentQueryFormation(
    internalName,
    discoverpodQuery,
    routename,
    contentModelName,
    iscontentPreview
  );
  const data = (await graphQlFetchFunction(query, iscontentPreview))?.data
    ?.contentData?.items[0]?.bodyContentCollection?.items[0]
    ?.mediaCardsCollection?.items;
  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: parentSysId,
              fieldId: "cardSectionTitle",
              targetSelector: "#eligiblitycard_heading",
            },
            {
              entryId: parentSysId,
              fieldId: "shortDescription",
              targetSelector: "#eligiblitycard_subheading",
            },
          ]}
        />
      )}
      {data && (
        <Suspense fallback={<Eligibilitycriteriacardskeleton />}>
          <div className="eligibility-container bg-grey-50">
            <div className="max-w-container mx-auto">
              <div className="eligibility-card-container flex flex-col gap-[32px] px-[16px] md:px-[20px] xl:px-[0] py-[34px] md:py-[64px]">
                <div className="eligibility-header flex flex-col gap-[4px]">
                  {heading && (
                    <div className="h2 font-bold" id="eligiblitycard_heading">
                      {heading}
                    </div>
                  )}
                  {subheading && (
                    <p
                      className="font-normal small"
                      id="eligiblitycard_subheading"
                    >
                      {subheading}
                    </p>
                  )}
                </div>
                <div className="eligibility-course-container ">
                  <div className="eligibility-inner-wrap grid grid-col-1 md:grid-cols-3 gap-[16px]">
                    {data?.map((items: any, index: number) => (
                      <Eligibilitycriteriacard
                        key={index}
                        data={items}
                        iscontentPreview={iscontentPreview}
                        sysId={items?.sys?.id}
                        index={index}
                        category={category}
                        subCategory={subCategory}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      )}
    </>
  );
};

export default Eligibilitycriteriacomponents;
