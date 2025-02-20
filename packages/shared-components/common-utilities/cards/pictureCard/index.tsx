import Image from "next/image";

import React from "react";

type pictureCardProps = {
  imgSrc: string;
  text: string;
  link: string;
};

const PictureCard = ({ imgSrc, text, link }: pictureCardProps) => {
  return (
    <a href={link} key={text}>
      <div className="card flex flex-col bg-white rounded-[8px] shadow-custom-2 hover:opacity-85 after:absolute after:inset-0 after:bg-custom-gradient after:z-10 after:rounded-[8px]">
        <Image
          src={imgSrc || ""}
          alt={text}
          objectFit="cover"
          width={290}
          height={290}
          className="z-0 rounded-[8px] "
        />

        <div className="card-body flex flex-col gap-[10px] p-[16px]">
          <h5 className="card-title font-semibold text-para-lg line-clamp-2">
            Everything you need to know about University Open Days
          </h5>
          <p className="card-description font-normal small line-clamp-2">
            You’ve probably heard from your teachers, friends or parents about
            university open days and campus tours. But what exactly are they,
            and what can you get out of them? Let’s go through everything about
            uni open days step by step.
          </p>
          <p className="card-date font-normal x-small text-neutral-500">
            11 oct 2023
          </p>
        </div>
      </div>
    </a>
  );
};

export default PictureCard;
