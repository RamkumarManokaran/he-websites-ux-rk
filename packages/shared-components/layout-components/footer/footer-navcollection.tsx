"use server";
import React from "react";

import { FooterNavCollectionItem } from "@packages/lib/types/interfaces";
import ClickTrackerWrapper from "@packages/lib/utlils/clicktrackerwrapper";
interface PropsInterface {
  data: FooterNavCollectionItem[];
}
const FooterNavCollection = ({ data }: PropsInterface) => {
  return (
    <>
      {data?.map((navItems, index) => (
        <div
          className="flex flex-col gap-[16px]"
          key={index + 1}
          data-testid={`section${index + 1}`}
        >
          <p
            className="footer_title font-semibold text-grey300 x-small uppercase"
            data-testid="navtitle"
          >
            {navItems?.navTitle}
          </p>
          <div className="flex flex-col">
            <ul className="flex flex-col gap-[4px]">
              {navItems?.navChildC1Collection?.items?.map(
                (childItem, index) => (
                  <li key={index + 1} data-testid={`childMenu${index + 1}`}>
                    <ClickTrackerWrapper
                      gaData={{
                        event: "ga_contentful_events",
                        eventName: "footer_clicks",
                        cta_name: childItem.navTitle,
                        cta_url: childItem?.navUrl || "",
                        page_name: "",
                        contentful_1: navItems?.navTitle,
                        clearing: "in_year",
                      }}
                    >
                      <a
                        data-testid={`${childItem.navTitle}${index + 1}`}
                        target={
                          childItem.navCtaTarget?.includes("new")
                            ? "_blank"
                            : "_parent"
                        }
                        href={childItem?.navUrl || ""}
                        className="small text-grey300 hover:underline"
                      >
                        {childItem?.navTitle}
                      </a>
                    </ClickTrackerWrapper>
                  </li>
                  
                )
              )}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterNavCollection;
