import React from "react";
import Image from "next/image";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const Articleimage = ({ propsdata, key, preview }: any) => {
  return (
    <>
      {preview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: propsdata?.sys?.id,
              fieldId: "imgUpload",
              targetSelector: "#article_title-imgUpload-inrichtext",
            },
          ]}
        />
      )}
      <div>
        {propsdata?.imgUpload?.url && (
          <Image
            id="article_title-imgUpload-inrichtext"
            src={propsdata?.imgUpload?.url}
            width="804"
            height="452"
            className="block w-full h-auto"
            alt={propsdata?.imgAltText ?? "Article_image"}
          />
        )}
      </div>
    </>
  );
};

export default Articleimage;
