"use server";
import React from "react";
import ContentfulPreviewProvider from "@packages/lib/contentful-preview/ContentfulLivePreviewProvider";
import { HeroLandingPageQuery } from "@packages/lib/graphQL/article-landing";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { MultipleCardContainer } from "@packages/lib/types/interfaces";
import dynamicComponentImports from "@packages/lib/dynamic-imports/imports";
import HeroMiniBanner from "@packages/shared-components/common-utilities/Banners/mini-banner/mini-banner";
import Subscribecomponents from "@packages/shared-components/common-utilities/newsletter-and-subscription/subscribe-newsletter/subscribecomponents";
import { notFound } from "next/navigation";
import PageViewLogging from "@packages/lib/utlils/pageviewlogging";
const page = async ({ searchParams, params }: any) => {
  const Params = await params;

  const slugurl = `/${Params.hero}/`;
  const searchparams = await searchParams;
  const iscontentPreview =
    searchparams?.preview === "MY_SECRET_TOKEN" ? true : false;
  const jsondata = await graphQlFetchFunction(
    HeroLandingPageQuery(iscontentPreview, slugurl),
    iscontentPreview
  );
  if (jsondata?.data?.contentData?.items.length < 1) {
    notFound();
  }
  const componentList =
    jsondata?.data?.contentData?.items[0]?.bodyContentCollection?.items;
  const bannerData = jsondata?.data?.contentData?.items[0]?.bannerImage;
  const splitParam = slugurl ? slugurl.split("/") : [];
  return (
    <ContentfulPreviewProvider
      locale="en-GB"
      enableInspectorMode={iscontentPreview}
      enableLiveUpdates={iscontentPreview}
      debugMode={iscontentPreview}
    >
      <div className="article_landing">
        {bannerData && (
          <HeroMiniBanner
            data={bannerData}
            iscontentPreview={iscontentPreview}
          />
        )}
        {componentList?.map(
          (childItems: MultipleCardContainer, index: number) => {
            const Component: any = dynamicComponentImports(
              childItems?.flagComponentStyle
            );
            if (!Component) {
              console.warn(
                `No component found for flagComponentStyle: ${childItems?.internalName}`
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
                parentSysId={childItems?.sys?.id}
                routename={slugurl}
                articleKeyArray={childItems?.mediaCardsCollection?.items}
                contentModelName={"pageTemplateHeroLandingPageCollection"}
                iscontentPreview={iscontentPreview}
                pageName={jsondata?.data?.contentData?.items[0]?.gaPageName}
                category={splitParam?.[1]}
              />
            );
          }
        )}
      </div>
      <PageViewLogging
        pageNameLocal={jsondata?.data?.contentData?.items[0]?.gaPageName}
        gaData={{
          website_name: `${process.env.PROJECT}`,
          page_name: jsondata?.data?.contentData?.items[0]?.gaPageName,
        }}
        csData={{
          pageName: jsondata?.data?.contentData?.items[0]?.gaPageName,
          eventType: "PageViewed",
        }}
      />
      <Subscribecomponents
        iscontentPreview={iscontentPreview}
        category={splitParam?.[1]}
        subCategory={splitParam?.[2]}
      />
    </ContentfulPreviewProvider>
  );
};

export default page;
