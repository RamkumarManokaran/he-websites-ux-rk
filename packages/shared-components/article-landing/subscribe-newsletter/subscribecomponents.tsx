"use server";
import Subscribe from "./subscribe";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import React from "react";
import { NewsletterQuery } from "@packages/lib/graphQL/article-landing";

const Subscribecomponents = async ({ iscontentPreview }: any) => {
  const query = NewsletterQuery(iscontentPreview);
  const jsondata = await graphQlFetchFunction(query, iscontentPreview);

  return (
    <>
      <Subscribe
        data={jsondata?.data?.newsLetterData?.items[0]}
        isPreviewTrue={iscontentPreview}
      />
    </>
  );
};

export default Subscribecomponents;
