"use server";
import dynamicComponentImports from "@packages/lib/dynamic-imports/imports";
import Heroslidercomponent from "@packages/shared-components/home/hero/heroslidercomponent";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { homePageQuery } from "@packages/lib/graphQL/graphql-query";
import dynamic from "next/dynamic";
const PageViewLogging = dynamic(
  () => import("@packages/lib/utlils/pageviewlogging")
);
import {
  MultipleCardContainer,
  SliderBannerCollection,
} from "@packages/lib/types/interfaces";
import ContentfulPreviewProvider from "@packages/lib/contentful-preview/ContentfulLivePreviewProvider";
import Subscribecomponents from "@packages/shared-components/article-landing/subscribe-newsletter/subscribecomponents";
const Page = async ({ searchParams }: any) => {
  const jsonData = await graphQlFetchFunction(homePageQuery);
  const componentList =
    jsonData?.data?.contentData?.items[0]?.bodyContentCollection?.items;
  const heroSliderData: SliderBannerCollection =
    jsonData?.data?.contentData?.items[0]?.sliderBannerCollection;
  const searchparams = await searchParams;
  const iscontentPreview =
    searchparams?.preview === "MY_SECRET_TOKEN" ? true : false;
  return (
    <>
      <ContentfulPreviewProvider
        locale="en-GB"
        enableInspectorMode={iscontentPreview}
        enableLiveUpdates={iscontentPreview}
        debugMode={iscontentPreview}
      >
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
                childItems?.flagComponentStyle
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
                    callAction={childItems?.callToAction}
                    pageName={jsonData?.data?.contentData?.items[0]?.gaPageName}
                    routename={"/"}
                    contentModelName={"homepageCollection"}
                  />
                </div>
              );
            }
          )}
        </div>
        <Subscribecomponents iscontentPreview={false} />
      </ContentfulPreviewProvider>
    </>
  );
};

export default Page;
