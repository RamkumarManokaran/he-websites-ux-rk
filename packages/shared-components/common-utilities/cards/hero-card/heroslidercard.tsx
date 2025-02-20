import React from "react";
import Image from "next/image";

import { DynamicMediaComponent } from "@packages/lib/types/interfaces";
import { GADataLayerFn } from "@packages/lib/utlils/helper-function";
const HeroSliderCard = ({
  data,
  index,
  pageName,
}: {
  data: DynamicMediaComponent;
  index: number;
  pageName:any;
}) => {
  return (
    <>
      <div
        className={`flex justify-between gap-[16px]  ${process.env.PROJECT === "PGS" ? "min-h-[278px]" : "min-h-[260px] md:min-h-[442px]"}`}
        data-testid="heroslidercard"
      >
        <div className="w-full pt-[64px] pb-[40px] md:pt-[68px] md:pb-[108px] lg:py-[88px]">
          {index == 0 ? (
            <h1 className="text-heading-lg mb-[4px] md:line-clamp-2">
              {data?.title}
            </h1>
          ) : (
            <h2 className="text-heading-lg mb-[4px] md:line-clamp-2">
              {data?.title}
            </h2>
          )}
          <p className="para-lg mb-[16px] md:line-clamp-2">
            {data?.longDescription?.json?.content[0]?.content[0]?.value}
          </p>

          {data?.cta && (
            <a
              data-testid="linktag"
              href={data?.cta?.primaryCtaUrl || ""}
              onClick={() => {
                GADataLayerFn(
                  "ga_contentful_events",
                  data?.cta?.primaryCtaEventName,
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  pageName,
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  "in_year",
                  "0",
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  `${process.env.PROJECT}`,
                  data?.cta?.primaryCtaLabel,
                  data?.cta?.primaryCtaUrl
                );
              }}
              className="flex items-center gap-[6px] w-fit bg-primary-400 hover:bg-primary-500 text-white rounded-[20px] font-semibold text-small px-[20px] py-[10px] cursor-pointer"
            >
              {data?.cta?.primaryCtaLabel}
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.55556 1.55554L15 6.99999M15 6.99999L9.55555 12.4444M15 6.99999L1 6.99999"
                  stroke="#fff"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
        <div className="md:w-[354px] lg:w-[495px] shrink-0 self-end hidden md:block md:pb-[80px] md:px-[21px] lg:pb-0 lg:pt-[38px] lg:px-[66px]">
          {data?.image?.imgUpload?.url && (
            <Image
              data-testid="HeroImage"
              priority={true}
              src={data?.image?.imgUpload?.url || ""}
              width={365}
              height={445}
              alt={data?.image?.imgAltText}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HeroSliderCard;
