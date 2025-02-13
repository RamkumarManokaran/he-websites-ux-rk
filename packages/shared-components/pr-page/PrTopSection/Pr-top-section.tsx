import React from "react";
import Image from "next/image";
import Link from "next/link";
const PrPageTopSection = () => {
  return (
    <section className="bg-white">
      <div className="max-w-container mx-auto px-[16px] md:px-[24px] xl:px-[0]">
        <div className="flex justify-between w-full py-[16px]">
          <div className="flex gap-[17px]">
            <span className="p-[4px] bg-white rounded-[8px] hidden md:block shadow-custom-1 min-w-[64px] h-[64px]">
              <img
                src="/static/assets/icons/search-result/kent.png"
                alt="University logo"
                width={56}
                height={56}
              />
            </span>
            <div className="flex flex-col gap-[4px]">
              <div className="h5 heading5 font-farro text-black">
                University of kent
              </div>
              <span className="para">1563 courses available </span>
              <div className="flex items-center gap-[8px] text-blue-400 small">
                <span className="flex items-center">
                  <Image
                    alt="blue star icon"
                    className="relative top-[-1px]"
                    width="24"
                    height="24"
                    src="/static/assets/icons/blue-star-icon.svg"
                  />
                  4.6
                </span>
                <Link href="#" className="underline ">
                  400 reviews
                </Link>
              </div>
              <ul className="flex mt-[4px] flex-wrap gap-[8px]">
                <li className="flex text-nowrap select-none rounded-[4px] font-bold uppercase px-[8px] bg-grey-100 text-grey-500 xs-small">
                  REGION
                </li>
                <li className="flex text-nowrap select-none rounded-[4px] font-bold uppercase px-[8px] bg-green-100 text-positive-dark xs-small">
                  <Image
                    src="/static/assets/icons/search-result/location-green.svg"
                    width="16"
                    height="16"
                    alt="location icon"
                  />
                  18.1 Miles from you
                </li>
                <li className="relative group text-nowrap uppercase underline text-blue-400 x-small">
                  <span>
                    WUSCA ranking: 18th
                    <div
                      className="absolute select-none hidden group-hover:flex border border-grey-200 top-[20px] shadow-custom-1 whitespace-normal normal-case rounded-[8px] max-w-[100%] md:min-w-[320px] min-w-[200px] left-[-16px] md:left-0  bg-white p-[12px] flex-col gap-[4px] after:content-[''] after:absolute after:w-[8px] after:h-[8px] after:bg-white after:left-[30px] after:z-0 after:top-[-5px] after:border after:translate-x-2/4 after:translate-y-0 after:rotate-45 after:border-b-0 after:border-r-0
                "
                    >
                      <span className="x-small text-grey900 font-semibold">
                        Why should you trust our uni reviews?
                      </span>
                      <p className="x-small text-grey300">
                        All our reviews are from real students, submitted using
                        their verified university email address.
                      </p>
                    </div>
                  </span>
                </li>
                <li className="flex text-nowrap select-none rounded-[4px] font-bold uppercase px-[8px] bg-green-100 text-positive-dark xs-small">
                  Lecturers and Teaching
                </li>
                <li className="flex text-nowrap select-none rounded-[4px] font-bold uppercase px-[8px] bg-green-100 text-positive-dark xs-small">
                  + 2 more
                </li>
              </ul>
            </div>
          </div>
          <span className="favorite group mr-[0] lg:mr-[10px]  items-center justify-center flex min-w-[40px] w-[40px] h-[40px]  border border-primary-400 hover:bg-primary-400 rounded-[48px] cursor-pointer">
            <div className="heart min-w-[40px] w-[40px] h-[40px] bg-white border border-blue-500 rounded-[24px] flex items-center justify-center cursor-pointer hover:bg-blue-100">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.02513 5.05027C2.65829 6.41711 2.65829 8.63318 4.02513 10L10 15.9749L15.9749 10C17.3417 8.63318 17.3417 6.41711 15.9749 5.05027C14.608 3.68344 12.392 3.68344 11.0251 5.05027L10 6.07544L8.97487 5.05027C7.60804 3.68344 5.39196 3.68344 4.02513 5.05027Z"
                  stroke="#4664DC"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </span>
        </div>
      </div>
    </section>
  );
};

export default PrPageTopSection;
