"use client";
import "swiper/css";
import "swiper/css/pagination";
const PartnerSliderComponentSkeleton = () => {
  return (
    <section className="bg-grey-50 py-[40px] md:pt-[64px] md:pb-[39px]">
      <div className="max-w-container mx-auto">
        <div className="skeleton skeleton-text skeleton-text-animated large_heading !w-[60%] mx-auto px-[16px] md:px-[20px] xl2:px-0"></div>
        <div className="flex items-center pt-[32px] gap-[16px] md:gap-[64px] overflow-x-auto custom-scrollbar-2 scrollbar-hidden px-[16px] md:px-[20px] xl2:px-0 scroll-px-[16px]">
          <div className="skeleton skeleton-text skeleton-square-img !min-w-[64px] !h-[64px]"></div>
          <div className="skeleton skeleton-text skeleton-square-img !min-w-[64px] !h-[64px]"></div>
          <div className="skeleton skeleton-text skeleton-square-img !min-w-[64px] !h-[64px]"></div>
          <div className="skeleton skeleton-text skeleton-square-img !min-w-[64px] !h-[64px]"></div>
          <div className="skeleton skeleton-text skeleton-square-img !min-w-[64px] !h-[64px]"></div>
          <div className="skeleton skeleton-text skeleton-square-img !min-w-[64px] !h-[64px]"></div>
          <div className="skeleton skeleton-text skeleton-square-img !min-w-[64px] !h-[64px]"></div>
          <div className="skeleton skeleton-text skeleton-square-img !min-w-[64px] !h-[64px]"></div>
          <div className="skeleton skeleton-text skeleton-square-img !min-w-[64px] !h-[64px]"></div>
          <div className="skeleton skeleton-text skeleton-square-img !min-w-[64px] !h-[64px]"></div>
        </div>
        <div className="flex justify-center mt-[16px] lg:hidden lg:mt-[28px]">
          <div className="skeleton skeleton-text skeleton-text-animated descript !w-[20%]"></div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSliderComponentSkeleton;
