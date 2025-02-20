import React from "react";

import Image from "next/image";

const HeroSliderComponentSkeleton = () => {
  return (
    <section className="bg-neutral-50">
      <div className="px-[16px] md:px-[20px] xl2:px-0">
        <div className="max-w-container mx-auto">
          <div className="flex justify-between gap-[16px]">
            <div className="w-full pt-[64px] pb-[40px] md:pt-[68px] md:pb-[108px] lg:py-[88px]">
              <div className="flex gap-[4px]">
                <div className="skeleton skeleton-text skeleton-square-img !w-[8px] !h-[8px] !rounded-[4px]"></div>
                <div className="skeleton skeleton-text skeleton-square-img !w-[16px] !h-[8px] !rounded-[4px]"></div>
                <div className="skeleton skeleton-text skeleton-square-img !w-[8px] !h-[8px] !rounded-[4px]"></div>
                <div className="skeleton skeleton-text skeleton-square-img !w-[8px] !h-[8px] !rounded-[4px]"></div>
              </div>
              <div className="skeleton skeleton-text skeleton-text-animated large_heading"></div>
              <div className="skeleton skeleton-text skeleton-text-animated large_heading !mb-[4px]"></div>
              <div className="skeleton skeleton-text skeleton-text-animated descript"></div>
              <div className="skeleton skeleton-text skeleton-text-animated descript !mb-[16px]"></div>

              <div className="skeleton skeleton_btn skeleton-text-animated !w-[140px]"></div>
            </div>
            <div className="md:w-[354px] lg:w-[495px] lg:min-h-[483px] shrink-0 self-end hidden md:flex justify-center md:pb-[80px] md:px-[21px] lg:pb-0 lg:pt-[38px]">
              <div className="skeleton skeleton-text skeleton-square-img !w-[365px] !h-[445px] !rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-[12px] md:px-[16px]">
        <div className="bg-white w-full rounded-none max-w-container mx-auto p-[16px] mt-0 min-h-[160px] relative z-3 md:shadow-custom-5 md:rounded-[32px] md:p-[24px] md:mt-[-82px]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <ul className="flex gap-[8px] justify-center cursor-pointer md:justify-start">
              <li>
                <div className="skeleton skeleton_btn skeleton-text-animated !min-w-[85px]"></div>
              </li>
              <li>
                <div className="skeleton skeleton_btn skeleton-text-animated !min-w-[105px]"></div>
              </li>
              <li>
                <div className="skeleton skeleton_btn skeleton-text-animated !min-w-[75px]"></div>
              </li>
            </ul>
            <div className="flex justify-center md:justify-end my-[24px] md:my-0">
              <div className="flex items-center gap-[6px]">
                <div className="skeleton skeleton-text !w-[20px] !h-[20px] !rounded-[0]"></div>
                <div className="skeleton skeleton-text skeleton-text-animated descript !w-[186px]"></div>
              </div>
            </div>
            <div className="row-start-2 md:col-span-2 mt-[16px]">
              <div className="flex flex-col gap-[24px] min-h-[60px]">
                <div className="bg-white rounded-[32px] p-[16px] border border-grey600 shadow-custom-1 md:pl-[24px] md:p-[10px]">
                  <div className="flex flex-col items-stretch md:flex-row md:items-center">
                    <div className="relative mb-[24px] md:mb-[0] shrink-0">
                      <div className="skeleton skeleton-text skeleton-text-animated descript mr-0 w-full md:w-[160px] md:mr-[16px]"></div>
                    </div>
                    <div className="w-full relative border-y-[1px] border-neutral200 grow md:border-l md:border-y-0">
                      <div className="flex items-center my-[12px] md:my-[0]">
                        <div className="w-full skeleton skeleton-text skeleton-text-animated descript px-[0] md:mx-[16px]"></div>
                      </div>
                    </div>
                    <div className="w-full relative grow md:border-l border-neutral200">
                      <div className="flex items-center my-[12px] md:my-[0]">
                        <div className="w-full skeleton skeleton-text skeleton-text-animated descript px-[0] md:mx-[16px]"></div>
                      </div>
                    </div>
                    <div className="pt-[2px] md:pt-[0]">
                      <div className="skeleton skeleton_btn skeleton-text-animated w-full  px-[24px] py-[10px] md:min-w-[114px] !my-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[8px] md:hidden">
            <div className="skeleton skeleton-text !w-[20px] !h-[20px] !rounded-[0]"></div>
            <div className="skeleton skeleton-text skeleton-text-animated descript"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSliderComponentSkeleton;
