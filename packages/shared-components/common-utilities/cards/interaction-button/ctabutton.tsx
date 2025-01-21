import React from "react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const Ctabutton = ({ index, cta, sysId, iscontentPreview }: any) => {
  console.log(cta);
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
      <a
        href={cta?.primaryCtaUrl || "/"}
        id={`eligibility_cta_btn${index}`}
        className="btn btn-primary flex items-center justify-center min-w-[117px] w-fit gap-[8px] p-[10px_20px] group-hover:bg-primary-500"
      >
        {cta?.primaryCtaLabel}
      </a>
    </>
  );
};

export default Ctabutton;
