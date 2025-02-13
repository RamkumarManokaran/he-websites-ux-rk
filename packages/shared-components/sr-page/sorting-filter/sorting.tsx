"use server";
import React from "react";
const SortingFilter = () => {
  return (
    <div className="ml-auto w-fit">
      <div className="flex items-center gap-[4px] px-[4px] py-[16px] small text-grey300 cursor-pointer">
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 2.72217H10.8889M1.5 5.61106H8M1.5 8.49995H8M11.6111 5.61106V14.2777M11.6111 14.2777L8.72222 11.3888M11.6111 14.2777L14.5 11.3888"
            stroke="#333333"
            strokeWidth="1.335"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-semibold">Sort:</span>
        <span> Entry reqs - highest</span>
      </div>
    </div>
  );
};

export default SortingFilter;
