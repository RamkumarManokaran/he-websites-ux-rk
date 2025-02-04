"use client";
import React, { useState } from "react";
import { isNumeric } from "@packages/lib/utlils/ucas-functions";
const MaxMinInputBox = ({
  indexPosition,
  setQual,
  setUcasPoint,
  qual,
}: any) => {
  const [minimumValue, setMinimumValue] = useState(
    qual[indexPosition]?.min !== "" ? qual[indexPosition]?.min : ""
  );
  const [maximumValue, setMaximumValue] = useState(
    qual[indexPosition]?.max ? qual[indexPosition]?.max : ""
  );
  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    indexPosition: number,
    feild: string
  ) {
    if (feild === "min") {
      if (isNumeric(event.target.value) && event.target.value.length <= 3) {
        const value = Number(event?.target.value);
        setMinimumValue(Number(event.target.value));
        setQual((prev: any) =>
          prev?.map((item: any, index: number) =>
            index === indexPosition ? { ...item, min: value } : item
          )
        );
      } else if (event.target.value === "") {
        setMinimumValue("");
        setQual((prev: any) =>
          prev?.map((item: any, index: number) =>
            index === indexPosition ? { ...item, min: "" } : item
          )
        );
      }
    } else {
      if (isNumeric(event.target.value) && event.target.value.length <= 3) {
        const value = Number(event?.target.value);
        setMaximumValue(value);
        setQual((prev: any) =>
          prev?.map((item: any, index: number) =>
            index === indexPosition
              ? { ...item, max: value, podSpecificPoints: value }
              : item
          )
        );
        setUcasPoint(value);
      } else if (event.target.value === "") {
        setMaximumValue("");
        setQual((prev: any) =>
          prev?.map((item: any, index: number) =>
            index === indexPosition
              ? { ...item, max: "", podSpecificPoints: 0 }
              : item
          )
        );
        setUcasPoint(0);
      }
    }
  }
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[4px] small">
        <label htmlFor={`minpoint-${indexPosition}`} className="font-semibold ">
          Minimum points
        </label>
        <input
          type="text"
          onChange={(event) => handleInputChange(event, indexPosition, "min")}
          value={minimumValue}
          id={`minpoint-${indexPosition}`}
          placeholder="Enter UCAS points"
          className="block rounded-[8px] min-h-[44px] border border-grey-500 py-[12px] px-[10px]"
        />
      </div>
      <div className="flex flex-col gap-[4px] small">
        <label htmlFor={`maxpoint-${indexPosition}`} className="font-semibold ">
          Maximum points
        </label>
        <input
          type="text"
          onChange={(event) => handleInputChange(event, indexPosition, "max")}
          value={maximumValue}
          id={`maxpoint-${indexPosition}`}
          placeholder="Enter UCAS points"
          className="block rounded-[8px] min-h-[44px] border border-grey-500 py-[12px] px-[10px]"
        />
      </div>
    </div>
  );
};

export default MaxMinInputBox;
