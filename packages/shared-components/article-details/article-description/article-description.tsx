"use client"; // This marks the component as a Client Component

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import { formatDate, GA4DataLayerFn, getArticleDetailUrlParamValues } from "@packages/lib/utlils/helper-function";
import { DataLayerGA4AttrType } from "@packages/lib/types/datalayerGA";
import { usePathname } from "next/navigation";

const Articledescription = ({ propsdata, preview ,url}: any) => {
  const data = useContentfulLiveUpdates(propsdata);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [copylink, setCopylink] = useState(false);

  const modalPopToggle = () => {
    setCopylink(false)
    if (!modalOpen) {
      handleShareLinkClickGA("clicked", ""); // Trigger GA event when opening
    }
    setModalOpen((prevState) => !prevState); // Safely toggle state
  };

  const handleCopyLink = () => {
    const link = window.location.href; // Get the current page's URL
    navigator.clipboard
      .writeText(link)
      setCopylink(true)
  };
  // ==========================use effect for the handle click outside========================================================================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        console.dir("insinde the handleclickoutside the function");
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // ================================================================================================================================================

  const{category, subCategory, articleTitle} = getArticleDetailUrlParamValues();

  function handleShareLinkClickGA(interaction: string, socialName: string){
    const datalog: DataLayerGA4AttrType = {
      event: "ga_contentful_events",
      eventName: "social_media_share",
      data_label: socialName,
      data_label2: interaction,
      page_name: localStorage.getItem("gaPageName")?.toString(),
      article_category: category,
      clearing: "in_year",
    };
    GA4DataLayerFn(datalog);

  }
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [modalOpen]);
  return (
    <>
      {preview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: data?.sys?.id,
              fieldId: "title",
              targetSelector: "#article_title",
            },
            {
              entryId: data?.sys?.id,
              fieldId: "pageTitle",
              targetSelector: "#artilce-page-title",
            },
            {
              entryId: data?.sys?.id,
              fieldId: "shortDescription",
              targetSelector: "#artilce-page-description",
            },

            {
              entryId: data?.sys?.id,
              fieldId: "modifiedDate",
              targetSelector: "#artilce-page-modified-date",
            },
          ]}
        />
      )}

      <div className="flex flex-col gap-[8px]">
        <span className="x-small font-inter uppercase font-semibold tracking-[1px] text-blue-400">
        <Link id="article_title" className="uppercase hover:underline" href={`/${url}`}>
            {data?.articleType?.title}
          </Link>
        </span>
        <h1
          id="artilce-page-title"
          className="font-farro text-grey900"
        >
          {data?.pageTitle}
        </h1>
        <p
          id="artilce-page-description"
          className="text-para-lg max-w-[907px] font-medium w-full text-grey300 text-inter"
        >
          {data?.shortDescription}
        </p>
        {data?.modifiedDate && 
        <span
        id="artilce-page-modified-date"
        className="x-small text-grey300 text-inter"
        >
          {` Updated: ${formatDate(data?.modifiedDate) ?? ""}`}
        </span>
        }
        <button
          onClick={() => modalPopToggle()}
          className="btn btn-primary-outline px-[16px] py-[8px] flex gap-[6px] svg-hover-white w-fit"
        >
          <Image
            src="/static/assets/icons/share-blue.svg"
            width="20"
            height="20"
            alt="Share icon"
          />
          Share
        </button>
      </div>
      {modalOpen && (
        <>
          <div className="modal modal-container z-[99] flex  justify-center md:px-[0] px-[16px] items-center backdrop-shadow-black fixed top-0 right-0 left-0 bottom-0 bg-white">
            <div
              ref={containerRef}
              className="modal-box shadow-custom-6 w-full md:w-[512px] p-[24px] bg-white rounded-[8px] overflow-hidden relative"
            >
              <div
                onClick={() => setModalOpen(false)}
                className="modal_close absolute top-[16px] p-[4px] right-[16px] z-[1] cursor-pointer"
              >
                <Image
                  className="block"
                  src="/static/assets/icons/modal_close.svg"
                  width="12"
                  height="12"
                  alt="modal close"
                />
              </div>
              <div className="flex flex-col gap-[32px] items-center">
                <span className="font-inter font-semibold para-lg leading-[27px] text-black">
                  Share on
                </span>
                <div className="flex flex-wrap gap-[6px] justify-center">
                  <a
                  target="_blank" 
                  rel="noopener noreferrer"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    onClick={() => handleShareLinkClickGA("engaged", "facebook")}
                    className="md:min-w-[111.5px] min-w-[69px] flex flex-col gap-[9px] items-center text-blue-400 hover:text-grey300 hover:underline"
                  >
                    <Image
                      width="40"
                      height="40"
                      src="/static/assets/icons/facebook-blue.svg"
                      alt="Facebook"
                    />
                    <span className="small font-inter">Facebook</span>
                  </a>
                  <a
                  target="_blank" 
                  rel="noopener noreferrer"
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                    onClick={() => handleShareLinkClickGA("engaged", "twitter")}
                    className="md:min-w-[111.5px] min-w-[69px] flex flex-col gap-[9px] items-center text-blue-400 hover:text-grey300 hover:underline"
                  >
                    <Image
                      width="40"
                      height="40"
                      src="/static/assets/icons/twitter-blue.svg"
                      alt="twitter"
                    />
                    <span className="small font-inter">Twitter</span>
                  </a>
                  <a
                  target="_blank" 
                  rel="noopener noreferrer"
                    href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${data?.bannerImageCollection?.items[0]?.imgUpload?.url}&description=${data?.pageTitle}`}
                    onClick={() => handleShareLinkClickGA("engaged", "pinterest")}
                    className="md:min-w-[111.5px] min-w-[69px] flex flex-col gap-[9px] items-center text-blue-400 hover:text-grey300 hover:underline"
                  >
                    <Image
                      width="40"
                      height="40"
                      src="/static/assets/icons/pinterest.svg"
                      alt="pinterest"
                    />
                    <span className="small font-inter">Pinterest</span>
                  </a>
                  <button
                    onClick={() => {handleCopyLink(); handleShareLinkClickGA("engaged", "link_copied")}}
                    className="md:min-w-[111.5px] min-w-[69px] flex flex-col gap-[9px] items-center text-blue-400 hover:text-grey300 hover:underline"
                  >
                    <Image
                      width="40"
                      height="40"
                      src="/static/assets/icons/copy-link.svg"
                      alt="Copy link"
                    />
                    {copylink ?
                  <span className="small font-inter text-positive-default underline">Link copied</span>: <span className="small font-inter">Copy link</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Articledescription;
