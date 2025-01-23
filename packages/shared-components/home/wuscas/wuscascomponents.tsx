"use server";
import { statsPodQuery } from "@packages/lib/graphQL/graphql-query";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { HomePageStatInterface } from "@packages/lib/types/interfaces";
import ClickTrackerWrapper from "@packages/lib/utlils/clicktrackerwrapper";
import { homePageComponentQueryFormation } from "@packages/lib/graphQL/fetch-function";
import Image from "next/image";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import React, { Suspense } from "react";
interface WuscascomponentsProps {
  heading?: string | undefined;
  subheading?: string | undefined;
  pageName?: any;
  internalName: string | undefined;
  routename: string;
  contentModelName: string;
  iscontentPreview?: boolean;
  parentSysId?: string;
}

const Wuscascomponents: React.FC<WuscascomponentsProps> = async ({
  heading,
  subheading,
  pageName,
  routename,
  internalName,
  contentModelName,
  iscontentPreview,
  parentSysId,
}) => {
  const query = homePageComponentQueryFormation(
    internalName,
    statsPodQuery,
    routename,
    contentModelName,
    iscontentPreview
  );
  const resultData: HomePageStatInterface = await graphQlFetchFunction(
    query,
    iscontentPreview
  );
  const statsData =
    resultData?.data?.contentData?.items?.[0]?.bodyContentCollection.items?.[0]?.mediaCardsCollection.items?.find(
      (item: any) => item.__typename === "PageStatPodContainer"
    );
  console.log("sub-heading", subheading);
  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: parentSysId,
              fieldId: "cardSectionTitle",
              targetSelector: "#wusca_heading",
            },
            {
              entryId: parentSysId,
              fieldId: "shortDescription",
              targetSelector: "#wusca_subheading",
            },
            {
              entryId: statsData?.sys?.id,
              fieldId: "primaryCtaLabel",
              targetSelector: "#primaryCtaLabel",
            },
            {
              entryId: statsData?.image?.sys?.id,
              fieldId: "image",
              targetSelector: "#image",
            },
          ]}
        />
      )}
      {statsData && (
        <Suspense>
          <section className="wusca-container">
            <div className="max-w-container mx-auto">
              {/* container */}
              <div className="wusca-card-container grid  grid-rows-[2_minmax(0_auto)] md:grid-cols-[1fr_1fr)] px-[16px] py-[40px] md:px-[20px] md:pt-[0] md:pb-[64px] xl:p-[0] gap-[24px] md:gap-[20px] xl:gap-x-[20px] xl:gap-y-[24px]">
              {/* <div className="wusca-card-container grid  grid-rows-[3_minmax(0_auto)] md:grid-cols-[auto_minmax(352px,_1fr)] xl:grid-cols-[auto_minmax(598px,_1fr)] px-[16px] py-[40px] md:px-[20px] md:pt-[0] md:pb-[64px] xl:p-[0] gap-[24px] md:gap-[20px] xl:gap-x-[20px] xl:gap-y-[24px]"> */}
                <div className="wusca-content flex flex-col justify-center xl:justify-end col-start-1 row-start-2 md:row-start-1 md:col-start-2 md:row-end-2 md:col-end-3 md:area gap-[16px] md:gap-[24px]">
                  <div className="flex flex-col gap-[8px]">
                    <h2 className="font-bold" id="wusca_heading">
                      {heading}
                    </h2>
                    <p className="font-normal" id="wusca_subheading">
                      {subheading}
                    </p>
                  </div>
                  <ClickTrackerWrapper
                    gaData={{
                      event: "ga_contentful_events",
                      eventName: statsData?.cta?.primaryCtaEventName || "",
                      ctaTitle: statsData?.cta?.primaryCtaLabel || "",
                      ctaUrl: statsData?.cta.primaryCtaUrl || "",
                      website: `${process.env.PROJECT}`,
                      pageName: pageName,
                    }}
                  >
                    <a
                      href={`${statsData?.cta.primaryCtaUrl}`}
                      id="primaryCtaLabel"
                      className="flex items-center gap-[6px] w-fit bg-primary-400 hover:bg-primary-500 text-white rounded-[20px] font-inter font-semibold text-small px-[20px] py-[10px]"
                    >
                      {statsData?.cta?.primaryCtaLabel}
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
                  </ClickTrackerWrapper>
                </div>
                {routename == "/" && (
                  <div className="wusca-highlights grid grid-cols-3 items-baseline gap-[8px] row-start-3 row-end-4 col-start-1 col-end-2 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3  xl:col-end-2 ">
                    {statsData?.statinfoCollection?.items?.map(
                      (stats, index) => (
                        <div
                          className="wusca-card flex items-center flex-col md:flex-row gap-[8px] px-[16px] py-[12px] rounded-[4px] border border-grey300"
                          key={index}
                        >
                          <Image
                            className="w-[32px] h-[32px]"
                            src={`${stats?.icon.url || ""}`}
                            width="32"
                            height="32"
                            alt={stats.icon.title}
                            priority={true}
                          />
                          <div className="wusca-content text-center md:text-left">
                            <h3 className="font-bold">{stats?.statNumber}</h3>
                            <div className="font-semibold small">
                              {stats?.statLabel}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
                <div
                  className="grid justify-center px-[20px] md:px-[16px] md:py-[36px] xl:px-[0] row-start-1 row-end-2 md:row-start-1 md:row-end-2 col-start-1 col-end-2"
                  id="image"
                >
                {/* <div
                  className="grid justify-center px-[20px] md:px-[16px] md:py-[36px] xl:px-[0] row-start-1 row-end-2 xl:row-end-3 col-start-2 -col-end-1"
                  id="image"
                > */}
                  <Image
                    priority={true}
                    src={`${statsData?.image.url || ""}`}
                    width={402}
                    height={401}
                    alt={statsData?.image.title || ""}
                  />
                </div>
              </div>
              {/* container */}
            </div>
          </section>
        </Suspense>
      )}
    </>
  );
};

export default Wuscascomponents;
