"use client";
import React, { useState } from "react";
import Image from "next/image";
import { extractValue } from "@packages/lib/utlils/ucas-functions";
const GradeDropdown = ({
  qual,
  setQual,
  indexPosition,
  ucasPoint,
  setUcasPoint,
}: any) => {
  const initialArray = [
    0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45,
  ];
  const [totalcredit, setTotalcredit] = useState(
    qual[indexPosition]?.totalcredit
  );
  const [openDropdown, setOpenDropdown] = useState<
    "distinction" | "merit" | "pass" | null
  >(null);
  const getValue = (selectedKey: string) => {
    const foundItem = qual[indexPosition]?.gradeArray?.find(
      (item: any) => item?.key === selectedKey
    );
    if (foundItem) {
      return foundItem?.value;
    }
  };
  const [distinction, setDistinction] = useState({
    point: extractValue(qual[indexPosition]?.userEntryPoint, "D") || 0,
    score:
      getValue("D") * extractValue(qual[indexPosition]?.userEntryPoint, "D") ||
      0,
  });
  const [merit, setMerit] = useState({
    point: extractValue(qual[indexPosition]?.userEntryPoint, "M") || 0,
    score:
      getValue("D") * extractValue(qual[indexPosition]?.userEntryPoint, "D") ||
      0,
  });
  const [pass, setPass] = useState({
    point: extractValue(qual[indexPosition]?.userEntryPoint, "P") || 0,
    score:
      getValue("D") * extractValue(qual[indexPosition]?.userEntryPoint, "D") ||
      0,
  });

  const getPodSpecificvalue = (selectedKey: string, itemValue: number) => {
    if (selectedKey === "D") {
      const dvalue = itemValue * getValue(selectedKey);
      return dvalue + merit?.score + pass?.score;
    } else if (selectedKey === "M") {
      const mvalue = itemValue * getValue(selectedKey);
      return mvalue + distinction?.score + pass?.score;
    } else if (selectedKey === "P") {
      const pvalue = itemValue * getValue(selectedKey);
      return pvalue + distinction?.score + merit?.score;
    }
  };

  const getUcasEntryPoint = (selectedKey: string, itemValue: number) => {
    if (selectedKey === "D") {
      return `${itemValue}D-${merit.point}M-${pass.point}P`;
    } else if (selectedKey === "M") {
      return `${distinction.point}D-${itemValue}M-${pass.point}P`;
    } else if (selectedKey === "P") {
      return `${distinction.point}D-${merit.point}M-${itemValue}P`;
    }
  };
  const selectValue = (
    itemValue: number,
    setState: React.Dispatch<React.SetStateAction<any>>,
    currentPoint: number,
    selectedKey: string
  ) => {
    setTotalcredit(totalcredit + itemValue - currentPoint);
    setState({
      point: itemValue,
      score: Number(itemValue) * Number(getValue(selectedKey)),
    });
    setOpenDropdown(null);
    setQual((prev: any) =>
      prev?.map((item: any, index: any) =>
        index === indexPosition
          ? {
              ...item,
              podSpecificPoints: getPodSpecificvalue(selectedKey, itemValue),
              totalcredit: totalcredit + itemValue - currentPoint,
              userEntryPoint: getUcasEntryPoint(selectedKey, itemValue),
            }
          : item
      )
    );

    setUcasPoint(
      ucasPoint +
        getPodSpecificvalue(selectedKey, itemValue) -
        qual[indexPosition].podSpecificPoints
    );
  };

  const remainingCredits =
    45 - (distinction?.point + merit?.point + pass?.point);
  return (
    <div className="flex flex-col gap-[16px] px-[16px] pb-[32px]">
      <div className="flex flex-col gap-[16px] max-w-[200px]">
        {/* Distinction Dropdown */}
        <div className="flex flex-col gap-[4px] small">
          <label htmlFor="distinction" className="font-semibold">
            Distinction
          </label>
          <div className="relative">
            <div
              role="button"
              aria-label="Distinction"
              onClick={() =>
                setOpenDropdown((prev) =>
                  prev === "distinction" ? null : "distinction"
                )
              }
              className="border border-grey300 text-grey300 rounded-[20px] flex items-center justify-center gap-[4px] p-[8px] font-semibold small cursor-pointer"
            >
              <span>{distinction?.point} credits</span>
              <Image
                src="/static/assets/icons/ucas-down-arrow.svg"
                alt="ucas-down-arrow"
                width="16"
                height="16"
              />
            </div>
            {openDropdown === "distinction" && (
              <div className="absolute top-[46px] left-0 max-h-[343px] overflow-y-auto w-full bg-white border border-neutral-300 rounded-[8px] small shadow-custom-9 custom-scrollbar-2 z-10">
                <ul>
                  {initialArray
                    .filter(
                      (item) => item <= remainingCredits + distinction.point
                    )
                    ?.map((item, index) => (
                      <li
                        key={index}
                        className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                        onClick={() =>
                          selectValue(
                            item,
                            setDistinction,
                            distinction?.point,
                            "D"
                          )
                        }
                      >
                        {item} credits
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Merit Dropdown */}
        <div className="flex flex-col gap-[4px] small">
          <label htmlFor="merit" className="font-semibold">
            Merit
          </label>
          <div className="relative">
            <div
              role="button"
              aria-label="Merit"
              onClick={() =>
                setOpenDropdown((prev) => (prev === "merit" ? null : "merit"))
              }
              className="border border-grey300 text-grey300 rounded-[20px] flex items-center justify-center gap-[4px] p-[8px] font-semibold small cursor-pointer"
            >
              <span>{merit?.point} credits</span>
              <Image
                src="/static/assets/icons/ucas-down-arrow.svg"
                alt="ucas-down-arrow"
                width="16"
                height="16"
              />
            </div>
            {openDropdown === "merit" && (
              <div className="absolute top-[46px] left-0 max-h-[343px] overflow-y-auto w-full bg-white border border-neutral-300 rounded-[8px] small shadow-custom-9 custom-scrollbar-2 z-10">
                <ul>
                  {initialArray
                    ?.filter((item) => item <= remainingCredits + merit?.point)
                    ?.map((item, index) => (
                      <li
                        key={index}
                        className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                        onClick={() =>
                          selectValue(item, setMerit, merit?.point, "M")
                        }
                      >
                        {item} credits
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Pass Dropdown */}
        <div className="flex flex-col gap-[4px] small">
          <label htmlFor="pass" className="font-semibold">
            Pass
          </label>
          <div className="relative">
            <div
              role="button"
              aria-label="Pass"
              onClick={() =>
                setOpenDropdown((prev) => (prev === "pass" ? null : "pass"))
              }
              className="border border-grey300 text-grey300 rounded-[20px] flex items-center justify-center gap-[4px] p-[8px] font-semibold small cursor-pointer"
            >
              <span>{pass?.point} credits</span>
              <Image
                src="/static/assets/icons/ucas-down-arrow.svg"
                alt="ucas-down-arrow"
                width="16"
                height="16"
              />
            </div>
            {openDropdown === "pass" && (
              <div className="absolute top-[46px] left-0 max-h-[343px] overflow-y-auto w-full bg-white border border-neutral-300 rounded-[8px] small shadow-custom-9 custom-scrollbar-2 z-10">
                <ul>
                  {initialArray
                    ?.filter((item) => item <= remainingCredits + pass.point)
                    ?.map((item, index) => (
                      <li
                        key={index}
                        className="py-[10px] px-[16px] cursor-pointer hover:bg-secondary-50 hover:underline"
                        onClick={() =>
                          selectValue(item, setPass, pass?.point, "P")
                        }
                      >
                        {item} credits
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="small text-grey300">
        A total of 45 credits must be added for tariff points (e.g., D15, M15,
        P15).
      </p>
    </div>
  );
};

export default GradeDropdown;
