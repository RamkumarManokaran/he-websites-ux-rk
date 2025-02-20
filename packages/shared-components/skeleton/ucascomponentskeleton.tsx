import React from "react";

const UcasComponentSkeleton = () => {
  return (
    <>
      {/* <div className="fixed top-0 left-0 w-full h-full bg-grey-600 backdrop-blur-custom-1 opacity-[80%] z-10"></div> */}
      {/* fixed top-0 left-0  */}
      <div
        className={`bg-white 
          h-full w-[375px] z-10 transition-all duration-300 ease-in-out`}
      >
        {/* <div className="p-[16px]">
          <div className="skeleton skeleton-text-animated skeleton-circle-img !w-[24px] !h-[24px] ml-auto !rounded-none"></div>
          <div className="skeleton skeleton-text-animated descrip mt-[-8px] !w-[300px]"></div>
        </div> */}

        <div className="flex flex-col gap-[32px] h-[calc(100%-210px)] overflow-y-auto custom-scrollbar-2">
          <div className="flex flex-col gap-[16px] px-[16px] pb-[32px]">
            <div className="relative">
              <div className="skeleton skeleton-text-animated skeleton_btn"></div>
            </div>

            <div className="flex items-center justify-between gap-[32px] flex-wrap">
              <div className="inline-flex items-center gap-[8px]">
                <div className="skeleton skeleton-text-animated descrip !w-[24px]"></div>
                <div className="skeleton skeleton-text-animated skeleton-circle-img !w-[40px] !h-[40px]"></div>
                <div className="skeleton skeleton-text-animated descrip !w-[24px]"></div>
                <div className="skeleton skeleton-text-animated skeleton-circle-img !w-[40px] !h-[40px]"></div>
              </div>
              <div className="inline-flex items-center gap-[8px]">
                <div className="skeleton skeleton-text-animated descrip !w-[24px]"></div>
                <div className="skeleton skeleton-text-animated skeleton-circle-img !w-[40px] !h-[40px]"></div>
                <div className="skeleton skeleton-text-animated descrip !w-[24px]"></div>
                <div className="skeleton skeleton-text-animated skeleton-circle-img !w-[40px] !h-[40px]"></div>
              </div>
              <div className="inline-flex items-center gap-[8px]">
                <div className="skeleton skeleton-text-animated descrip !w-[24px]"></div>
                <div className="skeleton skeleton-text-animated skeleton-circle-img !w-[40px] !h-[40px]"></div>
                <div className="skeleton skeleton-text-animated descrip !w-[24px]"></div>
                <div className="skeleton skeleton-text-animated skeleton-circle-img !w-[40px] !h-[40px]"></div>
              </div>
              <div className="inline-flex items-center gap-[8px]">
                <div className="skeleton skeleton-text-animated descrip !w-[24px]"></div>
                <div className="skeleton skeleton-text-animated skeleton-circle-img !w-[40px] !h-[40px]"></div>
                <div className="skeleton skeleton-text-animated descrip !w-[24px]"></div>
                <div className="skeleton skeleton-text-animated skeleton-circle-img !w-[40px] !h-[40px]"></div>
              </div>
              <div className="inline-flex items-center gap-[8px]">
                <div className="skeleton skeleton-text-animated descrip !w-[24px]"></div>
                <div className="skeleton skeleton-text-animated skeleton-circle-img !w-[40px] !h-[40px]"></div>
                <div className="skeleton skeleton-text-animated descrip !w-[24px]"></div>
                <div className="skeleton skeleton-text-animated skeleton-circle-img !w-[40px] !h-[40px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UcasComponentSkeleton;
