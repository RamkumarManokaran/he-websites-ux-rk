"use server";
import React from "react";
import { MultipleCardContainer } from "@packages/lib/types/interfaces";
import ContentfulPreviewProvider from "@packages/lib/contentful-preview/ContentfulLivePreviewProvider";
import dynamicComponentImports from "@packages/lib/dynamic-imports/imports";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import HeroMiniBanner from "@packages/shared-components/common-utilities/mini-banner/mini-banner";
import Subscribecomponents from "@packages/shared-components/article-landing/subscribe-newsletter/subscribecomponents";
import { ThemeLandingPageQuery } from "@packages/lib/graphQL/theme-landing";
import { notFound } from "next/navigation";
import PageViewLogging from "@packages/lib/utlils/pageviewlogging";
const page = async ({ searchParams, params }: any) => {
  const Params = await params;
  const slugurl = `/${Params.money}/${Params.budgeting}`;
  const searchparams = await searchParams;
  const iscontentPreview =
    searchparams?.preview === "MY_SECRET_TOKEN" ? true : false;
  const jsondata = await graphQlFetchFunction(
    ThemeLandingPageQuery(iscontentPreview, slugurl),
    iscontentPreview
  );
  console.log(ThemeLandingPageQuery(iscontentPreview, slugurl));
  const componentList =
    jsondata?.data?.contentData?.items[0]?.bodyContentCollection?.items;

  if (jsondata?.data?.contentData?.items.length < 1) {
    notFound();
  }
  const bannerData = jsondata?.data?.contentData?.items[0]?.bannerImage;
  const splitParam = slugurl ? slugurl.split('/') : [];
  console.log("theme page", jsondata);
  console.log("query", ThemeLandingPageQuery(iscontentPreview, slugurl));
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
                articleKeyArray={childItems?.mediaCardsCollection?.items}
                routename={slugurl}
                contentModelName={"pageTemplateThemedLandingPageCollection"}
                iscontentPreview={iscontentPreview}
                category={splitParam?.[1]}
                subCategory={splitParam?.[2]}
              />
            );
          }
        )}
      </div>
      <PageViewLogging
          gaData={{
            website_name: `${process.env.PROJECT}`,
            page_name: jsondata?.data?.contentData?.items[0]?.gaPageName,
          }}
          csData={{pageName:jsondata?.data?.contentData?.items[0]?.gaPageName,eventType:"PageViewed"}}
        />
      <Subscribecomponents iscontentPreview={iscontentPreview}  category={splitParam?.[1]}
                subCategory={splitParam?.[2]}/>
    </ContentfulPreviewProvider>
  );
};

export default page;
