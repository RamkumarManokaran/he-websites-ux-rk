import Image from "next/image";
import React from "react";

const Discovercard = () => {
  return (
    <div className="discover-card">
      <a href="#" className="bg-primary-100 rounded-[8px] overflow-hidden">
        <div className="discover-card flex justify-between gap-[8px]">
          <div className="flex flex-col justify-between p-[20px] pr-[0]">
            <div className="w-fit uppercase font-bold x-small text-primary-500 bg-white/[.6] px-[6px] py-[2px] rounded-[4px]">
              courses
            </div>
            <div className="h5">Looking for courses?</div>
          </div>
          <Image
            src={`${process.env.SUBDOMAIN}/static/assets/images/discover/discover-feature-image1x3x.png`}
            width="186"
            height="200"
            alt="discover"
          />
        </div>
      </a>
    </div>
  );
};

export default Discovercard;
