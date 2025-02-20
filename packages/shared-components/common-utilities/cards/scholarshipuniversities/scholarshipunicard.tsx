"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Scholarshipunicard = () => {
  return (
    <Link
      href=""
      className="card flex flex-col bg-white border border-grey-200 lg:hover:border-primary-400 rounded-[8px] shadow-custom-2 overflow-hidden"
    >
      <div className="card-header relative min-h-[190px] bg-grey-200">
        <Image
          src="/static/assets/images/article_image1.jpg"
          width="392"
          height="221"
          className="block w-full h-auto min-h-[185px]"
          alt="Article_image"
        />
        <div className="absolute z-0 top-[8px] left-[8px] rounded-[8px] overflow-hidden">
          <Image
            src="/static/assets/images/uni_logo_tile1.jpg"
            width="64"
            height="64"
            alt="University logo"
          />
        </div>
      </div>
      <div className="card-body flex flex-col justify-between gap-[30px] p-[16px] min-h-[106px]">
        <div className="flex flex-col gap-[8px] w-full">
          <div className="card-title font-farro para-lg font-bold text-grey300 line-clamp-1">
            Uni name
          </div>
          <div className="rating-pod flex items-center gap-[8px]">
            <div className="rating-card flex items-center gap-[4px]">
              <Image
                src="/static/assets/icons/blue-star-icon.svg"
                width="24"
                height="24"
                alt="Rating icon"
              />
              <span className="font-normal small text-grey300">4.6</span>
            </div>
            <span className="reviewLink block font-normal small text-primary-400 hover:text-primary-500 hover:underline">
              400 reviews
            </span>
          </div>
        </div>
        <p className="card-date font-normal small text-grey-700">
          00 Scholarships
        </p>
      </div>
    </Link>
  );
};

export default Scholarshipunicard;
