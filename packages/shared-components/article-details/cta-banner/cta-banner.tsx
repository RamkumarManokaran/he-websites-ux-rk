import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import { DataLayerGA4AttrType } from "@packages/lib/types/datalayerGA";
import {
  currentAuthenticatedUser,
  GA4DataLayerFn,
} from "@packages/lib/utlils/helper-function";
import ClickTrackingWrapper from "@packages/lib/utlils/clicktrackerwrapper";

const Ctabanner = ({ key, propsdata, preview, urlParams }: any) => {
  return (
    <div className="pb-[20]">
      {preview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: propsdata?.sys?.id,
              fieldId: "title",
              targetSelector: "#cta-title",
            },
            {
              entryId: propsdata?.sys?.id,
              fieldId: "backgroundColor",
              targetSelector: "#article-backgroundColor",
            },
            {
              entryId: propsdata?.cta?.sys?.id,
              fieldId: "primaryCtaLabel",
              targetSelector: "#article-primaryCtaLabel-detail",
            },

            {
              entryId: propsdata?.image?.sys?.id,
              fieldId: "imgUpload",
              targetSelector: "#article-details-imgUpload",
            },

            {
              entryId: propsdata?.sys?.id,
              fieldId: "json",
              targetSelector: "#article-deatils-json",
            },
          ]}
        />
      )}

      <div
        id="article-backgroundColor"
        className={`${propsdata?.backgroundColor} p-[16px] md:py-[0] gap-[20px] md:gap-[0]  md:px-[20px] rounded-[8px] flex md:flex-row flex-col-reverse justify-between items-end !m-0`}
      >
        <div className="flex flex-col gap-[16px] py-[0] md:py-[24px] !m-0">
          <div className="text-grey300 flex flex-col gap-[4px]">
            <div
              id="backgroundColor"
              className="h4 heading4 font-semibold font-farro"
            >
              {propsdata?.title}
            </div>
            <div
              id="article-deatils-json"
              className="font-inter font-normal small"
            >
              {propsdata?.longDescription?.json &&
                documentToReactComponents(propsdata.longDescription.json)}
            </div>
          </div>
          {propsdata?.cta?.primaryCtaUrl && (
            <ClickTrackingWrapper
              gaData={{
                event: "ga_contentful_events",
                eventName: propsdata.cta.primaryCtaEventName,
                data_label: urlParams?.theme,
                article_category: urlParams?.hero,
                cta_name: propsdata.cta.primaryCtaLabel || "Find your perfect",
                cta_url: propsdata.cta.primaryCtaUrl,
                clearing: "in_year",
              }}
            >
              <a
                id="article-primaryCtaLabel-detai"
                href={propsdata.cta.primaryCtaUrl}
                target={
                  propsdata.cta.primaryCtaTarget === "Open in new tab"
                    ? "_blank"
                    : "_self"
                }
                className="btn btn-primary rtfcustom-link hover:no-underline px-[20px] py-[10px] w-fit !no-underline"
                rel={
                  propsdata.cta.primaryCtaTarget === "Open in new tab"
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {propsdata.cta.primaryCtaLabel || "Find your perfect "}
              </a>
            </ClickTrackingWrapper>
          )}
        </div>
        <span className="md:min-w-[219px] w-full md:w-auto  h-[187px] flex justify-center !m-0">
          {propsdata?.image?.imgUpload?.url && (
            <Image
              id="article-details-imgUpload"
              className="object-contain"
              src={propsdata?.image?.imgUpload?.url}
              width={219}
              height={187}
              alt={propsdata?.imgAltText ?? "Cta_banner_image"}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default Ctabanner;
