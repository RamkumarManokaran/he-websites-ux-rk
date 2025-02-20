import React from "react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const Subscribebtn = ({ btnAction, btnName, sysId, isContentPreview }: any) => {
  return (
    <>
      {isContentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: sysId,
              fieldId: "ctaLabel",
              targetSelector: "#newsletter_btn",
            },
          ]}
        />
      )}
      <button
        type="button"
        className="btn btn-primary flex items-center justify-center w-full min-w-[180px]  md:w-fit gap-[8px] p-[10px_20px] group-hover:bg-primary-500"
        id="newsletter_btn"
        onClick={btnAction}
      >
        {btnName}
      </button>
    </>
  );
};

export default Subscribebtn;
