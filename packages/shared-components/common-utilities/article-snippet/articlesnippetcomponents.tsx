"use server";
import React, { Suspense } from "react";
import TextToggleComponent from "./text-toggle-comp";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { ArticleTextSnippetQuery } from "@packages/lib/graphQL/article-landing";
import { homePageComponentQueryFormation } from "@packages/lib/graphQL/fetch-function";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import Articlesnippetskeleton from "@packages/shared-components/skeleton/articlesnippetskeleton";
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

  const data = (await graphQlFetchFunction(query, iscontentPreview))?.data
    ?.contentData?.items[0]?.bodyContentCollection?.items[0]
    ?.mediaCardsCollection?.items[0];
  console.log(data);
  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: data?.sys?.id,
              fieldId: "title",
              targetSelector: "#text_snippet_title",
            },
          ]}
        />
      )}
      <Suspense fallback={<Articlesnippetskeleton />}>
        <div className="articlesnippet-container">
          <div className="max-w-container mx-auto">
            <div className="articlesnippet-card-container flex flex-col lg:flex-row justify-between gap-[20px] px-[16px] md:px-[20px] xl:px-[0] py-[40px] md:py-[64px]">
              {data?.title && (
                <div className="h3 w-full lg:w-[289px]" id="text_snippet_title">
                  {data?.title}
                </div>
              )}
              <TextToggleComponent
                iscontentPreview={iscontentPreview}
                sysId={data?.sys?.id}
                text={data?.description}
                longtext={data?.longDescription?.json}
              />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Articlesnippetcomponents;
