"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Accordion from "../accordion/accordion";
import emitter from "@packages/lib/eventEmitter/eventEmitter";
import { useSearchParams } from "next/navigation";
const SearchFilterComponent = () => {
  const searchParams = useSearchParams();
  const body = {
    score: searchParams.get("score"),
    subject: searchParams.get("subject"),
    location: searchParams.get("location"),
    university: searchParams.get("university"),
    "campus-type": searchParams.get("campus-type"),
    "study-mode": searchParams.get("study-mode"),
    "russell-group": searchParams.get("russell-group"),
    "employment-rate-min": searchParams.get("employment-rate-min"),
    "employment-rate-max": searchParams.get("employment-rate-max"),
  };
  const pgs = {
    course: searchParams.get("course"),
    location: searchParams.get("location"),
    university: searchParams.get("university"),
    study_mode: searchParams.get("study_mode"),
    qualification: searchParams.get("qualification"),
  };
  const router = useRouter();
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, SetselectedFilter] = useState<
    null | undefined | string
  >(null);
  useEffect(() => {
    const handleTogglePopup = (eventName: string | null | undefined) => {
      const element = document.getElementById(`#${eventName}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      SetselectedFilter(eventName);
      setIsFilterOpen(true);
      const body = document.body;
      body.classList.add("overflow-y-hidden");
    };
    emitter.on("isfilterOpen", handleTogglePopup);
    return () => {
      emitter.off("isfilterOpen", handleTogglePopup);
    };
  }, [isFilterOpen]);

  const subjectClicked = () => {
    setIsSubjectOpen(!isSubjectOpen);
  };
  const subjectArea = [
    "Agriculture and Related subjects",
    "Architecture, Building, and Planning",
    "Biological and Life Sciences",
    "Business, Commerce and Management",
    "Creative Arts and Design",
    "Education and Teaching",
    "Engineering and Technology",
    "Food and Hospitality",
    "Forensic Sciences",
    "Humanities and the Arts",
    "Languages, Literature and Area Studies",
  ];

  const law = [
    "ALL Biological and Life Sciences",
    "Life sciences",
    "Biology",
    "Biomedical Sciences",
    "Biosciences",
    "Ecology and environmental biology",
  ];

  const [isUniversityOpen, setIsUniversityOpen] = useState(false);
  const universityClicked = () => {
    setIsUniversityOpen(!isUniversityOpen);
  };
  const universities = [
    "Universities A - C",
    "Universities D - H",
    "Universities I - M",
    "Universities N - P",
    "Universities Q - U",
    "Universities V - Z",
  ];

  const universityList = [
    "Aberystwyth University ",
    "Acacia Learning",
    "Academy Of Contemporary Music",
    "Accrington And Rossendale College",
    "Activate Learning",
    "Aecc University College",
    "Al-Maktoum College Of Higher Education",
    "Amersham And Wycombe College",
    "Amity Business School London",
    "Anglia Ruskin University Aru",
    "Architectural Association School Of Architecture",
  ];

  const jsondata = {
    qualificationList: [
      {
        qualCode: "M",
        qualTextKey: "degree",
        selectedFlag: "N",
        qualDisplayDesc: "Undergraduate",
      },
    ],
    studyModeList: [
      {
        studyModeDesc: "Full time",
        studyModeTextKey: "full-time",
        selectedFlag: "N",
      },
    ],
    studyMethodList: [
      {
        studyMethodDesc: "Online",
        studyMethodTextKey: "online",
        selectedFlag: "N",
      },
    ],
    regionList: [
      {
        regionName: "London",
        regionTextKey: "london",
        selectedKey: "N",
      },
      {
        regionName: "England",
        regionTextKey: "england",
        selectedKey: "N",
      },
      {
        regionName: "South East England",
        regionTextKey: "south-east-england",
        selectedKey: "N",
      },
    ],
    uniLocationTypeList: [
      {
        locTypeDesc: "Countryside",
        locTypeTextKey: "countryside",
        selectedFlag: "N",
      },
      {
        locTypeDesc: "Town",
        locTypeTextKey: "town",
        selectedFlag: "N",
      },
    ],
    universityGroupList: [
      {
        universityGroupDesc: "Russel Group",
        universityGroupTextKey: "RG",
        selectedFlag: "N",
      },
    ],

    cityList: [
      {
        cityName: "Manchester",
        cityTextKey: "manchester",
        selectedFlag: "N",
      },
    ],
    intakeYearDetails: {
      intakeYearList: [
        {
          year: 2025,
          selectedFlag: "N",
        },
      ],
      intakeMonthList: [
        {
          month: "Jan",
          selectedFlag: "N",
        },
        {
          month: "Feb",
          selectedFlag: "N",
        },
        {
          month: "Mar",
          selectedFlag: "N",
        },
        {
          month: "Apr",
          selectedFlag: "N",
        },
        {
          month: "Jul",
          selectedFlag: "N",
        },
        {
          month: "Oct",
          selectedFlag: "N",
        },
      ],
      subjectFilterList: [
        {
          categoryCode: "AK.,A,AK.2",
          categoryDesc: "Accounting, Business & Finance",
          selectedFlag: "N",
          parentSubject: "",
          subjectTextKey: "accounting-business-finance",
          qualificationCode: "M",
        },
      ],
    },
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
        SetselectedFilter(null);
        const body = document.body;
        body.classList.remove("overflow-y-hidden");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const closeFilter = () => {
    setIsFilterOpen(false);
    SetselectedFilter(null);
    const body = document.body;
    body.classList.remove("overflow-y-hidden");
  };
  useEffect(() => {
    if (isFilterOpen && filterRef.current) {
      filterRef.current.scrollTop = filterRef.current.scrollHeight;
    }
  }, [isFilterOpen]);
  const ShowResults = () => {
    setIsFilterOpen(false);
  };
  return (
    <>
      <div>
        <div
          className={`fixed top-0 left-0 w-full h-full bg-grey-600 backdrop-blur-custom-1 opacity-[80%] z-10  ${
            isFilterOpen ? "animate-fadeIn block" : "animate-fadeOut hidden"
          }`}
        ></div>

        <div
          className={`bg-white fixed top-0 left-0 w-full h-full z-10 transition-all duration-300 ease-in-out md:w-[768px] ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          ref={filterRef}
        >
          <div className="p-[16px] md:p-[16px_32px_0]">
            <svg
              onClick={closeFilter}
              className="ml-auto mr-[-10px] w-[44px] h-[44px] cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h6 className="h2 mt-[-8px]">Filter</h6>
            <p className="m-[8px_0_24px]">
              Use these filters to narrow down your search options based on your
              preferred criteria 
            </p>
          </div>
          <div className="h-[calc(100%-265px)] overflow-y-auto custom-scrollbar-2 md:h-[calc(100%-230px)]">
            <Accordion
              title="Subject"
              id="#subject"
              defaultOpenStatus={
                selectedFilter === "all" || selectedFilter === "subject"
              }
            >
              {/* subject */}
              <div className="flex flex-col gap-[24px] pt-[24px]">
                <div className="flex flex-col gap-[4px]">
                  <div className="text-para-lg font-semibold">Study Method</div>
                  <div className="x-small font-semibold text-black uppercase">
                    Choose one
                  </div>
                  <div className="flex flex-wrap gap-[8px]">
                    {jsondata?.studyMethodList?.map((items, index) => (
                      <div className="form-black flex relative" key={index + 1}>
                        <input
                          type="checkbox"
                          id="inperson"
                          name="inperson"
                          className="rounded-[4px] outline-none absolute opacity-0"
                        />
                        <label
                          htmlFor="inperson"
                          className="btn btn-black-outline"
                        >
                          {items?.studyMethodTextKey}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="text-para-lg font-semibold">Study mode</div>
                  <div className="x-small font-semibold text-black uppercase">
                    Choose one
                  </div>
                  <div className="flex flex-row flex-wrap gap-[8px]">
                    {jsondata?.studyModeList?.map((items, index) => (
                      <div className="form-black flex relative" key={index + 1}>
                        <input
                          type="checkbox"
                          className="rounded-[4px] outline-none absolute opacity-0"
                          id="Part time"
                        />
                        <label
                          htmlFor="Part time"
                          className="btn btn-black-outline"
                        >
                          {items?.studyModeDesc}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="text-para-lg font-semibold">Study level</div>
                  <div className="x-small font-semibold text-black uppercase">
                    Choose one
                  </div>
                  <div className="flex flex-wrap gap-[8px]">
                    {jsondata?.qualificationList?.map((item, index) => (
                      <div className="form-black flex relative" key={index}>
                        <input
                          type="radio"
                          name="studylevel"
                          id={item?.qualDisplayDesc}
                          value={item?.qualDisplayDesc}
                          className="rounded-[4px] outline-none absolute opacity-0"
                        />
                        <label
                          htmlFor={item?.qualDisplayDesc}
                          className="btn btn-black-outline"
                        >
                          {item?.qualDisplayDesc}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <div className="flex flex-col gap-[4px]">
                    <div className="text-para-lg font-semibold">
                      Subject area
                    </div>
                    <div className="x-small font-semibold text-black uppercase">
                      choose one subject area
                    </div>
                  </div>
                  <div className="bg-white rounded-[22px] p-[11px_12px] border border-grey-300 hover:border-primary-500 md:p-[9px_12px]">
                    <div className="flex item-center gap-[12px]">
                      <Image
                        src="/static/assets/icons/search-result/search-black.svg"
                        width="20"
                        height="20"
                        alt="Search icon"
                      />
                      <input
                        type="text"
                        className="w-full focus:outline-none small text-black placeholder:text-gray-500"
                        aria-label="enter keyword"
                        placeholder="Search subjects"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex flex-col gap-[12px]">
                      {subjectArea.map((item, index) => (
                        <div
                          key={index}
                          onClick={subjectClicked}
                          className="flex items-center gap-[4px] text-blue-400 small font-semibold cursor-pointer hover:underline"
                        >
                          {item}
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.48037 14.6192C3.97269 14.1116 3.97269 13.2884 4.48037 12.7808L8.76113 8.5L4.48037 4.21924C3.97269 3.71156 3.97269 2.88844 4.48037 2.38076C4.98805 1.87308 5.81117 1.87308 6.31885 2.38076L11.5188 7.58076C12.0265 8.08844 12.0265 8.91156 11.5188 9.41924L6.31885 14.6192C5.81117 15.1269 4.98805 15.1269 4.48037 14.6192Z"
                              fill="#4664DC"
                            />
                          </svg>
                        </div>
                      ))}
                    </div>
                    {isSubjectOpen && (
                      <div
                        className={`bg-white absolute top-0 left-0 w-full h-full z-10 transition-all duration-300 ease-in-out ${
                          isSubjectOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                      >
                        <div className="flex flex-col gap-[16px]">
                          <ul className="flex flex-wrap gap-[8px] uppercase">
                            <li className="bg-secondary-50 text-blue-500 whitespace-nowrap rounded-[4px] px-[10px] py-[3px] font-semibold x-small">
                              Business LAw
                            </li>
                            <li className="bg-secondary-50 text-blue-500 whitespace-nowrap rounded-[4px] px-[10px] py-[3px] font-semibold x-small">
                              Child Law
                            </li>
                            <li className="bg-secondary-50 text-blue-500 whitespace-nowrap rounded-[4px] px-[10px] py-[3px] font-semibold x-small flex items-center gap-[2px]">
                              Educational Law
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 12L12 4M4 4L12 12"
                                  stroke="#3460DC"
                                  strokeWidth="1.13"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </li>
                            <li className="bg-secondary-50 text-blue-500 whitespace-nowrap rounded-[4px] px-[10px] py-[3px] font-semibold x-small flex items-center gap-[2px]">
                              Full time
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 12L12 4M4 4L12 12"
                                  stroke="#3460DC"
                                  strokeWidth="1.13"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </li>
                            <li className="bg-secondary-50 text-blue-500 whitespace-nowrap rounded-[4px] px-[10px] py-[3px] font-semibold x-small flex items-center gap-[2px]">
                              Full time
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 12L12 4M4 4L12 12"
                                  stroke="#3460DC"
                                  strokeWidth="1.13"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </li>
                            <li className="bg-secondary-50 text-blue-500 whitespace-nowrap rounded-[4px] px-[10px] py-[3px] font-semibold x-small flex items-center gap-[2px]">
                              South East England
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 12L12 4M4 4L12 12"
                                  stroke="#3460DC"
                                  strokeWidth="1.13"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </li>
                            <li className="bg-secondary-50 text-blue-500 whitespace-nowrap rounded-[4px] px-[4px]  font-semibold x-small flex items-center gap-[2px]">
                              <Link href="" aria-label="Back Arrow">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9 11L6 8L9 5"
                                    stroke="#3460DC"
                                    strokeWidth="1.13"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </Link>
                            </li>
                          </ul>
                          <div className="flex flex-col gap-[12px] max-h-[255px] overflow-y-auto custom-scrollbar-2">
                            <div
                              onClick={subjectClicked}
                              className="flex items-center gap-[4px] text-blue-400 font-semibold cursor-pointer"
                            >
                              <svg
                                className="rotate-180"
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.48037 14.6192C3.97269 14.1116 3.97269 13.2884 4.48037 12.7808L8.76113 8.5L4.48037 4.21924C3.97269 3.71156 3.97269 2.88844 4.48037 2.38076C4.98805 1.87308 5.81117 1.87308 6.31885 2.38076L11.5188 7.58076C12.0265 8.08844 12.0265 8.91156 11.5188 9.41924L6.31885 14.6192C5.81117 15.1269 4.98805 15.1269 4.48037 14.6192Z"
                                  fill="#4664DC"
                                />
                              </svg>
                              Choose a different subject
                            </div>
                            <div className="flex flex-col gap-[12px]">
                              <div className="small font-bold">Law</div>
                              <div className="flex flex-col gap-[12px]">
                                {law.map((item, index) => (
                                  <div
                                    className="form_check relative"
                                    key={index}
                                  >
                                    <div className="flex items-start gap-[8px]">
                                      <div className="checkbox_card">
                                        <input
                                          type="checkbox"
                                          className="form-checkbox hidden"
                                          id={item}
                                        />
                                        <label
                                          htmlFor={item}
                                          className="flex justify-center items-center w-[16px] h-[16px] rounded-[3px] border-2 border-grey-600 my-[2px] group-checked:bg-primary-400"
                                        >
                                          <svg
                                            width="10"
                                            height="8"
                                            viewBox="0 0 10 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M9.2534 0.723569C9.40607 0.863517 9.41638 1.10073 9.27643 1.2534L3.77643 7.2534C3.70732 7.3288 3.6104 7.37269 3.50815 7.37491C3.40589 7.37714 3.30716 7.33749 3.23483 7.26517L0.734835 4.76517C0.588388 4.61872 0.588388 4.38128 0.734835 4.23484C0.881282 4.08839 1.11872 4.08839 1.26517 4.23484L3.48822 6.45789L8.72357 0.746605C8.86351 0.593936 9.10073 0.583622 9.2534 0.723569Z"
                                              fill="white"
                                              stroke="white"
                                              strokeWidth="0.666667"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </label>
                                      </div>
                                      <label
                                        htmlFor={item}
                                        className="check-label small font-normal text-grey300 w-[calc(100%_-_28px)]"
                                      >
                                        {item}
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Accordion>
            <Accordion
              id="#year"
              title="Intake year"
              defaultOpenStatus={selectedFilter === "year" ? true : false}
            >
              {/* intake */}
              <div className="flex flex-col gap-[8px] p-[8px_0_0]">
                <div className="x-small font-semibold text-black uppercase">
                  Choose YEAR & MONTH
                </div>
                <div className="flex flex-wrap gap-x-[4px] gap-y-[8px]">
                  {jsondata?.intakeYearDetails?.intakeYearList?.map(
                    (item, index) => (
                      <div className="form-black flex relative" key={index}>
                        <input
                          type="radio"
                          name="2024"
                          className="rounded-[4px] outline-none absolute opacity-0"
                          id={`${item?.year}`}
                        />
                        <label
                          htmlFor={`${item?.year}`}
                          className="btn btn-black-outline"
                        >
                          {item?.year}
                        </label>
                      </div>
                    )
                  )}
                </div>
                <div className="flex flex-wrap gap-x-[4px] gap-y-[8px]">
                  {jsondata?.intakeYearDetails?.intakeMonthList?.map(
                    (item, index) => (
                      <div className="form-black flex relative" key={index}>
                        <input
                          type="radio"
                          name="All Months"
                          className="rounded-[4px] outline-none absolute opacity-0"
                          id={item?.month}
                        />
                        <label
                          htmlFor={item?.month}
                          className="btn btn-black-outline min-w-[53px] py-[5px]"
                        >
                          {item?.month}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </Accordion>
            <Accordion
              title="University"
              id="#university"
              defaultOpenStatus={selectedFilter === "university" ? true : false}
            >
              <div className="flex flex-col gap-[16px] pt-[24px]">
                <div className="flex flex-col gap-[4px]">
                  <div className="text-para-lg font-semibold">
                    Find a university
                  </div>
                  <div className="x-small font-semibold text-black uppercase">
                    Choose one
                  </div>
                </div>
                <div className="bg-white rounded-[22px] p-[11px_12px] border border-grey-300 hover:border-primary-500 md:p-[9px_12px]">
                  <div className="flex item-center gap-[12px]">
                    <Image
                      src="/static/assets/icons/search-result/search-black.svg"
                      width="20"
                      height="20"
                      alt="Search icon"
                    />
                    <input
                      type="text"
                      className="w-full focus:outline-none small text-black placeholder:text-gray-500"
                      aria-label="enter keyword"
                      placeholder="Search universities"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex flex-col gap-[12px]">
                    {universities.map((item, index) => (
                      <div
                        key={index}
                        onClick={universityClicked}
                        className="flex items-center gap-[4px] text-blue-400 small font-semibold cursor-pointer hover:underline"
                      >
                        {item}
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.48037 14.6192C3.97269 14.1116 3.97269 13.2884 4.48037 12.7808L8.76113 8.5L4.48037 4.21924C3.97269 3.71156 3.97269 2.88844 4.48037 2.38076C4.98805 1.87308 5.81117 1.87308 6.31885 2.38076L11.5188 7.58076C12.0265 8.08844 12.0265 8.91156 11.5188 9.41924L6.31885 14.6192C5.81117 15.1269 4.98805 15.1269 4.48037 14.6192Z"
                            fill="#4664DC"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                  {isUniversityOpen && (
                    <div
                      className={`bg-white absolute top-0 left-0 w-full  z-10 transition-all duration-300 ease-in-out ${
                        isUniversityOpen ? "translate-x-0" : "-translate-x-full"
                      }`}
                    >
                      <div className="flex flex-col gap-[16px]">
                        <ul className="flex flex-wrap gap-[8px] uppercase">
                          <li className="bg-secondary-50 text-blue-500 whitespace-nowrap rounded-[4px] px-[10px] py-[3px] font-semibold x-small">
                            University of Aberdeen
                          </li>
                        </ul>
                        <div className="flex flex-col gap-[12px] h-[246px] overflow-y-auto custom-scrollbar-2">
                          <div
                            onClick={universityClicked}
                            className="flex items-center gap-[4px] text-blue-400 font-semibold cursor-pointer"
                          >
                            <svg
                              className="rotate-180"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.48037 14.6192C3.97269 14.1116 3.97269 13.2884 4.48037 12.7808L8.76113 8.5L4.48037 4.21924C3.97269 3.71156 3.97269 2.88844 4.48037 2.38076C4.98805 1.87308 5.81117 1.87308 6.31885 2.38076L11.5188 7.58076C12.0265 8.08844 12.0265 8.91156 11.5188 9.41924L6.31885 14.6192C5.81117 15.1269 4.98805 15.1269 4.48037 14.6192Z"
                                fill="#4664DC"
                              />
                            </svg>
                            Choose a different uni
                          </div>
                          <div className="flex flex-col gap-[12px]">
                            <div className="small font-bold">A - C</div>
                            <div className="flex flex-col gap-[12px]">
                              {universityList.map((item, index) => (
                                <div
                                  className="form_check relative"
                                  key={index}
                                >
                                  <div className="flex items-start gap-[8px]">
                                    <div className="checkbox_card">
                                      <input
                                        type="checkbox"
                                        className="form-checkbox hidden"
                                        id={item}
                                      />
                                      <label
                                        htmlFor={item}
                                        className="flex justify-center items-center w-[16px] h-[16px] rounded-[3px] border-2 border-grey-600 my-[2px] group-checked:bg-primary-400"
                                      >
                                        <svg
                                          width="10"
                                          height="8"
                                          viewBox="0 0 10 8"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.2534 0.723569C9.40607 0.863517 9.41638 1.10073 9.27643 1.2534L3.77643 7.2534C3.70732 7.3288 3.6104 7.37269 3.50815 7.37491C3.40589 7.37714 3.30716 7.33749 3.23483 7.26517L0.734835 4.76517C0.588388 4.61872 0.588388 4.38128 0.734835 4.23484C0.881282 4.08839 1.11872 4.08839 1.26517 4.23484L3.48822 6.45789L8.72357 0.746605C8.86351 0.593936 9.10073 0.583622 9.2534 0.723569Z"
                                            fill="white"
                                            stroke="white"
                                            strokeWidth="0.666667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </label>
                                    </div>
                                    <label
                                      htmlFor={item}
                                      className="check-label small font-normal text-grey300 w-[calc(100%_-_28px)]"
                                    >
                                      {item}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {isUniversityOpen && ( // Placeholder div
                    <div className="h-[100px]"></div> // Height matches expected content height
                  )}
                </div>
              </div>
            </Accordion>

            <Accordion
              title="Location"
              id="#location"
              defaultOpenStatus={selectedFilter === "location" ? true : false}
            >
              {/* location */}
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[8px] pt-[24px]">
                  <div className="font-semibold">Distance from home</div>
                  <div className="flex flex-col gap-[16px]">
                    <div className="bg-white rounded-[24px] w-full p-[16px] border border-grey-200 hover:border-primary-500 shadow-custom-1 md:rounded-[32px] md:pl-[24px] md:p-[4px] md:w-[508px]">
                      <div className="flex flex-col gap-[24px] small md:flex-row md:items-center md:gap-[10px]">
                        <div className="relative shrink-0">
                          <button
                            className="w-full flex items-center justify-between gap-[4px] pr-0 text-black md:w-[146px] md:pr-[16  px]"
                            type="button"
                          >
                            Range: 50 Miles
                            <Image
                              src="/static/assets/icons/arrow_down_black.svg"
                              width="20"
                              height="20"
                              alt="Search icon"
                            />
                          </button>
                        </div>
                        <div className="w-full grow border-y-[1px] border-grey-200 md:border-l md:border-y-0">
                          <input
                            type="text"
                            className="w-full focus:outline-none text-black placeholder:text-gray-500 px-[0] py-[24px] md:px-[16px] md:py-[0px]"
                            aria-label="submenu"
                            placeholder="Enter Postcode"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary flex items-center justify-center gap-[6px] px-[24px] py-[7px] md:min-w-[114px] md:w-[130px]"
                        >
                          <Image
                            src="/static/assets/icons/search_icon.svg"
                            width="18"
                            height="18"
                            alt="Search icon"
                          />
                          Search
                        </button>
                      </div>
                    </div>
                    {/* <p className="small text-negative-default">
                    Please enter subject
                  </p> */}
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3137 12.8137C11.5923 13.5351 10.1389 14.9886 9.04085 16.0866C8.2598 16.8676 6.99496 16.8675 6.21391 16.0865C5.13566 15.0082 3.70908 13.5817 2.94113 12.8137C0.352958 10.2255 0.352958 6.02929 2.94113 3.44113C5.52929 0.852958 9.72554 0.852958 12.3137 3.44113C14.9019 6.02929 14.9019 10.2255 12.3137 12.8137Z"
                        stroke="#4664DC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.1127 8.12742C10.1127 9.5 9 10.6127 7.62742 10.6127C6.25484 10.6127 5.14214 9.5 5.14214 8.12742C5.14214 6.75483 6.25484 5.64214 7.62742 5.64214C9 5.64214 10.1127 6.75483 10.1127 8.12742Z"
                        stroke="#4664DC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <Link
                      href=""
                      className="small text-blue-400 hover:underline"
                    >
                      Use current location
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="text-para-lg font-semibold">Region</div>
                  <div className="x-small font-semibold text-black uppercase">
                    Choose one or more
                  </div>
                  <ul className="pt-[12px]">
                    <li>
                      <div className="form_check relative m-[0_0_12px]">
                        <div className="flex items-start gap-[8px]">
                          <div className="checkbox_card">
                            <input
                              type="checkbox"
                              className="form-checkbox hidden"
                              id="All Uk"
                              name="All Uk"
                            />
                            <label
                              htmlFor="All Uk"
                              className="flex justify-center items-center w-[16px] h-[16px] rounded-[3px] border-2 border-grey-600 my-[2px] group-checked:bg-primary-400"
                            >
                              <svg
                                width="10"
                                height="8"
                                viewBox="0 0 10 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.2534 0.723569C9.40607 0.863517 9.41638 1.10073 9.27643 1.2534L3.77643 7.2534C3.70732 7.3288 3.6104 7.37269 3.50815 7.37491C3.40589 7.37714 3.30716 7.33749 3.23483 7.26517L0.734835 4.76517C0.588388 4.61872 0.588388 4.38128 0.734835 4.23484C0.881282 4.08839 1.11872 4.08839 1.26517 4.23484L3.48822 6.45789L8.72357 0.746605C8.86351 0.593936 9.10073 0.583622 9.2534 0.723569Z"
                                  fill="white"
                                  stroke="white"
                                  strokeWidth="0.666667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </label>
                          </div>
                          <label
                            htmlFor="All Uk"
                            className="check-label small font-normal text-grey300 w-[calc(100%_-_28px)]"
                          >
                            All Uk
                          </label>
                        </div>
                      </div>
                      <ul>
                        <li>
                          {jsondata?.regionList?.map((item, index) => (
                            <div key={index}>
                              <div className="form_check relative m-[0_0_12px_24px]">
                                <div className="flex items-start gap-[8px]">
                                  <div className="checkbox_card">
                                    <input
                                      type="checkbox"
                                      className="form-checkbox hidden"
                                      id={item?.regionName}
                                      name={item?.regionName}
                                    />
                                    <label
                                      htmlFor={item?.regionName}
                                      className="flex justify-center items-center w-[16px] h-[16px] rounded-[3px] border-2 border-grey-600 my-[2px] group-checked:bg-primary-400"
                                    >
                                      <svg
                                        width="10"
                                        height="8"
                                        viewBox="0 0 10 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M9.2534 0.723569C9.40607 0.863517 9.41638 1.10073 9.27643 1.2534L3.77643 7.2534C3.70732 7.3288 3.6104 7.37269 3.50815 7.37491C3.40589 7.37714 3.30716 7.33749 3.23483 7.26517L0.734835 4.76517C0.588388 4.61872 0.588388 4.38128 0.734835 4.23484C0.881282 4.08839 1.11872 4.08839 1.26517 4.23484L3.48822 6.45789L8.72357 0.746605C8.86351 0.593936 9.10073 0.583622 9.2534 0.723569Z"
                                          fill="white"
                                          stroke="white"
                                          strokeWidth="0.666667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </label>
                                  </div>
                                  <label
                                    htmlFor={item?.regionName}
                                    className="check-label small font-normal text-grey300 w-[calc(100%_-_28px)]"
                                  >
                                    {item?.regionName}
                                  </label>
                                </div>
                              </div>
                              {/* <ul>
                                {index == 0 && (
                                  <li className="grid grid-flow-row md:grid-rows-8 md:grid-flow-col">
                                    {region.map((item, index) => (
                                      <div
                                        className="form_check relative m-[0_0_12px_40px]"
                                        key={index}
                                      >
                                        <div className="flex items-start gap-[8px]">
                                          <div className="checkbox_card">
                                            <input
                                              type="checkbox"
                                              className="form-checkbox hidden"
                                              id={item}
                                            />
                                            <label
                                              htmlFor={item}
                                              className="flex justify-center items-center w-[16px] h-[16px] rounded-[3px] border-2 border-grey-600 my-[2px] group-checked:bg-primary-400"
                                            >
                                              <svg
                                                width="10"
                                                height="8"
                                                viewBox="0 0 10 8"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M9.2534 0.723569C9.40607 0.863517 9.41638 1.10073 9.27643 1.2534L3.77643 7.2534C3.70732 7.3288 3.6104 7.37269 3.50815 7.37491C3.40589 7.37714 3.30716 7.33749 3.23483 7.26517L0.734835 4.76517C0.588388 4.61872 0.588388 4.38128 0.734835 4.23484C0.881282 4.08839 1.11872 4.08839 1.26517 4.23484L3.48822 6.45789L8.72357 0.746605C8.86351 0.593936 9.10073 0.583622 9.2534 0.723569Z"
                                                  fill="white"
                                                  stroke="white"
                                                  strokeWidth="0.666667"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </label>
                                          </div>
                                          <label
                                            htmlFor={item}
                                            className="check-label small font-normal text-grey300 w-[calc(100%_-_28px)]"
                                          >
                                            {item}
                                          </label>
                                        </div>
                                      </div>
                                    ))}
                                  </li>
                                )}
                              </ul> */}
                            </div>
                          ))}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="text-para-lg font-semibold">City</div>
                  <div className="x-small font-semibold text-black uppercase">
                    Choose one or more
                  </div>
                  <div className="grid grid-flow-row gap-[12px] md:grid-flow-col md:grid-rows-11 ">
                    {jsondata?.cityList?.map((item, index) => (
                      <div className="form_check relative" key={index}>
                        <div className="flex items-start gap-[8px]">
                          <div className="checkbox_card">
                            <input
                              type="checkbox"
                              className="form-checkbox hidden"
                              id={item?.cityName}
                            />
                            <label
                              htmlFor={item?.cityName}
                              className="flex justify-center items-center w-[16px] h-[16px] rounded-[3px] border-2 border-grey-600 my-[2px] group-checked:bg-primary-400"
                            >
                              <svg
                                width="10"
                                height="8"
                                viewBox="0 0 10 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.2534 0.723569C9.40607 0.863517 9.41638 1.10073 9.27643 1.2534L3.77643 7.2534C3.70732 7.3288 3.6104 7.37269 3.50815 7.37491C3.40589 7.37714 3.30716 7.33749 3.23483 7.26517L0.734835 4.76517C0.588388 4.61872 0.588388 4.38128 0.734835 4.23484C0.881282 4.08839 1.11872 4.08839 1.26517 4.23484L3.48822 6.45789L8.72357 0.746605C8.86351 0.593936 9.10073 0.583622 9.2534 0.723569Z"
                                  fill="white"
                                  stroke="white"
                                  strokeWidth="0.666667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </label>
                          </div>
                          <label
                            htmlFor={item?.cityName}
                            className="check-label small font-normal text-grey300 w-[calc(100%_-_28px)]"
                          >
                            {item?.cityName}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="text-para-lg font-semibold">
                    Location type
                  </div>
                  <div className="x-small font-semibold text-black uppercase">
                    Choose one or more
                  </div>
                  <div className="flex items-center gap-[8px]">
                    {jsondata?.uniLocationTypeList?.map((item, index) => (
                      <div className="form-black flex relative" key={index}>
                        <input
                          // defaultValue={"Countryside"}
                          type="checkbox"
                          name="Countryside"
                          className="rounded-[4px] outline-none absolute opacity-0"
                          id={item?.locTypeDesc}
                          value={item?.locTypeDesc}
                        />
                        <label
                          htmlFor={item?.locTypeDesc}
                          className="btn btn-black-outline"
                        >
                          {item?.locTypeDesc}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Accordion>
            <Accordion title="University group" defaultOpenStatus={false}>
              <div className="flex flex-col gap-[8px] pt-[24px]">
                <div className="x-small font-semibold text-black uppercase">
                  Choose one or more
                </div>
                <div className="flex flex-col gap-[12px]">
                  {jsondata?.universityGroupList?.map((item, index) => (
                    <div className="form_check relative" key={index}>
                      <div className="flex items-start gap-[8px]">
                        <div className="checkbox_card">
                          <input
                            type="checkbox"
                            className="form-checkbox hidden"
                            id={item?.universityGroupDesc}
                          />
                          <label
                            htmlFor={item?.universityGroupDesc}
                            className="flex justify-center items-center w-[16px] h-[16px] rounded-[3px] border-2 border-grey-600 my-[2px] group-checked:bg-primary-400"
                          >
                            <svg
                              width="10"
                              height="8"
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.2534 0.723569C9.40607 0.863517 9.41638 1.10073 9.27643 1.2534L3.77643 7.2534C3.70732 7.3288 3.6104 7.37269 3.50815 7.37491C3.40589 7.37714 3.30716 7.33749 3.23483 7.26517L0.734835 4.76517C0.588388 4.61872 0.588388 4.38128 0.734835 4.23484C0.881282 4.08839 1.11872 4.08839 1.26517 4.23484L3.48822 6.45789L8.72357 0.746605C8.86351 0.593936 9.10073 0.583622 9.2534 0.723569Z"
                                fill="white"
                                stroke="white"
                                strokeWidth="0.666667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </label>
                        </div>
                        <label
                          htmlFor={item?.universityGroupDesc}
                          className="check-label small font-normal text-grey300 w-[calc(100%_-_28px)]"
                        >
                          {item?.universityGroupDesc}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Accordion>
          </div>

          <div className="flex justify-between gap-[8px] p-[16px] fixed w-full bottom-0 shadow-custom-10 bg-white md:p-[16px_32px] md:w-[768px]">
            <Link
              href={`/degree-courses/search`}
              aria-label="reset filters"
              className="text-primary-400 font-semibold py-[10px] px-[16px] text-center hover:underline"
            >
              Clear
            </Link>
            <button
              className="bg-primary-400 w-fit text-white rounded-[24px] py-[10px] px-[16px] font-semibold hover:bg-primary-500 md:w-[344px]"
              onClick={ShowResults}
            >
              Show all 0 results
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilterComponent;
