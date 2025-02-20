"use server";
import React from "react";
import { LinksQuery } from "@packages/lib/graphQL/article-landing";
import { homePageComponentQueryFormation } from "@packages/lib/graphQL/fetch-function";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import LinkcardBig from "../cards/article-link/articlelink-big";
import LinkcardSmall from "../cards/article-link/articlelink-small";
const Articlelinkcomponents = async ({
  heading,
  subheading,
  internalName,
  routename,
  contentModelName,
  iscontentPreview,
}: any) => {
  const query = homePageComponentQueryFormation(
    internalName,
    LinksQuery,
    routename,
    contentModelName,
    iscontentPreview
  );
  const data = (await graphQlFetchFunction(query, iscontentPreview))?.data
    ?.contentData?.items[0]?.bodyContentCollection?.items[0]
    ?.mediaCardsCollection?.items;
  return (
    <div className="articlelink-container bg-grey-50">
      <div className="max-w-container mx-auto">
        <div className="articlelink-card-container flex flex-col gap-[32px] px-[16px] md:px-[20px] xl:px-[0] py-[40px] md:py-[64px]">
          <div className="articlelink-header flex flex-col gap-[4px]">
            {heading && <div className="h2 font-bold">{heading}</div>}
            {subheading && (
              <p className="font-normal small">{subheading}</p>
            )}
          </div>
          <div className="articlelink-course-container ">
            <div className="articlelink-inner-wrap">
              <div className="articlelink-card flex flex-col gap-[24px]">
                <LinkcardBig linkdata={data[0]} />
                <LinkcardSmall linkdata={data[1]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articlelinkcomponents;
