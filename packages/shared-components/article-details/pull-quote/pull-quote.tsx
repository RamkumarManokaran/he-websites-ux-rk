"use client";
import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";

const Pullquote = ({ propsdata, key, preview }: any) => {
  const data = useContentfulLiveUpdates(propsdata);
  return (
    <>
      {preview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: data?.sys?.id,
              fieldId: "pullQuoteAuthor",
              targetSelector: "#article-details-pullQuoteAuthor",
            },
            {
              entryId: data?.sys?.id,
              fieldId: "pullQuoteRole",
              targetSelector: "#artilce-page-title-pullQuoteRole",
            },
            {
              entryId: data?.sys?.id,
              fieldId: "pullQuote",
              targetSelector: "#artilce-page-pullQuote-isrichtext",
            },

            {
              entryId: data?.sys?.id,
              fieldId: "modifiedDate",
              targetSelector: "#artilce-page-modified-date",
            },
          ]}
        />
      )}
      <div className="border-x-8 border-blue-200 p-[16px] bg-blue-50 text-grey300 flex flex-col gap-[8px]">
        <q
          id="artilce-page-pullQuote-isrichtext"
          className="pull-quotes text-heading6 font-farro  font-noraml"
        >
          {data?.pullQuote?.json &&
            documentToReactComponents(data?.pullQuote.json)}
        </q>

        <div className="flex flex-col gap-[4px]">
          <span
            id="article-details-pullQuoteAuthor"
            className="x-small font-semibold font-inter "
          >
            {data?.pullQuoteAuthor}
          </span>
          <span
            id="artilce-page-title-pullQuoteRole"
            className="x-small font-normal font-inter"
          >
            {data?.pullQuoteRole}
          </span>
        </div>
      </div>
    </>
  );
};

export default Pullquote;
