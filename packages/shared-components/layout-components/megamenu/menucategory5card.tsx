import Image from "next/image";
import React from "react";
import {
  currentAuthenticatedUser,
  GADataLayerFn,
} from "@packages/lib/utlils/helper-function";

const Menucategory5card = ({
  data,
  parentMenu,
}: {
  data: any;
  parentMenu: any;
}) => {
  const navTitle = data?.find(
    (item: any) => item?.flagNavItemStyle === "L2 Text"
  )?.navTitle;
  return (
    <div className="dropdown-content-col flex flex-col gap-[8px] lg:gap-[16px]">
      <div className="font-semibold x-small text-neutral-500 uppercase px-[16px] pt-[32px] lg:p-[0]">
        {
          data?.find((item: any) => item?.flagNavItemStyle === "L2 Text")
            ?.navTitle
        }
      </div>
      <ul className="flex flex-col gap-[16px] p-[16px] lg:p-[0] bg-white grid lg:grid-cols-1">
        {data?.slice(1)?.map((item: any, index: any) => (
          <li key={index}>
            <a
              href={item?.navUrl || ""}
              target={
                item?.navCtaTarget === "Open in new tab" ? "_blank" : "_parent"
              }
              onClick={async () => {
                GADataLayerFn(
                  "ga_contentful_events",
                  "header_clicks",
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  localStorage?.getItem("gaPageName") || "",
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
                  await currentAuthenticatedUser(),
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  "NA",
                  `${process.env.PROJECT}`,
                  item?.navTitle,
                  item?.navUrl,
                  parentMenu,
                  navTitle
                );
              }}
              rel={
                item?.navCtaTarget === "Open in new tab"
                  ? "noopener noreferrer"
                  : undefined
              }
              className="block bg-neutral-200 "
            >
              <div className="megamenu-image-card  min-h-[224px] max-h-[224px] relative z-0 overflow-hidden">
                {item?.navIcon?.url && (
                  <Image
                    className="w-full"
                    src={item?.navIcon?.url || ""}
                    width="289"
                    height="224"
                    alt="University logo"
                  />
                )}
                <div className="overlay absolute z-0 top-0 left-0 right-0 bottom-0 bg-gradientBlack1"></div>
                <div className="font-semibold small text-white absolute z-1 bottom-[0] p-[10px]">
                  {item?.navTitle}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menucategory5card;
