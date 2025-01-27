"use client";
import React, { useState } from "react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const TextToggleComponent = ({ text, iscontentPreview, sysId }: any) => {
  console.log(sysId, text);
  const firstPart = text?.slice(0, 362);
  const secondPart = text?.slice(362);
  const [screenrender, setScreenrender] = useState(firstPart);
  const toggleReadMore = () => {
    if (screenrender != text) {
      setScreenrender(text);
    } else {
      setScreenrender(firstPart);
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
          <p className="para font-normal" id="text_snippet_description">
            {screenrender}
          </p>
          {secondPart?.length > 0 && <p className="hidden">{secondPart}</p>}
        </div>
        {secondPart?.length > 0 && (
          <div
            className="small font-semibold text-primary-400 hover:underline cursor-pointer"
            onClick={toggleReadMore}
          >
            {screenrender === firstPart ? "+ Read More" : "- Read less"}
          </div>
        )}
      </div>
    </>
  );
};

export default TextToggleComponent;
