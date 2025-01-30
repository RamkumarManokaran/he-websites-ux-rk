"use client";
import React, { useState } from "react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
const TextToggleComponent = ({
  text,
  iscontentPreview,
  sysId,
  longtext,
}: any) => {
  const readMore = text?.length > 362 ? true : false;
  const [screenrender, setScreenrender] = useState(
    readMore ? "text" : "longtext"
  );
  const toggleReadMore = () => {
    if (screenrender === "text") {
      setScreenrender("longtext");
    } else {
      setScreenrender("text");
    }
  };
  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: sysId,
              fieldId: "description",
              targetSelector: "#text_snippet_description",
            },
          ]}
        />
      )}
      <div className="flex flex-col gap-[8px] w-full lg:w-[calc(100%_-_309px)]">
        <div className="flex flex-col items-start gap-[16px] rtf-innerstyle">
          {screenrender === "text" ? (
            <p
              className={`${readMore && "line-clamp-3"} para font-normal`}
              id="text_snippet_description"
            >
              {text}
            </p>
          ) : (
            <>{documentToReactComponents(longtext)}</>
          )}
        </div>
        {readMore && (
          <div
            className="small font-semibold text-primary-400 hover:underline cursor-pointer"
            onClick={toggleReadMore}
          >
            {screenrender === "text" ? "+ Read More" : "- Read less"}
          </div>
        )}
      </div>
    </>
  );
};

export default TextToggleComponent;
