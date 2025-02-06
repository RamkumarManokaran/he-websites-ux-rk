"use server";
import Subscribe from "./subscribe";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import React from "react";
import { NewsletterQuery } from "@packages/lib/graphQL/article-landing";

const Subscribecomponents = async ({
  iscontentPreview,
  category,
  subCategory,
}: any) => {
  const query = NewsletterQuery(
    iscontentPreview,
    "Newsletter subscription - Whatuni"
  );
  const jsondata = (await graphQlFetchFunction(query, iscontentPreview))?.data
    ?.newsLetterData?.items[0];
  return (
    <>
      {jsondata && (
        <Subscribe
          data={jsondata}
          isPreviewTrue={iscontentPreview}
          category={category}
          subCategory={subCategory}
        />
      )}
    </>
  );
};

export default Subscribecomponents;
