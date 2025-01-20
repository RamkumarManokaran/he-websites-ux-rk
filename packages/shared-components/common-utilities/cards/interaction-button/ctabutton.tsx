import React from "react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const Ctabutton = ({ index, cta, sysId, iscontentPreview }: any) => {
  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: sysId,
              fieldId: "cta",
              targetSelector: `#eligibility_cta_btn${index}`,
            },
          ]}
        />
      )}
      <button
        type="button"
        id={`eligibility_cta_btn${index}`}
        className="btn btn-primary flex items-center justify-center min-w-[117px] w-fit gap-[8px] p-[10px_20px] group-hover:bg-primary-500"
      >
        {cta?.primaryCtaLabel}
      </button>
    </>
  );
};

export default Ctabutton;
