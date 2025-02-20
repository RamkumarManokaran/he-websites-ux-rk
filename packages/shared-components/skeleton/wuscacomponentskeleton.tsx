const Wuscacomponentskeleton = () => {
  return (
    <section className="wusca-container bg-neutral-50">
      <div className="max-w-container mx-auto">
        {/* container */}
        <div className="wusca-card-container grid  grid-rows-[3_minmax(0_auto)] md:grid-cols-[352px_minmax(352px,_1fr)] xl:grid-cols-[598px_minmax(598px,_1fr)] px-[16px] py-[40px] md:px-[20px] md:pt-[0] md:pb-[64px] xl:p-[0] gap-[24px] md:gap-[20px] xl:gap-x-[20px] xl:gap-y-[24px]">
          <div className="wusca-content flex flex-col justify-center xl:justify-end col-start-1 row-start-2 md:row-start-1 xl:col-span-1 gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <div className="skeleton skeleton-text skeleton-text-animated large_heading"></div>
              <div className="font-normal">
                <div className="skeleton skeleton-text skeleton-text-animated descrip"></div>
                <div className="skeleton skeleton-text skeleton-text-animated descrip"></div>
              </div>
            </div>
            <div className="skeleton skeleton_btn skeleton-text-animated !w-[120px]"></div>
            <div className="btn-pod flex gap-[10px] w-[280px]">
              <div className="skeleton skeleton_btn skeleton-text-animated"></div>
              <div className="skeleton skeleton_btn skeleton-text-animated"></div>
            </div>
          </div>
          <div className="wusca-highlights grid grid-cols-3 items-baseline gap-[8px] row-start-3 row-end-4 col-start-1 col-end-2 md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3  xl:col-end-2">
            <div className="wusca-card flex items-center min-h-[88px] flex-col md:flex-row gap-[8px] px-[16px] py-[12px] rounded-[4px] border border-grey600">
              <div className="skeleton skeleton-text skeleton-square-img !w-[32px] !h-[32px]"></div>
              <div className="wusca-content text-center w-full md:text-left">
                <div className="skeleton skeleton-text skeleton-text-animated large_heading"></div>
                <div className="font-semibold small">
                  <div className="skeleton skeleton-text skeleton-text-animated descrip"></div>
                </div>
              </div>
            </div>
            <div className="wusca-card flex items-center min-h-[88px] flex-col md:flex-row gap-[8px] px-[16px] py-[12px] rounded-[4px] border border-grey600">
              <div className="skeleton skeleton-text skeleton-square-img !w-[32px] !h-[32px]"></div>
              <div className="wusca-content text-center w-full md:text-left">
                <div className="skeleton skeleton-text skeleton-text-animated large_heading"></div>
                <div className="font-semibold small">
                  <div className="skeleton skeleton-text skeleton-text-animated descrip"></div>
                </div>
              </div>
            </div>
            <div className="wusca-card flex items-center min-h-[88px] flex-col md:flex-row gap-[8px] px-[16px] py-[12px] rounded-[4px] border border-grey600">
              <div className="skeleton skeleton-text skeleton-square-img !w-[32px] !h-[32px]"></div>
              <div className="wusca-content text-center w-full md:text-left">
                <div className="skeleton skeleton-text skeleton-text-animated large_heading"></div>
                <div className="font-semibold small">
                  <div className="skeleton skeleton-text skeleton-text-animated descrip"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid justify-center px-[20px] md:px-[16px] md:py-[36px] xl:px-[0] row-start-1 row-end-2 xl:row-end-3 col-start-2 -col-end-1">
            <svg
              width="100%"
              height="408"
              viewBox="0 0 417 408"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M414.329 0L415.713 209.739C416.424 317.432 329.698 405.311 222.004 406.021L2.67098 407.469L1.2868 197.73C0.576077 90.037 87.3025 2.15823 194.996 1.4475L414.329 0Z"
                fill="#E6E6E6"
              />
            </svg>
          </div>
        </div>
        {/* container */}
      </div>
    </section>
  );
};

export default Wuscacomponentskeleton;
