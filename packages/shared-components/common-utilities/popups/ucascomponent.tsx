import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UcasComponentSkeleton from "../components/skeleton/ucascomponentskeleton";

const UcasComponent = ({ onClose, isUcasOpen }: any) => {
  const levels = ["A*", "A", "B", "C", "D", "E"];
  const grades = [
    "A*A*",
    "A*A",
    "AA",
    "AB",
    "BB",
    "BC",
    "CC",
    "CD",
    "DD",
    "DE",
    "EE",
  ];
  const items = [
    "0 credits",
    "1 credits",
    "2 credits",
    "3 credits",
    "4 credits",
    "5 credits",
    "6 credits",
    "7 credits",
    "8 credits",
    "9 credits",
    "10 credits",
    "11 credits",
    "12 credits",
    "13 credits",
    "14 credits",
    "15 credits",
    "16 credits",
    "17 credits",
    "18 credits",
    "19 credits",
    "20 credits",
  ];

  const [isUcasPopupOpen, setIsUcasPopupOpen] = useState(false);

  const ucasHandleClose = () => {
    onClose();
    setIsUcasPopupOpen(!isUcasPopupOpen);
  };

  // UCAS dropdown actions
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [selectedLevelName, setselectedLevelName] = useState("ALEVEL");
  const [selectedLevelDesc, setselectedLevelDesc] = useState("A Level");
  const ucasLevelSelected = (actionName: string, actionDesc: string) => {
    setIsDropdownOpen(false);
    setselectedLevelName(actionName);
    setselectedLevelDesc(actionDesc);
  };

  // count actions
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  // add qualification actions
  const [isAddQualification, setIsAddQualification] = useState(false);
  const addClick = () => {
    setIsAddQualification(!isAddQualification);
  };

  // add qualification dropdown actions
  const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false);
  const toggleSecondDropdown = () => {
    setIsSecondDropdownOpen(!isSecondDropdownOpen);
  };

  const [addSelectedLevelName, setAddSelectedLevelName] = useState("");
  const [addSelectedLevelDesc, setAddSelectedLevelDesc] =
    useState("Please select");
  const addLevelSelected = (actionName: string, actionDesc: string) => {
    setIsSecondDropdownOpen(false);
    setAddSelectedLevelName(actionName);
    setAddSelectedLevelDesc(actionDesc);
  };

  // delete actions
  const deleteClicked = () => {
    setIsAddQualification(!isAddQualification);
  };

  // Access to HE Diploma dropdown actions
  const [isDistinctionDropdownOpen, setIsDistinctionDropdownOpen] =
    useState(false);
  const [isMeritDropdownOpen, setIsMeritDropdownOpen] = useState(false);
  const [isPassDropdownOpen, setIsPassDropdownOpen] = useState(false);

  const toggleDistinctionDropdown = () => {
    setIsDistinctionDropdownOpen(!isDistinctionDropdownOpen);
  };

  const toggleMeritDropdown = () => {
    setIsMeritDropdownOpen(!isMeritDropdownOpen);
  };

  const togglePassDropdown = () => {
    setIsPassDropdownOpen(!isPassDropdownOpen);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-grey-600 backdrop-blur-custom-1 opacity-[80%] z-10  ${
          isUcasOpen ? "animate-fadeIn block" : "animate-fadeOut hidden"
        }`}
      ></div>

      <div
        className={`bg-white fixed top-0 left-0 h-full w-[375px] z-10 transition-all duration-300 ease-in-out ${
          isUcasOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-[16px]">
          <svg
            onClick={ucasHandleClose}
            className="ml-auto cursor-pointer"
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
          <h6 className="text-heading5 font-bold mt-[-8px]">
            Calculate your UCAS points
          </h6>
        </div>

        <div className="flex flex-col gap-[32px] h-[calc(100%-210px)] overflow-y-auto custom-scrollbar-2">
          <div className="flex flex-col gap-[16px] px-[16px] pb-[32px]">
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="border border-grey300 text-grey300 rounded-[20px] flex items-center justify-center gap-[4px] p-[8px] font-semibold small cursor-pointer"
              >
                <span>{selectedLevelDesc}</span>
                <Image
                  src="/assets/icons/ucas-down-arrow.svg"
                  alt=""
                  width="16"
                  height="16"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute top-[46px] left-0 max-h-[343px] overflow-y-auto w-full bg-white border border-neutral-300 rounded-[8px] small shadow-custom-9 custom-scrollbar-2 z-10">
                  <ul>
                    <li className="py-[10px] px-[16px] font-semibold x-small uppercase bg-neutral50 text-grey500 tracking-[1px]">
                      A Levels
                    </li>
                    <li
                      onClick={() => ucasLevelSelected("ALEVEL", "A Level")}
                      className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                    >
                      A Level
                    </li>
                    <li
                      onClick={() => ucasLevelSelected("ASLEVEL", "AS Level")}
                      className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                    >
                      AS Level
                    </li>
                    <li
                      onClick={() =>
                        ucasLevelSelected(
                          "ALEVELDOUBLE",
                          "A Level Double Award"
                        )
                      }
                      className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                    >
                      A Level Double Award
                    </li>
                    <li
                      onClick={() =>
                        ucasLevelSelected(
                          "ASLEVELDOUBLE",
                          "AS Level Double Award"
                        )
                      }
                      className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                    >
                      AS Level Double Award
                    </li>
                    <li className="py-[10px] px-[16px] font-semibold x-small uppercase bg-neutral50 text-grey500 tracking-[1px]">
                      International baccalaureate (DiplomA)
                    </li>
                    <li
                      onClick={() =>
                        ucasLevelSelected("IB", "IB (Diploma) Higher level")
                      }
                      className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                    >
                      IB (Diploma) Higher level
                    </li>
                    <li
                      onClick={() =>
                        ucasLevelSelected("IB", "IB (Diploma) Higher level")
                      }
                      className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                    >
                      IB (Diploma) Standard Level
                    </li>
                    <li
                      onClick={() =>
                        ucasLevelSelected("UCAS", "UCAS Tariff Points")
                      }
                      className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                    >
                      UCAS Tariff Points
                    </li>
                    <li
                      onClick={() =>
                        ucasLevelSelected("ACCESS", "Access to HE Diploma")
                      }
                      className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                    >
                      Access to HE Diploma
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {selectedLevelName == "ALEVEL" && (
              <div className="flex items-center justify-between gap-[32px] flex-wrap">
                {levels.map((item, index) => (
                  <div
                    key={index + 1}
                    className="inline-flex items-center gap-[4px]"
                  >
                    <label
                      htmlFor="grade"
                      className="min-w-[24px] font-semibold block text-grey300"
                    >
                      {item}
                    </label>
                    <button
                      aria-label="decrement"
                      onClick={decrement}
                      className={`${
                        count ? "decrease cursor-pointer" : "cursor-not-allowed"
                      }`}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.0002 36.6667C29.2049 36.6667 36.6668 29.2048 36.6668 20C36.6668 10.7953 29.2049 3.33337 20.0002 3.33337C10.7954 3.33337 3.3335 10.7953 3.3335 20C3.3335 29.2048 10.7954 36.6667 20.0002 36.6667Z"
                          stroke="#ADB2B6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.3335 20H26.6668"
                          stroke="#ADB2B6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <span className="text-grey300 min-w-[24px] block text-center">
                      {count}
                    </span>
                    <button aria-label="increment" onClick={increment}>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.0002 36.6667C29.2049 36.6667 36.6668 29.2048 36.6668 20C36.6668 10.7953 29.2049 3.33337 20.0002 3.33337C10.7954 3.33337 3.3335 10.7953 3.3335 20C3.3335 29.2048 10.7954 36.6667 20.0002 36.6667Z"
                          stroke="#4664DC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 13.3334V26.6667"
                          stroke="#4664DC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.3335 20H26.6668"
                          stroke="#4664DC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedLevelName == "ASLEVEL" && (
              <div className="flex items-center justify-between gap-[32px] flex-wrap">
                {levels.map((item, index) => (
                  <div
                    key={index + 1}
                    className="inline-flex items-center gap-[4px]"
                  >
                    <label
                      htmlFor="grade"
                      className="min-w-[24px] font-semibold block text-grey300"
                    >
                      {item}
                    </label>
                    <button
                      aria-label="decrement"
                      onClick={decrement}
                      className={`${
                        count ? "decrease cursor-pointer" : "cursor-not-allowed"
                      }`}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.0002 36.6667C29.2049 36.6667 36.6668 29.2048 36.6668 20C36.6668 10.7953 29.2049 3.33337 20.0002 3.33337C10.7954 3.33337 3.3335 10.7953 3.3335 20C3.3335 29.2048 10.7954 36.6667 20.0002 36.6667Z"
                          stroke="#ADB2B6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.3335 20H26.6668"
                          stroke="#ADB2B6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <span className="text-grey300 min-w-[24px] block text-center">
                      {count}
                    </span>
                    <button aria-label="increment" onClick={increment}>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.0002 36.6667C29.2049 36.6667 36.6668 29.2048 36.6668 20C36.6668 10.7953 29.2049 3.33337 20.0002 3.33337C10.7954 3.33337 3.3335 10.7953 3.3335 20C3.3335 29.2048 10.7954 36.6667 20.0002 36.6667Z"
                          stroke="#4664DC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 13.3334V26.6667"
                          stroke="#4664DC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.3335 20H26.6668"
                          stroke="#4664DC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedLevelName == "ALEVELDOUBLE" && (
              <div className="flex items-center gap-[8px] flex-wrap cursor-pointer">
                {grades.map((item, index) => (
                  <Link
                    key={index + 1}
                    href="#"
                    className="min-w-[66px] text-center small bg-white border border-primary-400 text-primary-400 py-[8px] px-[16px] rounded-[20px] block font-semibold hover:bg-primary-400 hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}

            {selectedLevelName == "UCAS" && (
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[4px] small">
                  <label htmlFor="minpoint" className="font-semibold">
                    Minimum points
                  </label>
                  <input
                    type="text"
                    id=""
                    placeholder="Enter UCAS points"
                    className="block rounded-[8px] min-h-[44px] border border-grey-500 py-[12px] px-[10px]"
                  />
                </div>
                <div className="flex flex-col gap-[4px] small">
                  <label htmlFor="minpoint" className="font-semibold">
                    Maximum points
                  </label>
                  <input
                    type="text"
                    id=""
                    placeholder="Enter UCAS points"
                    className="block rounded-[8px] min-h-[44px] border border-grey-500 py-[12px] px-[10px]"
                  />
                </div>
              </div>
            )}

            {selectedLevelName == "ACCESS" && (
              <>
                <div className="flex flex-col gap-[16px]">
                  <div className="flex flex-col gap-[16px] max-w-[200px]">
                    <div className="flex flex-col gap-[4px] small">
                      <label htmlFor="Distinction" className="font-semibold">
                        Distinction
                      </label>
                      <div className="relative">
                        <div
                          onClick={toggleDistinctionDropdown}
                          className="border border-grey300 text-grey300 rounded-[20px] flex items-center justify-center gap-[4px] p-[8px] font-semibold small cursor-pointer"
                        >
                          <span>0 credits</span>
                          <Image
                            src="/assets/icons/ucas-down-arrow.svg"
                            alt=""
                            width="16"
                            height="16"
                          />
                        </div>
                        {isDistinctionDropdownOpen && (
                          <div className="absolute top-[46px] left-0 max-h-[343px] overflow-y-auto w-full bg-white border border-neutral-300 rounded-[8px] small shadow-custom-9 custom-scrollbar-2 z-10">
                            <ul>
                              {items.map((item, index) => (
                                <li
                                  key={index}
                                  className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-[4px] small">
                      <label htmlFor="Merit" className="font-semibold">
                        Merit
                      </label>
                      <div className="relative">
                        <div
                          onClick={toggleMeritDropdown}
                          className="border border-grey300 text-grey300 rounded-[20px] flex items-center justify-center gap-[4px] p-[8px] font-semibold small cursor-pointer"
                        >
                          <span>0 credits</span>
                          <Image
                            src="/assets/icons/ucas-down-arrow.svg"
                            alt=""
                            width="16"
                            height="16"
                          />
                        </div>
                        {isMeritDropdownOpen && (
                          <div className="absolute top-[46px] left-0 max-h-[343px] overflow-y-auto w-full bg-white border border-neutral-300 rounded-[8px] small shadow-custom-9 custom-scrollbar-2 z-10">
                            <ul>
                              {items.map((item, index) => (
                                <li
                                  key={index}
                                  className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-[4px] small">
                      <label htmlFor="Pass" className="font-semibold">
                        Pass
                      </label>
                      <div className="relative">
                        <div
                          onClick={togglePassDropdown}
                          className="border border-grey300 text-grey300 rounded-[20px] flex items-center justify-center gap-[4px] p-[8px] font-semibold small cursor-pointer"
                        >
                          <span>0 credits</span>
                          <Image
                            src="/assets/icons/ucas-down-arrow.svg"
                            alt=""
                            width="16"
                            height="16"
                          />
                        </div>
                        {isPassDropdownOpen && (
                          <div className="absolute top-[46px] left-0 max-h-[343px] overflow-y-auto w-full bg-white border border-neutral-300 rounded-[8px] small shadow-custom-9 custom-scrollbar-2 z-10">
                            <ul>
                              {items.map((item, index) => (
                                <li
                                  key={index}
                                  className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="small text-grey300">
                    A total of 45 credits must be added for tariff points (e.g.
                    D15, P15, M15).
                  </p>
                </div>
              </>
            )}

            <div className="border-b border-grey-200"></div>
            {isAddQualification && (
              <div>
                <label className="block text-grey300 font-semibold mb-[8px]">
                  Second qualification
                </label>
                <div className="flex flex-col gap-[16px]">
                  <div className="flex items-center justify-between gap-[8px]">
                    <div className="relative w-full">
                      <div
                        onClick={toggleSecondDropdown}
                        className="border border-grey300 text-grey300 rounded-[20px] flex items-center justify-center gap-[4px] p-[8px] font-semibold small cursor-pointer"
                      >
                        <span>{addSelectedLevelDesc}</span>
                        <Image
                          src="/assets/icons/ucas-down-arrow.svg"
                          alt=""
                          width="16"
                          height="16"
                        />
                      </div>
                      {isSecondDropdownOpen && (
                        <div className="absolute top-[46px] left-0 max-h-[243px] overflow-y-auto bg-white border border-neutral-300 rounded-[8px] small shadow-custom-9 custom-scrollbar-2 w-[calc(100%+30px)]">
                          <ul>
                            <li className="py-[10px] px-[16px] font-semibold x-small uppercase bg-neutral50 text-grey500 tracking-[1px]">
                              A Levels
                            </li>

                            <li
                              onClick={() =>
                                addLevelSelected("ALEVEL", "A Level")
                              }
                              className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                            >
                              A Level
                            </li>
                            <li
                              onClick={() =>
                                addLevelSelected("ASLEVEL", "AS Level")
                              }
                              className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                            >
                              AS Level
                            </li>
                            <li
                              onClick={() =>
                                addLevelSelected(
                                  "ALEVELDOUBLE",
                                  "A Level Double Award"
                                )
                              }
                              className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                            >
                              A Level Double Award
                            </li>
                            <li
                              onClick={() =>
                                addLevelSelected(
                                  "ASLEVELDOUBLE",
                                  "AS Level Double Award"
                                )
                              }
                              className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                            >
                              AS Level Double Award
                            </li>
                            <li className="py-[10px] px-[16px] font-semibold x-small uppercase bg-neutral50 text-grey500 tracking-[1px]">
                              International baccalaureate (DiplomA)
                            </li>
                            <li
                              onClick={() =>
                                addLevelSelected(
                                  "IB",
                                  "IB (Diploma) Higher level"
                                )
                              }
                              className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                            >
                              IB (Diploma) Higher level
                            </li>
                            <li
                              onClick={() =>
                                addLevelSelected(
                                  "IB",
                                  "IB (Diploma) Higher level"
                                )
                              }
                              className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                            >
                              IB (Diploma) Standard Level
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <svg
                      onClick={deleteClicked}
                      className="cursor-pointer"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 7.5L18.1327 19.6425C18.0579 20.6891 17.187 21.5 16.1378 21.5H7.86224C6.81296 21.5 5.94208 20.6891 5.86732 19.6425L5 7.5M10 11.5V17.5M14 11.5V17.5M15 7.5V4.5C15 3.94772 14.5523 3.5 14 3.5H10C9.44772 3.5 9 3.94772 9 4.5V7.5M4 7.5H20"
                        stroke="#BC0000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {addSelectedLevelName == "ALEVEL" && (
                    <div className="flex items-center justify-between gap-[32px] flex-wrap">
                      {levels.map((item, index) => (
                        <div
                          key={index + 1}
                          className="inline-flex items-center gap-[4px]"
                        >
                          <label
                            htmlFor="grade"
                            className="min-w-[24px] font-semibold block text-grey300"
                          >
                            {item}
                          </label>
                          <button>
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.0002 36.6667C29.2049 36.6667 36.6668 29.2048 36.6668 20C36.6668 10.7953 29.2049 3.33337 20.0002 3.33337C10.7954 3.33337 3.3335 10.7953 3.3335 20C3.3335 29.2048 10.7954 36.6667 20.0002 36.6667Z"
                                stroke="#ADB2B6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13.3335 20H26.6668"
                                stroke="#ADB2B6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <span className="text-grey300 min-w-[24px] block text-center">
                            1
                          </span>
                          <button>
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.0002 36.6667C29.2049 36.6667 36.6668 29.2048 36.6668 20C36.6668 10.7953 29.2049 3.33337 20.0002 3.33337C10.7954 3.33337 3.3335 10.7953 3.3335 20C3.3335 29.2048 10.7954 36.6667 20.0002 36.6667Z"
                                stroke="#4664DC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20 13.3334V26.6667"
                                stroke="#4664DC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13.3335 20H26.6668"
                                stroke="#4664DC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {addSelectedLevelName == "ASLEVEL" && (
                    <div className="flex items-center justify-between gap-[32px] flex-wrap">
                      {levels.map((item, index) => (
                        <div
                          key={index + 1}
                          className="inline-flex items-center gap-[4px]"
                        >
                          <label
                            htmlFor="grade"
                            className="min-w-[24px] font-semibold block text-grey300"
                          >
                            {item}
                          </label>
                          <button>
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.0002 36.6667C29.2049 36.6667 36.6668 29.2048 36.6668 20C36.6668 10.7953 29.2049 3.33337 20.0002 3.33337C10.7954 3.33337 3.3335 10.7953 3.3335 20C3.3335 29.2048 10.7954 36.6667 20.0002 36.6667Z"
                                stroke="#ADB2B6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13.3335 20H26.6668"
                                stroke="#ADB2B6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <span className="text-grey300 min-w-[24px] block text-center">
                            1
                          </span>
                          <button>
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.0002 36.6667C29.2049 36.6667 36.6668 29.2048 36.6668 20C36.6668 10.7953 29.2049 3.33337 20.0002 3.33337C10.7954 3.33337 3.3335 10.7953 3.3335 20C3.3335 29.2048 10.7954 36.6667 20.0002 36.6667Z"
                                stroke="#4664DC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20 13.3334V26.6667"
                                stroke="#4664DC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13.3335 20H26.6668"
                                stroke="#4664DC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {addSelectedLevelName == "ALEVELDOUBLE" && (
                    <div className="flex items-center gap-[8px] flex-wrap cursor-pointer">
                      {grades.map((item, index) => (
                        <Link
                          key={index + 1}
                          href="#"
                          className="min-w-[66px] text-center small bg-white border border-primary-400 text-primary-400 py-[8px] px-[16px] rounded-[20px] block font-semibold hover:bg-primary-400 hover:text-white"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div
              onClick={addClick}
              className="flex items-center gap-[4px] text-primary-400 font-semibold cursor-pointer hover:underline"
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2V15M14.5 8.5L1.5 8.5"
                  stroke="#4664DC"
                  strokeWidth="1.335"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add a qualification
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col gap-[10px] p-[16px] fixed w-[375px] bottom-0 shadow-custom-10 bg-white ${
            count ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center justify-center gap-[8px] min-h-[42px]">
            <p className="small text-grey300 small">Your UCAS points</p>
            <div
              className={`flex items-center min-w-[36px] py-[6px] px-[14px] rounded-[4px] bg-grey-100 text-grey300 font-semibold cursor-pointer ${
                count ? "bg-positive-default text-white" : ""
              }`}
            >
              150
            </div>
          </div>
          <div className="flex items-center justify-between gap-[8px] min-h-[44px]">
            <Link
              href="#"
              aria-label="reset filters"
              className="text-primary-400 font-semibold py-[10px] px-[16px] grow text-center hover:underline"
            >
              Reset
            </Link>
            <button className="bg-primary-400 text-white rounded-[24px] py-[10px] px-[16px] min-w-[200px] font-semibold hover:bg-primary-500">
              Apply
            </button>
          </div>
        </div>
      </div>
      {/* <UcasComponentSkeleton/> */}
    </>
  );
};

export default UcasComponent;
