import React from "react";
// import { GradePointsInterface } from "@packages/lib/types/ucas-calc";
const GradeBadgeButton = ({
  btnName,
  btnValue,
  qual,
  setQual,
  indexPosition,
  ucasPoint,
  setUcasPoint,
}: any) => {
  const selectGradeButton = (btnValue: number) => {
    if (qual[indexPosition]?.podSpecificPoints !== btnValue) {
      setUcasPoint(
        ucasPoint + btnValue - qual[indexPosition]?.podSpecificPoints
      );
      setQual((prev: any) =>
        prev?.map((item: any, index: any) =>
          index === indexPosition
            ? {
                ...item,
                podSpecificPoints: btnValue,
                userEntryPoint: `${btnName}`,
              }
            : item
        )
      );
    }
  };
  return (
    <button
      className={`min-w-[66px] text-center small border border-primary-400 text-primary-400 py-[8px] px-[16px] rounded-[20px] block font-semibold ${
        qual[indexPosition]?.userEntryPoint?.toLowerCase() ===
          btnName?.toLowerCase() &&
        qual[indexPosition]?.podSpecificPoints === btnValue
          ? "bg-primary-400 text-white "
          : "bg-white hover:bg-primary-400 hover:text-white"
      }`}
      onClick={() => selectGradeButton(btnValue)}
    >
      {btnName}
    </button>
  );
};

export default GradeBadgeButton;
