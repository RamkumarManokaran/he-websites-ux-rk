import React from "react";
import Getprospectus from "../interaction-button/getprospectus";
import Viewprofile from "../interaction-button/viewprofile";
import Image from "next/image";

const Findauniresultscard = () => {
  return (
    <div className="uniresults-inner-wrap flex flex-col md:flex-row shadow-[0px_1px_2px_-1px_rgba(16,24,40,0.1),0px_1px_3px_0px_rgba(16,24,40,0.1)] rounded-[8px]">
      <div className="uniresults-left relative z-0 rounded-t-[8px] md:rounded-t-[0] md:!rounded-l-[8px] overflow-hidden">
        <Image
          src="/static/assets/images/uni_tile1.jpg"
          width="200"
          height="130"
          alt="University thumb"
        />
        <div className="overlay absolute z-0 top-0 left-0 right-0 bottom-0 bg-gradientBlack opacity-[30%]"></div>
        <div className="absolute z-0 top-[8px] left-[8px] rounded-[8px] overflow-hidden">
          <Image
            src="/static/assets/images/uni_logo_tile1.jpg"
            width="64"
            height="64"
            alt="University logo"
          />
        </div>
      </div>
      <div className="uniresults-right flex flex-col justify-between p-[16px] w-full md:w-[calc(100%_-_200px)] gap-[16px] md:flex-row">
        <div className="uniresults-content-left flex flex-col gap-[3px] w-full md:w-[calc(100%_-_334px)]">
          <a
            href="#"
            className="block w-fit font-semibold para text-secondary-500 hover:text-secondary-600 hover:underline"
          >
            <span className="line-clamp-2">University of Kent</span>
          </a>
          <div className="rating-pod flex items-center gap-[8px]">
            <div className="rating-card flex items-center">
              <Image
                src="/static/assets/icons/blue-star-icon.svg"
                width="24"
                height="24"
                alt="Rating icon"
              />
              <span className="font-normal small text-secondary-500">4.6</span>
            </div>
            <a
              href="#"
              className="reviewLink block font-normal small text-secondary-500 hover:text-secondary-600 underline"
            >
              400 reviews
            </a>
          </div>
          <div className="font-normal small text-neutral-900">
            WUSCA ranking:&nbsp;88th
          </div>
        </div>
        <div className="uniresults-content-right flex items-end">
          <div className="btn-pod flex gap-[8px]">
            <Getprospectus />
            <Viewprofile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Findauniresultscard;
