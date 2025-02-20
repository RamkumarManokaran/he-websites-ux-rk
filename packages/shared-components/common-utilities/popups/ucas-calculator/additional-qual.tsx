"use client";
import React, { useState } from "react";
import Image from "next/image";
import GradeBadgeButton from "./grade-badge-button";
import MaxMinInputBox from "./max-min-input";
import { getSelectedGrade } from "@packages/lib/utlils/ucas-functions";
import { parseGradeString } from "@packages/lib/utlils/ucas-functions";
import { GradeFilterArrayInterface } from "@packages/lib/types/ucas-calc";
import GradeCounterButton from "./grade-counter-button";
// import { GradePointsInterface } from "@packages/lib/types/ucas-calc";
// import { KeyValuePair } from "@packages/lib/types/ucas-calc";
import GradeDropdown from "./grade-dropdown";
const AddQualification = ({
  removeQual,
  qualOrder,
  ucasGradeData,
  ucasPoint,
  setUcasPoint,
  indexPosition,
  qual,
  setQual,
  setQualifications,
}: any) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const changeUcasLevel = (
    level: string,
    gradeString: string | null,
    maxPoint: string | null,
    maxTotalPoint: string | null,
    template: string | null,
    qualId: number | null,
    gradeOptions: string | null
  ) => {
    setIsDropDownOpen(!isDropDownOpen);
    if (level === "UCAS Tariff Points") {
      setQual([
        {
          SelectedLevel: level,
          totalcredit: 0,
          type: template,
          maxPoint: Number(maxPoint),
          qualId: qualId,
          maxTotalPoint: Number(maxTotalPoint),
          getmaxTotalPoint: 0,
          podSpecificPoints: 0,
          min: 0,
          max: 0,
          userEntryPoint: "",
          gradeArray: parseGradeString(gradeOptions),
        },
      ]);
      setQualifications([]);
    } else {
      setQual((prev: any) =>
        prev?.map((item: any, index: number) =>
          index === indexPosition
            ? {
                ...item,
                SelectedLevel: level,
                type: template,
                maxPoint: Number(maxPoint),
                maxTotalPoint: Number(maxTotalPoint),
                gradeArray: parseGradeString(gradeOptions),
                qualId: qualId,
                getmaxTotalPoint: 0,
                podSpecificPoints: 0,
                userEntryPoint: "",
                min: 0,
                max: 0,
              }
            : item
        )
      );
    }
    setUcasPoint(ucasPoint - qual[indexPosition]?.podSpecificPoints);
    if (level === "UCAS Tariff Points") {
      setUcasPoint(0);
    }
  };
  const deleteClicked = () => {
    setUcasPoint(ucasPoint - qual[indexPosition]?.podSpecificPoints);
    removeQual();
  };
  return (
    <>
      <div>
        <label className="block text-grey300 font-semibold mb-[8px]">
          {qualOrder} qualification
        </label>
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center justify-between gap-[8px]">
            <div className="relative w-full">
              <div
                onClick={toggleDropdown}
                className="border border-grey300 text-grey300 rounded-[20px] flex items-center justify-center gap-[4px] p-[8px] font-semibold small cursor-pointer"
              >
                <span>{qual[indexPosition]?.SelectedLevel}</span>
                <Image
                  src="/static/assets/icons/ucas-down-arrow.svg"
                  alt="ucas-down-arrow"
                  width="16"
                  height="16"
                />
              </div>
              {isDropDownOpen && ucasGradeData && (
                <div className="absolute top-[46px] left-0 max-h-[343px] overflow-y-auto bg-white border border-neutral-300 rounded-[8px] small shadow-custom-9 custom-scrollbar-2 w-[calc(100%+30px)] z-10">
                  <ul>
                    {ucasGradeData?.map((childItems: any, index: number) => (
                      <li
                        key={index + 1}
                        className={
                          childItems.qualId === null
                            ? "py-[10px] px-[16px] font-semibold x-small uppercase bg-neutral50 text-grey500 tracking-[1px]"
                            : "py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                        }
                        onClick={
                          childItems?.qualId !== null
                            ? () => {
                                changeUcasLevel(
                                  childItems.qualification,
                                  childItems.gradeOptions,
                                  childItems.maxPoint,
                                  childItems.maxTotalPoint,
                                  childItems.template,
                                  Number(childItems.qualId),
                                  childItems.gradeOptions
                                );
                              }
                            : undefined
                        }
                      >
                        {childItems?.qualification}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Delete box SVG Icon */}
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

          {qual[indexPosition]?.type == "plus-minus" && (
            <div className="flex items-center justify-between gap-[32px] flex-wrap">
              {qual[indexPosition]?.gradeArray?.map(
                (childItems: any, index: number) => (
                  <GradeCounterButton
                    key={qual[indexPosition].SelectedLevel + index}
                    btnName={childItems.key}
                    btnValue={childItems.value}
                    qual={qual}
                    setQual={setQual}
                    indexPosition={indexPosition}
                    ucasPoint={ucasPoint}
                    setUcasPoint={setUcasPoint}
                    populateCount={getSelectedGrade(
                      qual[indexPosition].userEntryPoint,
                      childItems.key
                    )}
                  />
                )
              )}
            </div>
          )}
          {qual[indexPosition]?.type == "credit-selector" && (
            <GradeDropdown
              qual={qual}
              setQual={setQual}
              indexPosition={indexPosition}
              ucasPoint={ucasPoint}
              setUcasPoint={setUcasPoint}
            />
          )}
          {qual[indexPosition]?.type == "single-select" && (
            <div className="flex items-center gap-[8px] flex-wrap cursor-pointer">
              {qual[indexPosition]?.gradeArray?.map(
                (childItems: any, index: number) => (
                  <GradeBadgeButton
                    key={index + 1}
                    btnName={childItems.key}
                    btnValue={childItems.value}
                    qual={qual}
                    setQual={setQual}
                    indexPosition={indexPosition}
                    ucasPoint={ucasPoint}
                    setUcasPoint={setUcasPoint}
                  />
                )
              )}
            </div>
          )}

          {qual[indexPosition]?.type == "min-max" && <MaxMinInputBox />}
        </div>
      </div>
    </>
  );
};

export default AddQualification;
