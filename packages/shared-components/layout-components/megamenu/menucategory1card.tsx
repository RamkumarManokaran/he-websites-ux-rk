import React from "react";
import {
  currentAuthenticatedUser,
  GADataLayerFn,
} from "@packages/lib/utlils/helper-function";

const Menucategory1card = ({
  data,
  parentMenu,
}: {
  data: any;
  parentMenu: any;
}) => {
  const calculate = () =>
    data?.length - 1 <= 6 ? 1 : Math.ceil((data?.length - 1) / 6);

  const size = calculate();
  const navTitle = data?.find(
    (item: any) => item?.flagNavItemStyle === "L2 Text"
  )?.navTitle;
  return (
    <div
      className={`dropdown-content-col h-fit grid gap-[8px] lg:gap-[16px] col-span-1 lg:col-span-${size}`}
    >
      {data?.find((item: any) => item?.flagNavItemStyle === "L2 Text") ? (
        <div className="font-semibold x-small text-neutral-500 uppercase px-[16px] pt-[32px] lg:p-[0]">
          {
            data?.find((item: any) => item?.flagNavItemStyle === "L2 Text")
              ?.navTitle
          }
        </div>
      ) : null}
      <ul
        className={`grid grid-cols-1 lg:grid-cols-${size}  gap-[16px] p-[16px] lg:p-[0] bg-white  `}
      >
        {data
          ?.filter((item: any) => item?.flagNavItemStyle !== "L2 Text")
          ?.map((item: any, index: number) => (
            <li key={index}>
              <a
                href={item?.navUrl || ""}
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
                className={`small text-grey300 hover:underline line-clamp-1 ${
                  item?.flagNavItemStyle === "Nav Bold"
                    ? "font-bold"
                    : "font-normal"
                }`}
              >
                {item?.navTitle}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Menucategory1card;
