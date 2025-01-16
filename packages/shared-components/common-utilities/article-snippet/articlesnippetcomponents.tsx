"use server";
import React from "react";
import TextToggleComponent from "./text-toggle-comp";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { ArticleTextSnippetQuery } from "@packages/lib/graphQL/article-landing";
import { homePageComponentQueryFormation } from "@packages/lib/graphQL/fetch-function";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const Articlesnippetcomponents = async ({
  internalName,
  routename,
  contentModelName,
  iscontentPreview,
}: any) => {
  const query = homePageComponentQueryFormation(
    internalName,
    ArticleTextSnippetQuery,
    routename,
    contentModelName,
    iscontentPreview
  );
  const data = (await graphQlFetchFunction(query))?.data?.contentData?.items[0]
    ?.bodyContentCollection?.items[0]?.mediaCardsCollection?.items[0];
  return (
    <>
      {/* {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: data?.sys?.id,
              fieldId: "title",
              targetSelector: "#title-element",
            },
          ]}
        />
      )} */}
      <div className="articlesnippet-container bg-white">
        <div className="max-w-container mx-auto">
          <div className="articlesnippet-card-container flex flex-col lg:flex-row justify-between gap-[20px] px-[16px] md:px-[20px] xl:px-[0] py-[40px] md:py-[64px]">
            {data?.title && (
              <div className="h5" id="title-element">
                {data?.title}
              </div>
            )}
            <TextToggleComponent
              iscontentPreview={iscontentPreview}
              sysId={data?.sys?.id}
              text={data?.longDescription?.json?.content[0]?.content[0]?.value}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Articlesnippetcomponents;
