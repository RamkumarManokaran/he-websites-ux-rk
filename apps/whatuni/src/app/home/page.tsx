"use server";
import dynamicComponentImports from "@packages/lib/dynamic-imports/imports";
import Heroslidercomponent from "@packages/shared-components/home/hero/heroslidercomponent";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { homePageQuery } from "@packages/lib/graphQL/graphql-query";
import {
  MultipleCardContainer,
  SliderBannerCollection,
} from "@packages/lib/types/interfaces";
import GoogleOneTap from "@packages/lib/utlils/GoogleOneTap";
import { Amplify } from "aws-amplify";
import awsconfig from "../../../configs/amplifyconfiguration";
import { PageViewLogging } from "@packages/lib/utlils/pageviewlogging";
Amplify.configure(awsconfig, { ssr: true });
const Page = async () => {
  const jsonData = await graphQlFetchFunction(homePageQuery);
  const componentList =
    jsonData?.data?.contentData?.items[0]?.bodyContentCollection?.items;
  const heroSliderData: SliderBannerCollection =
    jsonData?.data?.contentData?.items[0]?.sliderBannerCollection;

  return (
    <>
      {/* <GoogleOneTap /> */}
      <PageViewLogging gaData={{
        website: `${process.env.PROJECT}`,
        pageName: jsonData?.data?.contentData?.items[0]?.gaPageName,
      }}/>  
      <Heroslidercomponent data={heroSliderData} pageName={jsonData?.data?.contentData?.items[0]?.gaPageName}/>
      <div>
        {componentList.map(
          (childItems: MultipleCardContainer, index: number) => {
            const Component: any = dynamicComponentImports(
              childItems.flagComponentStyle
            );
            return (
              <div
                className={`${index === 0 || index % 2 === 0 ? "bg-grey-50" : "bg-white"}`}
                key={index}
              >
                <Component
                  heading={childItems?.cardSectionTitle}
                  subheading={childItems?.shortDescription}
                  internalName={childItems?.internalName}
                  callAction={childItems?.callToAction}
                  pageName={jsonData?.data?.contentData?.items[0]?.gaPageName}
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
