"use server";
import dynamicComponentImports from "@packages/lib/dynamic-imports/imports";
import Heroslidercomponent from "@packages/shared-components/common-utilities/Banners/hero/heroslidercomponent";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { homePageQuery } from "@packages/lib/graphQL/graphql-query";
import {
  MultipleCardContainer,
  SliderBannerCollection,
} from "@packages/lib/types/interfaces";
import Subscribecomponents from "@packages/shared-components/common-utilities/newsletter-and-subscription/subscribe-newsletter/subscribecomponents";
import ContentfulPreviewProvider from "@packages/lib/contentful-preview/ContentfulLivePreviewProvider";
import { Amplify } from "aws-amplify";
import awsconfig from "../../../../../packages/configs/amplifyconfiguration";
const PageViewLogging: any = dynamicComponentImports("pageviewlog");
Amplify.configure(awsconfig, { ssr: true });
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
          pageNameLocal={jsonData?.data?.contentData?.items[0]?.gaPageName}
          gaData={{
            website_name: `${process.env.PROJECT}`,
            page_name: jsonData?.data?.contentData?.items[0]?.gaPageName,
          }}
        />
        <Heroslidercomponent
          data={heroSliderData}
          pageName={jsonData?.data?.contentData?.items[0]?.gaPageName}
        />
        <div>
          {componentList?.map(
            (childItems: MultipleCardContainer, index: number) => {
              const Component: any = dynamicComponentImports(
                childItems?.flagComponentStyle
              );
              return (
                <div
                  key={index}
                  className={`${index === 0 || index % 2 === 0 ? "bg-grey-50" : "bg-white"}`}
                >
                  <Component
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
