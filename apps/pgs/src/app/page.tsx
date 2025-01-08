"use server";
import dynamicComponentImports from "@packages/lib/dynamic-imports/imports";
import Heroslidercomponent from "@packages/shared-components/home/hero/heroslidercomponent";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { homePageQuery } from "@packages/lib/graphQL/graphql-query";

import {
  MultipleCardContainer,
  SliderBannerCollection,
} from "@packages/lib/types/interfaces";
import PageViewLogging from "@packages/lib/utlils/pageviewlogging";
const Page = async () => {
  const jsonData = await graphQlFetchFunction(homePageQuery);
  const componentList =
    jsonData?.data?.contentData?.items[0]?.bodyContentCollection?.items;
  const heroSliderData: SliderBannerCollection =
    jsonData?.data?.contentData?.items[0]?.sliderBannerCollection;

  return (
    <>
      <PageViewLogging
        gaData={{
          website: `${process.env.PROJECT}`,
          pageName: "homepage",
        }}
      />
      <Heroslidercomponent data={heroSliderData} />
      <div>
        {componentList?.map(
          (childItems: MultipleCardContainer, index: number) => {
            const Component: any = dynamicComponentImports(
              childItems.flagComponentStyle
            );
            return (
              <div
                className={`${index === 0 || index % 2 === 0 ? "bg-grey-50" : ""}`}
                key={index}
              >
                <Component
                  key={index}
                  heading={childItems?.cardSectionTitle}
                  subheading={childItems?.shortDescription}
                  internalName={childItems?.internalName}
                  contentModelName={"homepageCollection"}
                  routename={"/"}
                />
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default Page;
