"use server";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import Link from "next/link";
import React, { Suspense } from "react";
import { HomePageInterface } from "@packages/lib/types/interfaces";
import { tagCloudQuery } from "@packages/lib/graphQL/graphql-query";
import ClickTrackerWrapper from "@packages/lib/utlils/clicktrackerwrapper";

interface headingProps {
  heading: string;
}

const Tagcloudcomponents: React.FC<headingProps> = async ({ heading }) => {
  const tagCloudData: HomePageInterface =
    await graphQlFetchFunction(tagCloudQuery);
  const tagCloudArray =
    tagCloudData?.data?.contentData.items?.[0]?.bodyContentCollection.items[0]
      .mediaCardsCollection.items;
  return (
    <Suspense>
      <div className={`tag-cloud-container ${process.env.PROJECT === "PGS" ? "bg-grey-50" : "bg-white"}`}>
        <div className="max-w-container mx-auto">
          <div className={`tag-cloud-card-container flex flex-col gap-[16px] px-[16px] md:px-[20px] xl:px-[0]   ${process.env.PROJECT === "PGS" ? "py-[40px] md:py-[64px]" : "pt-[8px] pb-[32px] lg:pt-[16px] md:pb-[64px]"}`}>
            <div className="tag-cloud-header">
              <div className="h6">{heading}</div>
            </div>
            <div className="tag-cloud-inner-wrap">
              <ul className="flex flex-wrap gap-[8px]">
                {tagCloudArray?.map((data, index) => (
                  <li key={index}>
                    {data?.tagUrl && (
                      <ClickTrackerWrapper  gaData={{
                        event: "ga_contentful_events",
                        eventName:data?.tagName,
                        ctaTitle: data?.tagName,
                        ctaUrl: data?.tagUrl,
                        website:`${process.env.PROJECT}`,
                        pageName:"homepage",
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
