"use client";
import React from "react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
const TextToggleComponent = ({ text, iscontentPreview, sysId }: any) => {
  //const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // const toggleReadMore = () => {
  //   setIsExpanded(!isExpanded);
  // };
  //const truncatedText = text?.slice(0, 550);
  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: sysId,
              fieldId: "longDescription",
              targetSelector: "#text_snippet_description",
            },
          ]}
        />
      )}
      <div className="flex flex-col gap-[8px] w-full lg:w-[calc(100%_-_289px)]">
        <div className="flex flex-col gap-[24px]">
          <p className="para font-normal" id="text_snippet_description"></p>
          {documentToReactComponents(text)}
        </div>
        <div
          className="small font-semibold text-primary-400 hover:underline cursor-pointer"
          // onClick={toggleReadMore}
        >
          +Read More
        </div>
      </div>
    </>
  );
};

export default TextToggleComponent;
