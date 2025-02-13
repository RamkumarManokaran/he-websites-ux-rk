import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="bg-white ">
        <div className="max-w-container mx-auto px-[16px] xl:px-[0]">
          {/* Skeleton Breadcrum  */}
          <div className="pt-[16px] pb-[40px]">
            <nav aria-label="breadcrumb">
              <ul className="flex flex-wrap gap-[20px]">
                <li className="flex relative">
                  <span className="skeleton after:absolute after:flex after:justify-center after:content-['/'] after:w-[20px] after:h-[20px] after:right-[-20px] rounded-none after:text-grey-300 min-w-[65px] h-[17px] flex skeleton-text-animated"></span>
                </li>
                <li className="flex relative">
                  <span className="skeleton after:absolute after:flex after:justify-center after:content-['/'] after:w-[20px] after:h-[20px] after:right-[-20px] rounded-none after:text-grey-300 min-w-[65px] h-[17px] flex skeleton-text-animated"></span>
                </li>
                <li className="flex relative">
                  <span className="skeleton after:absolute after:flex after:justify-center after:content-['/'] after:w-[20px] after:h-[20px] after:right-[-20px] rounded-none after:text-grey-300 min-w-[65px] h-[17px] flex skeleton-text-animated"></span>
                </li>
                <li className="flex relative">
                  <span className="skeleton after:absolute after:flex after:justify-center after:content-[''] after:w-[20px] after:h-[20px] after:right-[-20px] rounded-none after:text-grey-300 min-w-[65px] h-[17px] flex skeleton-text-animated"></span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <section className="bg-grey-100 px-[12px] py-[16px]">
        <div className="max-w-container mx-auto flex gap-[8px] small">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-[8px]">
              <span className="skeleton skeleton-text-animated min-w-[140px] min-h-[40px] flex"></span>
            </div>
          ))}
        </div>
      </section>
      <section className="overflow-x-auto snap-x snap-mandatory bg-white px-[16px] py-[10px] xl:px-0 lg:py-[8px]">
        <div className="max-w-container mx-auto">
          <ul className="flex items-start gap-[8px]">
            {Array.from({ length: 6 }).map((_, index) => (
              <li key={index} className="min-w-[100px]">
                <span className="skeleton skeleton-text-animated !rounded-[4px] min-h-[30px] flex"></span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white ">
        <div className="max-w-container mx-auto px-[16px] xl:px-[0]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-[24px] px-[10px] gap-[20px]">
            {/* card  */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col rounded-[16px] overflow-hidden bg-white shadow-custom-3 border border-grey-200"
              >
                <div className="flex justify-end h-[72px] p-[16px] bg-blue-100">
                  <span className="skeleton skeleton-text-animated flex max-w-[40px] min-h-[40px] rounded-[50px] !m-0"></span>
                </div>
                <div className="p-[16px]">
                  <div className="min-h-[240px] gap-[16px] flex flex-col">
                    <div className="flex flex-col">
                      <span className="skeleton skeleton-text-animated flex w-full"></span>
                      <span className="skeleton skeleton-text-animated flex max-w-[90%]"></span>
                      <span className="skeleton skeleton-text-animated flex max-w-[60%]"></span>
                    </div>

                    <div className="flex flex-col">
                      <span className="skeleton skeleton-text-animated flex w-full"></span>
                      <span className="skeleton skeleton-text-animated flex max-w-[90%]"></span>
                      <span className="skeleton skeleton-text-animated flex max-w-[60%]"></span>
                    </div>
                  </div>
                  <div className="">
                    <span className="skeleton skeleton-text-animated flex w-full min-h-[37px]"></span>
                    <span className="skeleton skeleton-text-animated flex w-full min-h-[37px]"></span>
                    <span className="skeleton skeleton-text-animated flex w-full min-h-[37px]"></span>
                    <span className="skeleton skeleton-text-animated flex w-full min-h-[37px]"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Loading;
