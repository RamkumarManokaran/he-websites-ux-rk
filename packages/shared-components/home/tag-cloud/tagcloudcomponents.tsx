"use server";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { tagCloudQuery } from "@packages/lib/graphQL/graphql-query";
import Link from "next/link";
import { homePageComponentQueryFormation } from "@packages/lib/graphQL/fetch-function";
import React, { Suspense } from "react";
import { HomePageInterface } from "@packages/lib/types/interfaces";
import ClickTrackerWrapper from "@packages/lib/utlils/clicktrackerwrapper";
interface headingProps {
  heading: string;
  pageName: any;
  internalName: string | undefined;
  routename: string;
  contentModelName: string;
}

const Tagcloudcomponents: React.FC<headingProps> = async ({
  heading,
  pageName,
  internalName,
  routename,
  contentModelName,
}) => {
  const query = homePageComponentQueryFormation(
    internalName,
    tagCloudQuery,
    routename,
    contentModelName
  );
  const tagCloudData: HomePageInterface = await graphQlFetchFunction(query);
  const tagCloudArray =
    tagCloudData?.data?.contentData.items?.[0]?.bodyContentCollection.items[0]
      .mediaCardsCollection.items;
  // console.log(tagCloudArray);
  return (
    <Suspense>
      <div className="tag-cloud-container">
        <div className="max-w-container mx-auto">
          <div
            className={`tag-cloud-card-container flex flex-col gap-[16px] px-[16px] md:px-[20px] xl:px-[0] ${process.env.PROJECT === "PGS" ? "py-[40px] md:py-[64px]" : "pt-[8px] pb-[32px] lg:pt-[16px] md:pb-[64px]"}`}
          >
            <div className="tag-cloud-header">
              <div className="h6">{heading}</div>
            </div>
            <div className="tag-cloud-inner-wrap">
              <ul className="flex flex-wrap gap-[8px]">
                {tagCloudArray?.map((data, index) => (
                  <li key={index}>
                    {data?.tagUrl && (
                      <ClickTrackerWrapper
                        gaData={{
                          event: "ga_contentful_events",
                          eventName: data?.eventName || "",
                          cta_name: data?.tagName,
                          cta_url: data?.tagUrl,
                          website_name: `${process.env.PROJECT}`,
                          page_name: pageName,
                        }}
                      >
                        <Link
                          href={data?.tagUrl}
                          prefetch={false}
                          className="font-bold x-small text-primary-500 uppercase rounded-[4px] bg-primary-50 hover:bg-primary-500 hover:text-white px-[8px] py-[3px]"
                        >
                          {data?.tagName}
                        </Link>
                      </ClickTrackerWrapper>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Tagcloudcomponents;
