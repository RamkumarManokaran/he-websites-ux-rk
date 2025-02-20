const MiniBannerSkeleton = () => {
  return (
    <>
      <section className="bg-white">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-[16px] p-[16px] md:p-[0_20px_26px_20px] lg:py-0 xl:px-0 min-h-[194px]">
            <div className="w-full flex flex-col flex-grow gap-[16px] self-center lg:p-[16px_0_38px]">
              <div className="flex flex-col gap-[4px]">
                <div className="skeleton skeleton-text-animated large_heading !mb-[4px]"></div>
                <div className="skeleton skeleton-text-animated large_heading !mb-[4px] !w-[40%]"></div>
                <div className="skeleton skeleton-text-animated descript"></div>
                <div className="skeleton skeleton-text-animated descript !w-[70%]"></div>
              </div>
            </div>
            <div className="flex self-end justify-center w-full shrink-0 md:w-[219px] lg:w-[392px] pt-[12px]">
              <div className="skeleton skeleton-square-img skeleton-text-animated !w-[205px] !h-[260px] !rounded-none"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MiniBannerSkeleton;
