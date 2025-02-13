"use server";
import React from "react";
import Image from "next/image";
import Link from "next/link";
const ExploreArticles = () => {
  return (
    <div className="flex flex-col item-center border-[1px] border-grey-200 rounded-[8px] lg:flex-row">
      <div className="w-full md:h-[193px] lg:h-[221px] lg:w-[392px] shrink-0">
        <Image
          src="/static/assets/images/search-results/article2.jpg"
          width={392}
          height={221}
          alt="Article"
          className="w-full h-full object-cover rounded-t-[8px] lg:w-[392px] lg:rounded-l-[8px] lg:rounded-tr-none"
        />
      </div>
      <div className="p-[16px] shadow-custom-2 flex flex-col gap-[8px] text-grey300 lg:px-[24px] lg:py-[32px]">
        <div className="h4">Studying in London</div>
        <div className="small line-clamp-4">
          A Law degree will teach students about issues that relate to different
          areas of society; from business and the environment, to human rights
          and trade. Students will develop key skills like research, critical
          analysis and presentation, which will prepare them to practice law.
          There are different strands of law such as LLB, BA and BSc Law
          first-degree courses. Graduates have the option of pursuing careers
          within law or in other areas such as academia...
        </div>
        <Link
          href=""
          className="flex items-center gap-[4px] text-primary-400 small font-semibold hover:underline"
        >
          View full guide
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 5.61377L12 10.6138L7 15.6138"
              stroke="#4664DC"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ExploreArticles;
