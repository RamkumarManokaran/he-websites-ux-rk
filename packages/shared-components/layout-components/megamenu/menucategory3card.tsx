import Image from "next/image";
import React from "react";
import {
  currentAuthenticatedUser,
  GADataLayerFn,
} from "@packages/lib/utlils/helper-function";

const Menucategory3card = ({
  data,
  parentMenu,
}: {
  data: any;
  parentMenu: any;
}) => {
  const calculate = () =>
    data?.length - 1 <= 2 ? 1 : Math.ceil((data?.length - 1) / 2);

  const size = calculate();
  const row = Math.ceil(size / 2);
  const navTitle = data?.find(
    (item: any) => item?.flagNavItemStyle === "L2 Text"
  )?.navTitle;

  return (
    <div
      className={`dropdown-content-col flex flex-col gap-[8px] lg:gap-[16px] lg:col-span-${row}`}
    >
      <div className="font-semibold x-small text-neutral-500 uppercase px-[16px] pt-[32px] lg:p-[0]">
        {
          data?.find((item: any) => item?.flagNavItemStyle === "L2 Text")
            ?.navTitle
        }
      </div>
      <ul
        className={`grid grid-cols-1 grid-rows-2 lg:grid-cols-${size} gap-[16px] p-[16px] lg:p-[0] bg-white`}
      >
        {data
          ?.filter(
            (item: any) => item?.flagNavItemStyle !== "L2 Text" // Exclude the L2 Text item
          )
          ?.map((item: any, index: number) => (
            <li key={index}>
              <a
                href={item?.navUrl || ""}
                target={
                  item?.navCtaTarget === "Open in new tab"
                    ? "_blank"
                    : "_parent"
                }
                rel={
                  item?.navCtaTarget === "Open in new tab"
                    ? "noopener noreferrer"
                    : undefined
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
                className="flex flex-row lg:flex-col items-center gap-[10px] font-normal small text-grey300 hover:underline"
              >
                {item?.navIcon?.url && (
                  <Image
                    className="block rounded-[40px] outline outline-1 outline-neutral-200 outline-offset-2 !h-[72px]"
                    src={item?.navIcon?.url || ""}
                    width="72"
                    height="72"
                    loading="lazy"
                    alt="Megamenu thumb"
                  />
                )}
                <span className="line-clamp-1 text-center">
                  {item?.navTitle}
                </span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Menucategory3card;
