"use client";
import React, { useState } from "react";
import UniversityTab from "@packages/shared-components/home/search-input-pods/universitytab";
import AdviceTab from "@packages/shared-components/home/search-input-pods/advicetab";
import CourseTab from "@packages/shared-components/home/search-input-pods/coursetab";
import Image from "next/image";
import Link from "next/link";
export default function Search({ rightMenuAction }: any) {
  const searchTabClick = (tabName: string) => {
    setsearchFormHandle((preData) => ({ ...preData, activeTab: tabName }));
  };

  const data: any = {};
  const [searchFormHandle, setsearchFormHandle] = useState({
    activeTab: "tab1",
    isCourseType: false,
    isSubjectClicked: false,
    isLocationClicked: false,
    isAdviceClicked: false,
    isUniversityClicked: false,
    courseType: { qualUrl: "degree", qualCode: "M", qualDesc: "Undergraduate" },
    university: "",
    subject: {},
    location: {},
    advice: "",
  });

  return (
    <>
      <div className="bg-white absolute top-0 left-0 right-0 z-10 lg:min-h-[222px]">
        <div className="max-w-container w-full mx-auto flex flex-col px-[16px] pt-[8px] pb-[56px] md:pt-[16px] md:pb-[32px]">
          <div className="flex justify-end relative ">
            <svg
              aria-label="close-button"
              className="cursor-pointer"
              onClick={() => rightMenuAction("SEARCH")}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 29L29 3M3 3L29 29"
                stroke="#333F48"
                strokeWidth="2.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-[16px] mt-[16px] md:mt-[-16px]">
            <ul className="flex items-center gap-[4px] cursor-pointer">
              <li
                className={`rounded-[20px] px-[12px] py-[8px] small font-semibold inline-block hover:bg-black hover:text-white border border-grey-500 ${
                  searchFormHandle.activeTab === "tab1"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => searchTabClick("tab1")}
              >
                Courses
              </li>
              <li
                className={`rounded-[20px] px-[12px] py-[8px] small font-semibold inline-block hover:bg-black hover:text-white border border-grey-500 ${
                  searchFormHandle.activeTab === "tab2"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => searchTabClick("tab2")}
              >
                Universities
              </li>
              <li
                className={`rounded-[20px] px-[12px] py-[8px] small font-semibold inline-block hover:bg-black hover:text-white border border-grey-500 ${
                  searchFormHandle.activeTab === "tab3"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => searchTabClick("tab3")}
              >
                Advice
              </li>
            </ul>
            <div className="w-full lg:max-w-[800px]">
              {searchFormHandle?.activeTab === "tab1" && (
                <div className="flex flex-col gap-[24px] min-h-[60px]">
                  <CourseTab
                    data={data}
                    searchFormHandle={searchFormHandle}
                    setsearchFormHandle={setsearchFormHandle}
                  />
                  <div className="flex items-center justify-center small">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.66678..."
                        stroke="#0F172A"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="ml-[4px] mr-[8px]">
                      Don’t know your UCAS points?
                    </div>
                    <Link
                      href="#"
                      className="text-blue-500 font-semibold hover:underline"
                    >
                      Calculate them
                    </Link>
                  </div>
                </div>
              )}
              {searchFormHandle?.activeTab === "tab2" && (
                <div className="flex flex-col gap-[24px] min-h-[60px]">
                  <UniversityTab
                    searchFormHandle={searchFormHandle}
                    setsearchFormHandle={setsearchFormHandle}
                    data={data}
                  />
                  <div className="flex justify-center">
                    <Link
                      href="#"
                      className="flex items-center gap-[4px] text-blue-500 small font-semibold hover:underline"
                    >
                      Browse unis A-Z
                      <Image
                        src="/static/assets/icons/arrow-right.svg"
                        width={20}
                        height={20}
                        alt="Right Arrow"
                      />
                    </Link>
                  </div>
                </div>
              )}
              {searchFormHandle?.activeTab === "tab3" && (
                <div className="flex flex-col gap-[24px] min-h-[60px]">
                  <AdviceTab
                    searchFormHandle={searchFormHandle}
                    setsearchFormHandle={setsearchFormHandle}
                  />
                  <div className="flex justify-center">
                    <Link
                      href="#"
                      className="flex items-center gap-[4px] text-blue-500 small font-semibold hover:underline"
                    >
                      Browse advice
                      <Image
                        src="/static/assets/icons/arrow-right.svg"
                        width={20}
                        height={20}
                        alt="Right Arrow"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
