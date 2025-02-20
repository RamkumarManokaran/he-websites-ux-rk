import Image from "next/image";

import React from "react";
import { CarouselItem } from "@packages/lib/types/interfaces";

//import { icons } from "@/utils/svg";
//import Favourite from "../../favourites";

const CourseCard = ({
  courseTitle,
  uniLogo = "",
  courseuniName,
  countryName,
  degreeType,
  years,
  fees,
  isFastlaneTag,
}: Pick<
  CarouselItem,
  | "courseTitle"
  | "uniLogo"
  | "courseuniName"
  | "countryName"
  | "degreeType"
  | "years"
  | "fees"
  | "isFastlaneTag"
>) => {
  return (
    <>
      <div
        className={` px-[16px] pt-[16px] pb-[24px] border-t-[8px] course-card `}
      >
        <div className="flex justify-between">
          <span className="cursor-pointer  flex items-center bg-grey100 hover:bg-grey200 rounded-[28px] w-[40px] h-[40px] justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M1 11L11 1M1 1L11 11"
                stroke="#333333"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {/* <Favourite /> */}
        </div>

        <div className="flex flex-col gap-[12px] mt-[12px]">
          <div className="">
            {isFastlaneTag && (
              <div className="bg-positive px-[6px] rounded-tl-[6px] rounded-br-[6px] mb-[4px] flex gap-[2px] w-fit cursor-pointer">
                <p className="text-white text-x-small font-semibold ">
                  FastLane
                </p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.55556 10.2222H8V8H7.44444M8 5.77778H8.00556M13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8Z"
                    stroke="#FFEEEE"
                    strokeWidth="1.13"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
            <a
              href="/"
              className="text-para font-semibold text-primary400 lg:text-darkGrey lg:hover:text-primary-400"
            >
              {courseTitle}
            </a>
          </div>
          <div className="flex gap-[12px] items-center">
            <Image
              className="border border-grey200 p-[4px] rounded-[4px]"
              alt="unilogo"
              src={uniLogo || ""}
              width={40}
              height={40}
              objectFit="cover"
            />
            <div className="">
              <p className="text-small text-grey600 font-medium overflow-hidden text-ellipsis line-clamp-1 mb-[2px] max-w-[23ch] whitespace-nowrap">
                {courseuniName}
              </p>

              <p className="text-x-small text-grey600">{countryName}</p>
            </div>
          </div>
          <div className="flex gap-[8px] items-center">
            {/* {icons.degreeCap("w-20 h-20")} */}
            <p className=" text-grey600 text-small ">{degreeType}</p>
          </div>
          <div className="flex gap-[8px] items-center">
            {/* {icons.calender("w-20 h-20")} */}
            <p className=" text-grey600 text-small ">{years}</p>
          </div>
          <div className="flex gap-[8px] items-center">
            {/* {icons.fees("w-20 h-20")} */}
            <p className=" text-grey600 text-small ">{fees}</p>
            <div className="relative group">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:hidden"
              >
                <path
                  d="M10.7778 13.6111H10V10.5H9.22222M10 7.38889H10.0078M17 10.5C17 14.366 13.866 17.5 10 17.5C6.13401 17.5 3 14.366 3 10.5C3 6.63401 6.13401 3.5 10 3.5C13.866 3.5 17 6.63401 17 10.5Z"
                  // className="hover:fill-[#333F48]  hover:stroke-[#fff] "
                  stroke="#333F48"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden group-hover:block"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17 10.5C17 14.366 13.866 17.5 10 17.5C6.13401 17.5 3 14.366 3 10.5C3 6.63401 6.13401 3.5 10 3.5C13.866 3.5 17 6.63401 17 10.5ZM10.875 7C10.875 7.48325 10.4832 7.875 10 7.875C9.51675 7.875 9.125 7.48325 9.125 7C9.125 6.51675 9.51675 6.125 10 6.125C10.4832 6.125 10.875 6.51675 10.875 7ZM9.125 9.625C8.64175 9.625 8.25 10.0168 8.25 10.5C8.25 10.9832 8.64175 11.375 9.125 11.375V14C9.125 14.4832 9.51675 14.875 10 14.875H10.875C11.3582 14.875 11.75 14.4832 11.75 14C11.75 13.5168 11.3582 13.125 10.875 13.125V10.5C10.875 10.0168 10.4832 9.625 10 9.625H9.125Z"
                  fill="#333F48"
                />
              </svg>

              <div className="absolute hidden group-hover:block bottom-[30px] left-1/2 shadow-custom-lg transform -translate-x-1/2 text-small bg-white text-textBlack p-[12px] rounded-[8px] z-10 w-[112px] font-semibold ">
                <span className="flex items-center justify-center">
                  ₹23456709
                </span>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
