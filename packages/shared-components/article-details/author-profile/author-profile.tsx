import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const Authorprofile = ({ propsdata, preview }: any) => {
  console.dir(propsdata?.author, "form the author profile");
  return (
    <>
      {preview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: propsdata?.author?.sys?.id,
              fieldId: "firstName",
              targetSelector: "#Author-Name",
            },
            {
              entryId: propsdata?.author?.sys?.id,
              fieldId: "middleName",
              targetSelector: "#Author-Name",
            },
            {
              entryId: propsdata?.author?.sys?.id,
              fieldId: "lastName",
              targetSelector: "#Author-Name",
            },

            {
              entryId: propsdata?.author?.sys?.id,
              fieldId: "audienceGroup",
              targetSelector: "#audienceGroup",
            },
            {
              entryId: propsdata?.author?.image?.sys?.id,
              fieldId: "imgUpload",
              targetSelector: "#imgUpload",
            },
            {
              entryId: propsdata?.bannerImageCollection?.items[0]?.sys?.id,
              fieldId: "imgUpload",
              targetSelector: "#imgUpload",
            },
          ]}
        />
      )}
      <div className="flex flex-col lg:flex-row lg:gap-[20px]">
        <div className="border-t-[1px] lg:border-y-[1px] border-grey-200 py-[16px] min-w-[289px] max-w-[100%]">
          <div className="flex gap-[16px]">
            {propsdata?.author?.image?.imgUpload?.url && (
              <Image
                id="imgUpload"
                className="w-[40px] h-[40px] rounded-[30px] object-cover"
                src={propsdata?.author?.image?.imgUpload?.url}
                width="40"
                height="40"
                alt={propsdata?.author?.image?.imgAltText ?? "profile-image"}
              />
            )}
            <div className="flex flex-col">
              <span  id="Author-Name"  className="text-blue-400 small font-medium">
                {`${propsdata?.author?.firstName ?? ""}${propsdata?.author?.middleName ?? ""}${propsdata?.author?.lastName ?? ""}`}
              </span>
              <span
                id="audienceGroup"
                className="text-grey300 small font-normal"
              >
                {propsdata?.author?.audienceGroup}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          {propsdata?.bannerImageCollection?.items[0]?.imgUpload?.url && (
            <Image
              id="imgUpload"
              priority={true}
              src={propsdata?.bannerImageCollection?.items[0]?.imgUpload?.url}
              width="907"
              height="511"
              className="block w-full h-auto"
              alt={
                propsdata?.bannerImageCollection?.items[0]?.imgAltText ??
                "Article_image"
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Authorprofile;
