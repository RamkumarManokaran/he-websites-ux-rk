"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const Skiplink = ({ propsdata, preview }: any) => {
  const data = useContentfulLiveUpdates(propsdata);
  const [modelOpen, setModalOpen] = useState(false);
  const toggleFunc = () => {
    setModalOpen(!modelOpen);
  };
  const [currskiplink, setCurrskiplink] = useState("");

  // const skiplinkLabel = [
  //   "Heading skip link",
  //   "Heading skip link",
  //   "Heading skip link",
  //   "Heading skip link",
  // ];

  return (
    <>
      {preview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: data?.skipLinks?.sys?.id,
              fieldId: "skipLinkTitle",
              targetSelector: "#article-skip-link-title",
            },
          ]}
        />
      )}
      {preview &&
        data?.skiplinks?.anchorLinksCollection?.items?.map(
          (item: any, index: any) => {
            return (
              <div key={index}>
                <ContentfulInspectorManager
                  fields={[
                    {
                      entryId: item?.sys?.id,
                      fieldId: "urlLabel",
                      targetSelector: `#article-skip-link-urlLabel${index}`,
                    },
                    {
                      entryId: item?.sys?.id,
                      fieldId: "moreLinkUrl",
                      targetSelector: `#article-skip-link-moreLinkUrl${index}`,
                    },
                  ]}
                />
              </div>
            );
          }
        )}
      <div className="py-[16px] border-b border-grey-200 lg:hidden mb-[40px]">
        <div
          className={`bg-blue-400 rounded-[4px] overflow-hidden border-b relative border-grey-200 skiplinkoption ${modelOpen ? "active" : ""}`}
        >
          <div className="">
            <div
              onClick={toggleFunc}
              className="bg-blue-400 cursor-pointer flex justify-between p-[18px]"
            >
              <span
                id="article-skip-link-title"
                className="text-white small font-inter font-semibold"
              >
                {data?.skipLinks?.skiplinkkTitle}
              </span>
              <div className="burger-menu flex flex-col justify-center gap-[4px]">
                <span className="bg-white w-[18px] h-[2px] rounded-[4px] flex"></span>
                <span className="bg-white w-[18px] h-[2px] rounded-[4px] flex"></span>
                <span className="bg-white w-[18px] h-[2px] rounded-[4px] flex"></span>
              </div>
            </div>

            {modelOpen && (
              <ul className="p-[16px]">
                {data?.skipLinks?.anchorLinksCollection?.items?.map(
                  (items: any, index: any) => (
                    <li
                      id={`article-skip-link-urlLabel${index}`}
                      className="border-s-[2px]  py-[10px] px-[16px] text-white border-white small font-inter font-normal"
                      key={index}
                    >
                      <Link
                        id={`article-skip-link-moreLinkUrl${index}`}
                        target={
                          items?.moreLinkTarget?.toLowerCase() === "same tab"
                            ? "_self"
                            : "_blank"
                        }
                        href={items?.moreLinkUrl}
                      >
                        {items?.urlLabel}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="min-w-[289px] hidden lg:flex flex-col relative max-w-[100%]">
        <div className="sticky lg:flex flex-col lg:gap-[8px] top-[50px]">
          <h2
            id="article-skip-link-title"
            className="text-black para font-semibold font-inter"
          >
            {data?.skipLinks?.skiplinkkTitle}
          </h2>
          <ul>
            {data?.skipLinks?.anchorLinksCollection?.items?.map(
              (items: any, index: any) => (
                <li
                  id={`article-skip-link-urlLabel${index}`}
                  className={`border-s-[4px]  py-[10px] px-[16px] small font-inter font-normal hover:text-grey300 hover:underline hover:border-blue-400 ${
                    items?.moreLinkUrl == currskiplink
                      ? "border-blue-400 text-blue-400"
                      : "border-grey-300 text-grey300"
                  }`}
                  key={`${index}`}
                >
                  <Link
                    onClick={(e) => {
                      setCurrskiplink(items?.moreLinkUrl);
                    }}
                    id={`article-skip-link-moreLinkUrl${index}`}
                    target={
                      items?.moreLinkTarget?.toLowerCase() === "same tab"
                        ? "_self"
                        : "_blank"
                    }
                    href={items?.moreLinkUrl}
                  >
                    {items?.urlLabel}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Skiplink;
