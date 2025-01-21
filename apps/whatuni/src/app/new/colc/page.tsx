"use server";
import React from "react";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { ColcLandingPageQuery } from "@packages/lib/graphQL/cocl-landing";
import { MultipleCardContainer } from "@packages/lib/types/interfaces";
import dynamicComponentImports from "@packages/lib/dynamic-imports/imports";
const page = async () => {
  const componentList = (await graphQlFetchFunction(ColcLandingPageQuery))?.data
    ?.contentData?.items[0]?.bodyContentCollection.items;
  return (
    <>
      {componentList?.map(
        (childItems: MultipleCardContainer, index: number) => {
          const Component: any = dynamicComponentImports(
            childItems?.flagComponentStyle
          );
          if (!Component) {
            console.warn(
              `No component found for flagComponentStyle: ${childItems.internalName}`
            );
            return null;
          }
          return (
            <Component
              key={index + 1}
              heading={childItems?.cardSectionTitle}
              subheading={childItems?.shortDescription}
              internalName={childItems?.internalName}
              callAction={childItems?.callToAction}
              routename="/student-finance"
              contentModelName={"pageTemplateLandingPageCollection"}
            />
          );
        }
      )}
    </>
  );
};

export default page;
