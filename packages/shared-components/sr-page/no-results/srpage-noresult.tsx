"use server";
import React from "react";
import Image from "next/image";
const SrPageNoResults = () => {
  return (
    <div className="bg-grey-50 p-[16px] rounded-[8px] flex flex-col gap-[16px] lg:flex-row lg:justify-between">
      <div className="flex gap-[16px]">
        <div className="bg-grey-200 text-grey900 rounded-tl-[24px] rounded-br-[24px] p-[8px] w-[48px] h-[48px] flex items-center justify-center shrink-0">
          <Image
            src="/static/assets/icons/search-result/search-grey.svg"
            alt="Search"
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="para-lg font-bold font-farro">
            No exact matches, but we&apos;re close
          </div>
          <div className="small">
            We couldn’t find an exact match but here are some options related to
            [search terms]. Or try modifying the filters to find what you need
          </div>
        </div>
      </div>
    </div>
  );
};

export default SrPageNoResults;
