"use client";
import React, { useState } from "react";
import Image from "next/image";

import Paginations from "@packages/shared-components/common-utilities/paginations/paginations";
import RequestInfo from "@packages/shared-components/common-utilities/cards/interaction-button/requestinfo";
import Getprospectus from "@packages/shared-components/common-utilities/cards/interaction-button/getprospectus";
import Visitwebsite from "@packages/shared-components/common-utilities/cards/interaction-button/visitwebsite";
import BookOpenDay from "@packages/shared-components/common-utilities/cards/interaction-button/bookopenday";

const ProviderResultsCard = ({ children }: any) => {
  const providerList = [
    {
      title: "Architecture & Design",
      provideFav: false,
      modulesList: ["Something", "Something", "Something", "Something"],
      tagLocation: "Distance/online",
      points: "164-112 ucas points",
    },
    {
      title: "Architecture & Design",
      provideFav: false,
      modulesList: ["Something", "Something", "Something", "Something"],
      tagLocation: "Distance/online",
      points: "164-112 ucas points",
    },
    {
      title: "Architecture & Design",
      provideFav: false,
      fullCourse: "Full course details available on [subject]",
      tagLocation: "Distance/online",
      points: "164-112 ucas points",
    },
    {
      title: "Architecture & Design",
      provideFav: false,
      modulesList: ["Something", "Something", "Something", "Something"],
      tagLocation: "Distance/online",
      points: "164-112 ucas points",
    },
    {
      title: "Architecture & Design",
      provideFav: false,
      modulesList: ["Something", "Something", "Something", "Something"],
      tagLocation: "Distance/online",
      points: "164-112 ucas points",
    },
    {
      title: "Architecture & Design",
      provideFav: false,
      modulesList: ["Something", "Something", "Something", "Something"],
      tagLocation: "Distance/online",
      points: "164-112 ucas points",
    },
    {
      title: "Architecture & Design",
      provideFav: false,
      modulesList: ["Something", "Something", "Something", "Something"],
      tagLocation: "Distance/online",
      points: "164-112 ucas points",
    },
    {
      title: "Architecture & Design",
      provideFav: false,
      modulesList: ["Something", "Something", "Something", "Something"],
      tagLocation: "Distance/online",
      points: "164-112 ucas points",
    },
    {
      title: "Architecture & Design",
      provideFav: false,
      modulesList: ["Something", "Something", "Something", "Something"],
      tagLocation: "Distance/online",
      points: "164-112 ucas points",
    },
  ];
  // Provider card toggle function
  const [isUniModule, setIsUniModule] = useState(false);
  const visbleModule = () => {
    setIsUniModule((preState) => !preState);
  };
  // Provider card toggle function  END

  const providerCard = providerList.map((items, index) => (
    <div
      key={index}
      // className="flex flex-col rounded-[16px] overflow-hidden bg-white shadow-custom-3 border border-grey-200 w-full md:max-w-[calc(50%_-_10px)] xl:max-w-[385px]"
      className="flex flex-col rounded-[16px] overflow-hidden bg-white shadow-custom-3 border border-grey-200"
    >
      <div className="flex justify-end p-[16px] bg-blue-100">
        <span className="favorite group items-center justify-center flex min-w-[40px] w-[40px] h-[40px]  border border-primary-400 hover:bg-primary-400 rounded-[48px] cursor-pointer">
          <div className="heart min-w-[40px] w-[40px] h-[40px] bg-white border border-blue-500 rounded-[24px] flex items-center justify-center cursor-pointer hover:bg-blue-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.02513 5.05027C2.65829 6.41711 2.65829 8.63318 4.02513 10L10 15.9749L15.9749 10C17.3417 8.63318 17.3417 6.41711 15.9749 5.05027C14.608 3.68344 12.392 3.68344 11.0251 5.05027L10 6.07544L8.97487 5.05027C7.60804 3.68344 5.39196 3.68344 4.02513 5.05027Z"
                stroke="#4664DC"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </span>
      </div>
      <div className="flex p-[16px] flex-col gap-[16px] h-full justify-between">
        <div className="flex flex-col gap-[16px] md:min-h-[240px]">
          <a
            href="#"
            className="h6 hover:underline cursor-pointer text-blue-400"
          >
            {items.title}
          </a>
          <ul className="flex flex-wrap gap-[4px]">
            <li className="flex gap-[2px] bg-grey-100 text-grey-500 uppercase font-semibold xs-small px-[8px] rounded-[4px]">
              <Image
                alt="calender icon"
                width="16"
                height="16"
                src="../static/assets/icons/search-result/calender-grey.svg"
              />

              {items.points}
            </li>
            <li className="flex gap-[2px] bg-grey-100 text-grey-500 font-semibold uppercase xs-small px-[8px] rounded-[4px]">
              <Image
                alt="timer icon"
                width="16"
                height="16"
                src="../static/assets/icons/search-result/time-grey.svg"
              />

              {items.tagLocation}
            </li>
          </ul>

          {items.fullCourse && (
            <span className="text-blue-400 font-semibold small">
              {items.fullCourse}
            </span>
          )}
          {/* PGS  */}
          {/* <p className="small text-grey500 line-clamp-3">Are you seeking to enter the criminal justice or community justice sectors Want to work with drug action teams or in the voluntary Are you seeking to enter the criminal justice or community justice sectors Want to work with drug action teams or in the voluntary </p> */}
          {/* PGS  END */}

          {items.modulesList && (
            <>
              <span
                onClick={visbleModule}
                className="text-blue-400 select-none font-semibold small cursor-pointer transition-all delay-0 duration-300 ease-linear pl-[20px] relative before:absolute before:content-[''] before:w-[11px] before:h-[2px] before:bg-blue-400 before:rounded-[2px] before:left-[2px] before:top-[10px] after:absolute after:content-[''] after:w-[11px] after:h-[2px] after:bg-blue-400 after:rounded-[2px] after:left-[2px] after:top-[10px] after:rotate-[90deg] after:transition-all after:delay-0 after:duration-300 after:ease-linear"
              >
                Modules
              </span>
              <ul className="p-[0_16px_0_18px] flex flex-col gap-[8px] list-disc">
                {isUniModule && (
                  <>
                    {items.modulesList.map((list, index) => (
                      <li className="text-grey300 small break-all" key={index}>
                        {list}
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </>
          )}
          {isUniModule && (
            <span className="text-blue-400 hover:underline select-none font-semibold small cursor-pointer ">
              See all modules
            </span>
          )}
        </div>

        <div className="w-full flex flex-col gap-[8px]">
          <Getprospectus />
          <Visitwebsite />
          <BookOpenDay />
          <RequestInfo />
        </div>
      </div>
    </div>
  ));
  return (
    <>
      {/* Provider Result card list  */}
      <section className="bg-grey-50">
        <div className="max-w-container px-[6px] md:px-[24px] xl:px-[0] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-[24px] px-[10px] gap-[20px]">
            {providerCard}
          </div>
          <div className="py-[40px]">
            {/* <Paginations /> */}
            {children}
          </div>
        </div>
      </section>
      {/* Provider Result card list END */}
    </>
  );
};

export default ProviderResultsCard;
