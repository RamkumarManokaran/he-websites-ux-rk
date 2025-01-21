"use server";
import React from "react";
import Advicecomponent from "@packages/shared-components/home/advice/advicecomponents";
import ContentfulPreviewProvider from "@packages/lib/contentful-preview/ContentfulLivePreviewProvider";
import Articlesnippetcomponents from "@packages/shared-components/common-utilities/article-snippet/articlesnippetcomponents";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { ArticleQuery } from "@packages/lib/graphQL/theme-landing";
import HeroMiniBanner from "@packages/shared-components/common-utilities/mini-banner/mini-banner";
import Subscribecomponents from "@packages/shared-components/article-landing/subscribe-newsletter/subscribecomponents";
import { ThemeLandingPageQuery } from "@packages/lib/graphQL/theme-landing";
import { notFound } from "next/navigation";
const page = async ({ searchParams, params }: any) => {
  const Params = await params;
  const slugurl = `/${Params.slug1}/${Params.slug2}/${Params.hero}/${Params.theme}`;
  const searchparams = await searchParams;
  const iscontentPreview =
    searchparams?.preview === "MY_SECRET_TOKEN" ? true : false;
  const jsondata = await graphQlFetchFunction(
    ThemeLandingPageQuery(iscontentPreview, slugurl),
    iscontentPreview
  );
  if (jsondata?.data?.contentData?.items.length < 1) {
    notFound();
  }
  const textSnippet =
    jsondata?.data?.contentData?.items[0]?.bodyContentCollection?.items[0];
  const bannerData = jsondata?.data?.contentData?.items[0]?.bannerImage;
  const articleLoop = (
    await graphQlFetchFunction(ArticleQuery(iscontentPreview, slugurl))
  )?.data?.contentData?.items[0]?.bodyContentCollection?.items;
  console.log("theme-lannding-page-slug", slugurl);
  console.log(
    "theme-landing-page-query",
    ThemeLandingPageQuery(iscontentPreview, slugurl)
  );
  console.log("theme-json-response", jsondata);

  function customStringify(obj: any): string {
    if (Array.isArray(obj)) {
      return `[${obj.map(customStringify).join(", ")}]`;
    } else if (typeof obj === "object" && obj !== null) {
      return `{ ${Object.entries(obj)
        .map(([key, value]) => `${key}: ${customStringify(value)}`)
        .join(", ")} }`;
    } else if (typeof obj === "string") {
      return `"${obj}"`;
    } else {
      return String(obj);
    }
  }
  const dataArray: any = [];
  const fetchAllData = () => {
    const promises = articleLoop?.map((elements: any) => {
      const newdt: any = [];
      elements?.mediaCardsCollection?.items?.forEach((item: any) => {
        const obj = {
          metaTagTopics: { title: item?.title },
        };
        newdt.push(obj);
      });
      const stringifiedArray = customStringify(newdt);
      return stringifiedArray;
    });
    const results = promises;
    dataArray.push(...results);
    return dataArray;
  };

  fetchAllData();
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
        {textSnippet && (
          <Articlesnippetcomponents
            heading={textSnippet?.cardSectionTitle}
            subheading={textSnippet?.shortDescription}
            internalName={textSnippet?.internalName}
            callAction={textSnippet?.callToAction}
            parentSysId={textSnippet?.sys?.id}
            routename={slugurl}
            contentModelName={"pageTemplateThemedLandingPageCollection"}
            iscontentPreview={iscontentPreview}
          />
        )}

        {dataArray?.length > 0 && (
          <>
            {dataArray.map((items: any, index: number) => {
              if (items.length > 0) {
                return (
                  <Advicecomponent
                    key={index}
                    iscontentPreview={iscontentPreview}
                    articleKeyString={items}
                    heading={articleLoop[index]?.cardSectionTitle}
                    subheading={articleLoop[index]?.shortDescription}
                  />
                );
              }
            })}
          </>
        )}
        <Subscribecomponents iscontentPreview={iscontentPreview} />
      </div>
    </ContentfulPreviewProvider>
  );
};

export default page;
