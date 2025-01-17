"use server";
import React from "react";
import { ArticleLandingPageQuery } from "@packages/lib/graphQL/article-landing";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { MultipleCardContainer } from "@packages/lib/types/interfaces";
import dynamicComponentImports from "@packages/lib/dynamic-imports/imports";
import ColcBanner from "@packages/shared-components/common-utilities/colc-banner/colc-banner";
const page = async () => {
  const jsondata = await graphQlFetchFunction(ArticleLandingPageQuery);
  const componentList =
    jsondata?.data?.contentData?.items[0]?.bodyContentCollection?.items;
  const bannerData = jsondata?.data?.contentData?.items[0]?.bannerImage;
  // console.log(componentList);
  return (
    <div className="article_landing">
      {bannerData && <ColcBanner data={bannerData} routename={"/advice"} />}
      {componentList?.map(
        (childItems: MultipleCardContainer, index: number) => {
          const Component: any = dynamicComponentImports(
            childItems.flagComponentStyle
          );
          if (!Component) {
            console.warn(
              `No component found for flagComponentStyle: ${childItems.internalName}`
            );
            return null;
          }
          return (
            <Component
              key={index}
              heading={childItems?.cardSectionTitle}
              subheading={childItems?.shortDescription}
              internalName={childItems?.internalName}
              callAction={childItems?.callToAction}
              routename="/advice"
              contentModelName={"pageTemplateHeroLandingPageCollection"}
            />
          );
        }
      )}
    </div>
  );
};

export default page;
