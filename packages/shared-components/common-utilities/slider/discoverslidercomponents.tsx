"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { discoverpodQuery } from "@packages/lib/graphQL/graphql-query";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { GADataLayerFn } from "@packages/lib/utlils/helper-function";
import { useRouter } from "next/router";

export interface discoverContentfulInterface {
  data: {
    contentData?: {
      items?: [
        {
          bodyContentCollection?: {
            items?: [
              {
                mediaCardsCollection?: {
                  items?: [
                    {
                      title: "";
                      subTitle: "";
                      internalName: "";
                      backgroundColor: "";
                      cta: {
                        internalName: "";
                        primaryCtaUrl: "";
                        primaryCtaLabel: "";
                        secondaryCtaUrl: "";
                        secondaryCtaLabel: "";
                        primaryCtaTarget: "";
                        secondaryCtaTarget: "";
                        flagStyle: "";
                      };
                      image: {
                        imageTitle: "";
                        imgAltText: "";
                        imgUpload: {
                          url: "";
                          height: "";
                          width: "";
                        };
                      };
                    },
                  ];
                };
              },
            ];
          };
        },
      ];
    };
  };
}

const Discoverslidercomponents1 = ({
  dicoverCardContentfulList,
}: {
  dicoverCardContentfulList: any;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isMobile ? (
        <div className="slider-container">
          <Swiper
            pagination={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
            }}
            modules={[FreeMode, Pagination]}
            className="MultiSwiper"
          >
            {dicoverCardContentfulList?.map(
              (discoverItems: any, index: number) => {
                return (
                  <SwiperSlide key={discoverItems.internalName + index}>
                    <div
                      className="discover-card"
                      data-testid="discovercardMobile"
                    >
                      <a
                        href={
                          discoverItems?.cta?.primaryCtaUrl
                            ? discoverItems?.cta?.primaryCtaUrl
                            : ""
                        }
                        onClick={() => {
                          GADataLayerFn(
                            "ga_contentful_events",
                            discoverItems.cta?.primaryCtaEventName,
                            "NA",
                            "NA",
                            "NA",
                            "NA",
                            "home_page",
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
                            discoverItems?.title,
                            discoverItems?.cta?.primaryCtaUrl
                          );
                        }}
                        className={`h-[200px] block ${discoverItems?.backgroundColor} hover:outline-2 hover:outline hover:outline-primary-400 rounded-[8px] overflow-hidden`}
                      >
                        <div className="discover-card flex justify-between gap-[8px] h-[100%]">
                          <div className="flex flex-col justify-between p-[20px] pr-[0] w-[calc(100%_-_194px)]">
                            <div>
                              {discoverItems?.title && (
                                <div
                                  className="w-fit uppercase font-bold x-small text-primary-500 bg-white/[.6] px-[6px] py-[2px] rounded-[4px]"
                                  data-testid="cardTitle"
                                >
                                  {discoverItems?.title}
                                </div>
                              )}
                            </div>
                            {discoverItems?.subTitle && (
                              <div className="h5" data-testid="cardSubTitle">
                                {discoverItems?.subTitle}
                              </div>
                            )}
                          </div>
                          {discoverItems?.image?.imgUpload?.url && (
                            <div className="discover_media flex self-end w-[186px]">
                              <Image
                                src={discoverItems?.image?.imgUpload?.url || ""}
                                width="186"
                                height="200"
                                alt="discover"
                                data-testid="discoverImageId"
                                data-testsrc={discoverItems.image.imgUpload.url}
                              />
                            </div>
                          )}
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </div>
      ) : (
        <div className="discover grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-[20px] lg:px-[20px] xl:px-[0]">
          {dicoverCardContentfulList?.map(
            (discoverItems: any, index: number) => {
              return (
                <div
                  className="discover-card"
                  data-testid="discovercardDesktop"
                  key={discoverItems.internalName + index}
                >
                  <a
                    href={
                      discoverItems?.cta?.primaryCtaUrl
                        ? discoverItems?.cta?.primaryCtaUrl
                        : ""
                    }
                    onClick={() => {
                      GADataLayerFn(
                        "ga_contentful_events",
                        discoverItems.cta?.primaryCtaEventName,
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
                        "0",
                        "NA",
                        "NA",
                        "NA",
                        "NA",
                        "NA",
                        "NA",
                        `${process.env.PROJECT}`,
                        discoverItems?.title,
                        discoverItems?.cta?.primaryCtaUrl
                      );
                    }}
                    className={`h-[200px] block ${discoverItems?.backgroundColor} hover:outline-2 hover:outline hover:outline-primary-400 rounded-[8px] overflow-hidden`}
                  >
                    <div className="discover-card flex justify-between gap-[8px] h-[100%]">
                      <div className="flex flex-col justify-between p-[20px] pr-[0] lg:w-[calc(100%_-_145px)] xl:w-[calc(100%_-_194px)]">
                        <div>
                          {discoverItems?.title && (
                            <div
                              className="w-fit uppercase font-bold x-small text-primary-500 bg-white/[.6] px-[6px] py-[2px] rounded-[4px]"
                              data-testid="cardTitle"
                            >
                              {discoverItems.title}
                            </div>
                          )}
                        </div>
                        {discoverItems?.subTitle && (
                          <div className="h5" data-testid="cardSubTitle">
                            {discoverItems?.subTitle}
                          </div>
                        )}
                      </div>
                      {discoverItems?.image?.imgUpload?.url && (
                        <div className="discover_media flex self-end lg:w-[145px] xl:w-[186px]">
                          <Image
                            className="w-full h-auto"
                            src={discoverItems?.image?.imgUpload?.url || ""}
                            width="186"
                            height="200"
                            alt="discover"
                            data-testid="discoverImageId"
                            data-testsrc={discoverItems.image.imgUpload.url}
                          />
                        </div>
                      )}
                    </div>
                  </a>
                </div>
              );
            }
          )}
        </div>
      )}
    </>
  );
};

export default Discoverslidercomponents1;
