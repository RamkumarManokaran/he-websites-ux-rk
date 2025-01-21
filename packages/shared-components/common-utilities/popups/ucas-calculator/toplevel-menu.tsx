"use client";
import React, { useState } from "react";
import GradeBadgeButton from "./grade-badge-button";
import Image from "next/image";
import MaxMinInputBox from "./max-min-input";
import GradeCounterButton from "./grade-counter-button";
import GradeDropdown from "./grade-dropdown";
import { parseGradeString } from "@packages/lib/utlils/ucas-functions";
import { getSelectedGrade } from "@packages/lib/utlils/ucas-functions";
const TopLevelMenu = ({
  ucasGradeData,
  ucasPoint,
  setUcasPoint,
  indexPosition,
  qual,
  setQual,
  resetid,
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
          min: "",
          max: "",
          userEntryPoint: "",
          gradeArray: parseGradeString(gradeOptions),
        },
      ]);
      setQualifications([]);
      setUcasPoint(0);
    } else {
      setQual((prev: any) =>
        prev?.map((item: any, index: any) =>
          index === indexPosition
            ? {
                ...item,
                type: template,
                totalcredit: 0,
                SelectedLevel: level,
                maxPoint: Number(maxPoint),
                maxTotalPoint: Number(maxTotalPoint),
                gradeArray: parseGradeString(gradeOptions),
                qualId: qualId,
                getmaxTotalPoint: 0,
                podSpecificPoints: 0,
                min: "",
                max: "",
                userEntryPoint: "",
              }
            : item
        )
      );
      setUcasPoint(ucasPoint - qual[indexPosition].podSpecificPoints);
    }
  };
  return (
    <>
      <div className="relative">
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
        {isDropDownOpen && ucasGradeData?.length > 1 && (
          <div className="absolute top-[46px] left-0 max-h-[343px] overflow-y-auto w-full bg-white border border-neutral-300 rounded-[8px] small shadow-custom-9 custom-scrollbar-2 z-10">
            <ul>
              {ucasGradeData?.map((childItems: any, index: number) => (
                <li
                  key={index + 1}
                  className={
                    childItems?.qualId === null
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
      {qual[indexPosition]?.type === "plus-minus" && !isDropDownOpen && (
        <div className="flex items-center justify-between gap-[32px] flex-wrap">
          {qual[indexPosition]?.gradeArray?.map(
            (childItems: any, index: number) => (
              <GradeCounterButton
                key={qual[indexPosition]?.SelectedLevel + index + resetid}
                btnName={childItems.key}
                btnValue={childItems.value}
                indexPosition={indexPosition}
                qual={qual}
                setQual={setQual}
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

      {qual[indexPosition]?.type === "single-select" && !isDropDownOpen && (
        <div className="flex items-center gap-[8px] flex-wrap cursor-pointer">
          {qual[indexPosition]?.gradeArray?.map(
            (childItems: any, index: any) => (
              <GradeBadgeButton
                key={qual[indexPosition]?.SelectedLevel + index}
                indexPosition={indexPosition}
                btnName={childItems.key}
                btnValue={childItems.value}
                qual={qual}
                setQual={setQual}
                ucasPoint={ucasPoint}
                setUcasPoint={setUcasPoint}
              />
            )
          )}
        </div>
      )}
      {qual[indexPosition]?.type === "credit-selector" && !isDropDownOpen && (
        <GradeDropdown
          indexPosition={indexPosition}
          qual={qual}
          setQual={setQual}
          ucasPoint={ucasPoint}
          setUcasPoint={setUcasPoint}
        />
      )}
      {qual[indexPosition]?.type === "min-max" && !isDropDownOpen && (
        <MaxMinInputBox
          indexPosition={indexPosition}
          qual={qual}
          setQual={setQual}
          ucasPoint={ucasPoint}
          setUcasPoint={setUcasPoint}
        />
      )}
    </>
  );
};

export default TopLevelMenu;
