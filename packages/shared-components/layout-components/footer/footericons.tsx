"use server";
import React from "react";
import Image from "next/image";

import { NavChild } from "@packages/lib/types/interfaces";
import ClickTrackerWrapper from "@packages/lib/utlils/clicktrackerwrapper";
interface PropsInterface {
  data: NavChild[];
}
const FooterIcons = ({ data }: PropsInterface) => {
  return (
    <ul className="flex flex-row gap-[16px]">
      {data?.map((item, index) => (
        <li key={index}>
          {/* <ClickTrackerWrapper   gaData={{
                        event: "ga_contentful_events",
                        eventName:"footer_clicks",
                        ctaTitle: item.navName,
                        ctaUrl: item.navIcon.url,
                        website:`${process.env.PROJECT}`,
                        pageName:"homepage",

                      }}
                      > */}
          {item?.navIcon?.url && (
            <a
              href={item.navUrl || ""}
              aria-label="facebook"
              className="flex items-center w-[32px] h-[32px]"
            >
              <Image
                alt={item.navName}
                src={item.navIcon.url}
                width={item.navIcon.width}
                height={item.navIcon.height}
              />
            </a>
          )}
          {/* </ClickTrackerWrapper> */}
        </li>
      ))}
    </ul>
  );
};

export default FooterIcons;
