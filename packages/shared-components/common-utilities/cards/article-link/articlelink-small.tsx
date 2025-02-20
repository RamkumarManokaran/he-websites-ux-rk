import React from "react";
import Link from "next/link";
import Image from "next/image";
const LinkcardSmall = ({ linkdata }: any) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="para-lg font-semibold">{linkdata?.navTitle}</div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[8px] w-full">
        {linkdata?.navChildC1Collection?.items?.map(
          (items: any, index: number) => (
            <React.Fragment key={index + 1}>
              {items?.navUrl && (
                <li>
                  <Link
                    href={items?.navUrl}
                    title={items?.navTitle}
                    className="w-full flex justify-between gap-[4px] p-[12px_16px] border border-grey-200 hover:border-primary-400 rounded-[4px] bg-white hover:bg-primary-50 transition-all"
                  >
                    <span className="flex items-center font-semibold small gap-[4px]">
                      {items?.navIcon?.url && (
                        <Image
                          src={items?.navIcon?.url}
                          width="24"
                          height="24"
                          alt="article link"
                        />
                      )}
                      {items?.navTitle}
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 7L15 12L10 17"
                        stroke="#4664DC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              )}
            </React.Fragment>
          )
        )}
      </ul>
    </div>
  );
};

export default LinkcardSmall;
