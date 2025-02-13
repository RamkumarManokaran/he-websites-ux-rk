"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickAndShow from "@packages/shared-components/common-utilities/click-show/click-show";
import Getprospectus from "@packages/shared-components/common-utilities/cards/interaction-button/getprospectus";
import Visitwebsite from "@packages/shared-components/common-utilities/cards/interaction-button/visitwebsite";
import BookOpenDay from "@packages/shared-components/common-utilities/cards/interaction-button/bookopenday";
import RequestInfo from "@packages/shared-components/common-utilities/cards/interaction-button/requestinfo";
import { getCurrentUser } from "@aws-amplify/auth";

interface SrPageResultPodProps {
  searchResultsData: any[];
}


const SrPageResultPod : React.FC<SrPageResultPodProps> = ({searchResultsData}) => {
  // useEffect(() => {
  //   async function checkUser() {
  //     const userData = await getCurrentUser();
  //   }
  //   checkUser();
  // },[]);
  return (
    <>
      {searchResultsData?.map((data, index) => (
        <div
          className="flex flex-col mt-[8px] md:mt-[24px] md:flex-row"
          key={index}
        >
          <div className="w-full h-[292px] relative bg-blue-400 bg-gradient11 rounded-t-[16px] overflow-hidden shrink-0 md:rounded-l-[16px] md:rounded-tr-none md:w-[280px] md:h-[316px] lg:w-[500px] lg:h-[376px]">
            <div className="absolute top-0 left-0 p-[16px] bg-gradient11 w-full h-full lg:p-[24px] flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="flex items-start gap-[8px]">
                  <Link
                    href=""
                    className="w-[64px] h-[64px] p-[4px] rounded-[4px] bg-white"
                  >
                    <Image
                      src="/static/assets/icons/search-result/kent.png"
                      alt="University logo"
                      width={56}
                      height={56}
                      id="uni_img"
                    />
                  </Link>
                  {/* {item.sponsored ? (
                    <div className="bg-grey-100 text-grey-500 uppercase rounded-[4px] px-[8px] xs-small font-semibold">
                      sponsored
                    </div>
                  ) : null} */}
                </div>
                <div className="heart w-[40px] h-[40px] bg-white border border-blue-500 rounded-[24px] flex items-center justify-center cursor-pointer hover:bg-blue-100">
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
              </div>
              <div className="flex flex-col gap-[4px] text-white">
                <div className="h5">{data?.collegeDisplayName}</div>
                <div className="x-small font-semibold">
                  {data?.courseCount} engineering courses
                </div>
                <div className="flex items-center gap-[8px] text-grey-50 small">
                  <div className="flex items-center gap-[4px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                        fill="#0FBEFD"
                      />
                    </svg>
                    {data?.exactRating}
                  </div>
                  <Link href="" className="underline">
                    {data?.reviewCount} reviews
                  </Link>
                </div>
                <div className="flex items-center gap-[4px] font-bold uppercase xs-small">
                  <div className="bg-grey-100 text-grey-500 px-[8px] rounded-[4px]">
                    {data?.adminVenue}
                  </div>
                  <div className="flex items-center justify-center gap-[2px] bg-positive-light text-positive-default px-[8px] rounded-[4px]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.929 10.0711C10.5878 10.4122 9.98482 11.0152 9.41426 11.5858C8.63321 12.3668 7.36696 12.3669 6.58591 11.5859C6.02667 11.0266 5.43232 10.4323 5.07111 10.0711C3.45351 8.45346 3.45351 5.83081 5.07111 4.2132C6.68872 2.5956 9.31137 2.5956 10.929 4.2132C12.5466 5.83081 12.5466 8.45346 10.929 10.0711Z"
                        stroke="#168721"
                        strokeWidth="1.13"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.55335 7.14214C9.55335 8 8.85791 8.69544 8.00005 8.69544C7.14218 8.69544 6.44675 8 6.44675 7.14214C6.44675 6.28427 7.14218 5.58884 8.00005 5.58884C8.85791 5.58884 9.55335 6.28427 9.55335 7.14214Z"
                        stroke="#168721"
                        strokeWidth="1.13"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {data?.distanceInMiles} Miles from you
                  </div>
                </div>
                <Link href="" className="x-small underline">
                  WUSCA rank: {data?.wuscaRanking}
                </Link>
                <div className="flex items-center gap-[4px] font-bold uppercase xs-small">
                  <div className="flex items-center gap-[2px] bg-positive-light text-positive-default px-[8px] rounded-[4px]">
                    <Image
                      src="/static/assets/icons/search-result/lectures-green.svg"
                      alt="Lecturers and Teaching"
                      width={12}
                      height={12}
                    />
                    Lecturers and Teaching
                  </div>
                  <div className="bg-primary-400 px-[8px] rounded-[4px]">
                    + 2 more
                  </div>
                </div>
              </div>
            </div>
            {/* {item.showImage ? (
              <Image
                src="/static/assets/images/search-results/university.jpg"
                alt="University"
                width={500}
                height={376}
                className="w-full h-full rounded-t-[16px] object-cover md:rounded-l-[16px] md:rounded-tr-none"
              />
            ) : null} */}
          </div>
          <div className="flex flex-col">
            <div className="bg-white p-[16px] border border-grey-200 rounded-b-[16px] shadow-custom-3 lg:rounded-tr-[16px] lg:rounded-b-[16px] lg:p-[20px]">
            {data?.review1Text ? 
            <div className="bg-grey-100 p-[12px] rounded-[8px] flex items-center gap-[4px]">
                <div className="text-heading1 relative top-[12px]">“</div>
               
                <div className="flex flex-col gap-[4px]">
                  <Link
                    href=""
                    className="text-primary-400 underline x-small font-semibold"
                  >
                    What students think
                  </Link>
                  
                  <div className="relative x-small">
                    <div className="text-grey300 line-clamp-2">
                      {data?.review1Text}
                    </div>
                    <div className="absolute bottom-0 bg-grey-100 right-0 lg:right-[56px]">
                      <span>... </span>
                      <Link
                        href=""
                        className="text-blue-400 cursor-pointer hover:underline"
                      >
                        Read full review
                      </Link>
                    </div>
                  </div> 
                </div>
              </div>: <></>}
              {data?.bestMatchCoursesList?.map((courseData:any, index:any) => (
                <div key={index}>
                  <div className="border-b-[1px] border-grey-200 -mx-[20px] pt-[20px] mb-[20px]"></div>
                  <div className="flex flex-col gap-[16px]">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-[8px]">
                        <div className="text-primary-400 font-semibold">
                          {courseData?.courseTitle}
                        </div>
                        <div className="flex gap-[4px] text-grey-500">
                          <div className="flex items-center justify-center uppercase gap-[2px] bg-grey-100 rounded-[4px] px-[8px] xs-small font-semibold">
                            <Image
                              className="hidden md:block"
                              src="/static/assets/icons/search-result/calender-grey.svg"
                              alt="Lecturers and Teaching"
                              width={16}
                              height={16}
                            />
                            {courseData?.minUcasPoints}-{courseData?.maxUcasPoints} ucas points
                          </div>
                          <div className="flex items-center justify-center uppercase gap-[2px] bg-grey-100 rounded-[4px] px-[8px] xs-small font-semibold">
                            <Image
                              className="hidden md:block"
                              src="/static/assets/icons/search-result/time-grey.svg"
                              alt="Lecturers and Teaching"
                              width={16}
                              height={16}
                            />
                            {courseData?.availabilityDetails?.duration} {courseData?.availabilityDetails?.studyMode}
                          </div>
                        </div>
                      </div>
                      <div className="heart w-[40px] h-[40px] bg-white border border-primary-400 rounded-[24px] flex items-center justify-center hover:bg-blue-100 hover:cursor-pointer">
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
                    </div>
                    <ClickAndShow>
                      <div className="text-black x-small">
                        <div className="font-semibold">Year 1</div>
                        <ul className="list-disc pl-[20px] flex flex-col gap-[4px]">
                          <li>Becoming a Criminologist</li>
                          <li>Introduction to Law and its Study</li>
                          <li>Social Research in Practice</li>
                          <li>Criminology in Late Modernity</li>
                          <li>Criminal Law</li>
                        </ul>
                      </div>
                    </ClickAndShow>

                    {/* <div
                      className={`grid grid-cols-1 justify-items-stretch gap-[8px] grid-flow-row auto-cols-fr lg:grid-rows-1 lg:grid-flow-col ${
                        chitem.buttonCount == 4
                          ? "md:grid-rows-2 md:grid-flow-col"
                          : "md:grid-cols-1 md:grid-flow-row"
                      }`}
                    >
                      <Getprospectus />
                      <Visitwebsite />
                      <BookOpenDay />
                      <RequestInfo/>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
            {data?.courseCount > 2 ? 
            <Link
              href={`/degree-courses/csearch?subject=&university=${data?.collegeTextKey}`}
              className="flex items-center justify-center gap-[4px] text-primary-400 small font-semibold mt-[16px] hover:underline"
            >
              View {data?.courseCount-2} related courses
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.23798 2.55048C8.55528 2.23317 9.06972 2.23317 9.38702 2.55048L14.262 7.42548C14.5793 7.74278 14.5793 8.25722 14.262 8.57452L9.38702 13.4495C9.06972 13.7668 8.55528 13.7668 8.23798 13.4495C7.92067 13.1322 7.92067 12.6178 8.23798 12.3005L11.726 8.8125L2.3125 8.8125C1.86377 8.8125 1.5 8.44873 1.5 8C1.5 7.55127 1.86377 7.1875 2.3125 7.1875H11.726L8.23798 3.69952C7.92067 3.38222 7.92067 2.86778 8.23798 2.55048Z"
                  fill="#4664DC"
                />
              </svg>
            </Link>
            : <></>}
          </div>
        </div>
      ))}
    </>
  );
};

export default SrPageResultPod;
