import React from "react";

const AdviceCourseCardSkeleton = () => {
  return (
    <div className={`advice-container`}>
      <div className="max-w-container mx-auto">
        <div className="advice-card-container px-[0] py-[34px] md:py-[64px]">
          <div className="advice-header px-[20px] xl:px-[0] mb-[26px] md:mb-[32px]">
            <div className="skeleton skeleton-text-animated small_heading !w-[20%]"></div>
            <div className="skeleton skeleton-text-animated page-heading !w-[60%]"></div>
          </div>
          <div className="advice-course-container ">
            <div className="advice-inner-wrap">
              <div className="advice-course-container">
                <div className="advicecourse-inner-wrap flex flex-col md:flex-row justify-start gap-[16px] px-[16px] md:px-[20px] lg:px-[0]">
                  <div className="card flex flex-col bg-white rounded-[8px] shadow-custom-2 w-full md:w-[48%] lg:w-[33.3%]">
                    <div className="card-header">
                      <div className="skeleton skeleton-thumb-img skeleton-text-animated min-h-[221px]"></div>
                    </div>
                    <div className="card-body flex flex-col gap-[10px] p-[16px]">
                      <h5 className="card-title">
                        <div className="skeleton skeleton-text skeleton-text-animated large_heading"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated small_heading"></div>
                      </h5>
                      <div className="card-description">
                        <div className="skeleton skeleton-text skeleton-text-animated"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated"></div>
                      </div>
                      <div className="card-date">
                        <div className="skeleton skeleton-text skeleton-text-animated !w-[100px]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card flex flex-col bg-white rounded-[8px] shadow-custom-2 w-full md:w-[48%] lg:w-[33.3%]">
                    <div className="card-header">
                      <div className="skeleton skeleton-thumb-img skeleton-text-animated min-h-[221px]"></div>
                    </div>
                    <div className="card-body flex flex-col gap-[10px] p-[16px]">
                      <h5 className="card-title">
                        <div className="skeleton skeleton-text skeleton-text-animated large_heading"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated small_heading"></div>
                      </h5>
                      <div className="card-description">
                        <div className="skeleton skeleton-text skeleton-text-animated"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated"></div>
                      </div>
                      <div className="card-date">
                        <div className="skeleton skeleton-text skeleton-text-animated !w-[100px]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card flex flex-col bg-white rounded-[8px] shadow-custom-2 w-full md:w-[48%] lg:w-[33.3%]">
                    <div className="card-header">
                      <div className="skeleton skeleton-thumb-img skeleton-text-animated min-h-[221px]"></div>
                    </div>
                    <div className="card-body flex flex-col gap-[10px] p-[16px]">
                      <h5 className="card-title">
                        <div className="skeleton skeleton-text skeleton-text-animated large_heading"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated small_heading"></div>
                      </h5>
                      <div className="card-description">
                        <div className="skeleton skeleton-text skeleton-text-animated"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated"></div>
                      </div>
                      <div className="card-date">
                        <div className="skeleton skeleton-text skeleton-text-animated !w-[100px]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-[16px] lg:mt-[20px]">
                <a
                  href="#"
                  className="flex items-center w-fit font-semibold small text-primary-400 hover:underline gap-[8px]"
                >
                  <div className="skeleton skeleton-text-animated page-heading !w-[100px]"></div>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.4814 0.814819L14.6666 6M14.6666 6L9.4814 11.1852M14.6666 6L1.33325 6"
                      stroke="#e6e6e6"
                      strokeWidth="1.48148"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceCourseCardSkeleton;
