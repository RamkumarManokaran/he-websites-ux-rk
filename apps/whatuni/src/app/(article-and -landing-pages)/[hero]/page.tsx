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
import Breadcrumblayoutcomponent from "@packages/shared-components/article-details/breadcrumb-layout/breadcrumblayoutcomponent";
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
  const customLabels: any = ["Money"];
  const componentList =
    jsondata?.data?.contentData?.items[0]?.bodyContentCollection?.items;
  const bannerData = jsondata?.data?.contentData?.items[0]?.bannerImage;
  const splitParam = slugurl ? slugurl.split("/") : [];
  function generateBreadcrumbData(currentPath: any) {
    const sanitizedPath = currentPath.endsWith("/")
      ? currentPath.slice(0, -1)
      : currentPath;
    const pathSegments = sanitizedPath
      .split("/")
      .filter((segment: any) => segment);
    // Construct breadcrumb data
    const breadcrumbData = pathSegments.map((segment: any, index: any) => {
      const url =
        index === pathSegments.length - 1
          ? "" // No URL for the last breadcrumb
          : "/" + pathSegments.slice(0, index + 1).join("/"); // Build URL for each segment

      return {
        url,
        label:
          customLabels[index] ||
          segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char: any) => char.toUpperCase()),
      };
    });
    breadcrumbData.unshift({
      url: "/",
      label: "Home",
    });

    return breadcrumbData;
  }
  const breadcrumbData = generateBreadcrumbData(slugurl);
  console.log("json-data", jsondata);
  console.log("component list", componentList);
  return (
    <ContentfulPreviewProvider
      locale="en-GB"
      enableInspectorMode={iscontentPreview}
      enableLiveUpdates={iscontentPreview}
      debugMode={iscontentPreview}
    >
      <div className="article_landing">
        <section className="px-[16px] md:px-[20px] lg:px-[0] py-[24px]">
          <div className="max-w-container mx-auto">
            <Breadcrumblayoutcomponent propsdata={breadcrumbData} />
          </div>
        </section>
        {bannerData && (
          <HeroMiniBanner
            data={bannerData}
            iscontentPreview={iscontentPreview}
            contentModelName={"pageTemplateThemedLandingPageCollection"}
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
              <div
                className={`${index === 0 || index % 2 === 0 ? "bg-grey-50" : "bg-white"}`}
                key={index}
              >
                <Component
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
              </div>
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
