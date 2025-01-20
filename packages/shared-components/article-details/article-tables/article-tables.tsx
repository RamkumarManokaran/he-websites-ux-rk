import React from "react";
import Image from "next/image";

const Articletables = ({ propsdata, key, preview }: any) => {
  const tableQualificationData = [
    {
      qualification: "UCAS points",
      requirments: "96-159",
    },
    {
      qualification: "A-levels",
      requirments: "AAA - CCC",
    },
    {
      qualification: "BTECs",
      requirments: "DDD - MMM",
    },
    {
      qualification: "Scottish Highers	",
      requirments: "AAAAB-BBBB",
    },
    {
      qualification: "Advanced Highers",
      requirments: "AAB-BBB",
    },
    {
      qualification: "International Baccalaureate",
      requirments: "38 – 26",
    },
  ];
  const tableUniversityData = [
    {
      rank: "1st",
      rankRating: "1",
      rankRatingIcon: "",
      universityName: "University of Kent",
      universityLogo:
        "/static/assets/images/article-details/university-logo.svg",
      universityrating: "4.5",
      score: "100.0",
    },
    {
      rank: "2nd",
      rankRating: "3",
      rankRatingIcon: "./static/assets/icons/green-toparrowicon.svg",
      universityName: "Roehamption University",
      universityLogo: "/static/assets/images/article-details/R.svg",
      universityrating: "4.5",
      score: "98.3",
    },
    {
      rank: "3rd",
      rankRating: "2",
      rankRatingIcon: "./static/assets/icons/red-downarrow-icon.svg",
      universityName: "Bangor University",
      universityLogo: "/static/assets/images/article-details/bangor.svg",
      universityrating: "4.5",
      score: "96.0",
    },
    {
      rank: "4th",
      rankRating: "7",
      rankRatingIcon: "./static/assets/icons/red-downarrow-icon.svg",
      universityName: "University of Hertfordshire",
      universityLogo: "/static/assets/images/article-details/uh.svg",
      universityrating: "4.5",
      score: "95.8",
    },
    {
      rank: "5th",
      rankRating: "5",
      rankRatingIcon: "./static/assets/icons/green-toparrowicon.svg",
      universityName: "University of Chichester",
      universityLogo: "/static/assets/images/article-details/18.svg",
      universityrating: "4.5",
      score: "95.7",
    },
  ];
  // table for qualification with requirments
  const tableQualification = tableQualificationData.map((items, index) => (
    <div
      key={index}
      className="py-[12px] pl-[24px] pr-[20px] flex justify-between border-b-[1px] border-grey-200"
    >
      <span className="font-inter small text-grey300 font-medium">
        {items.qualification}
      </span>
      <span className="font-inter small text-grey300 font-medium">
        {items.requirments}
      </span>
    </div>
  ));
  // Table for ranking unversity guide
  const tableuniversity = tableUniversityData.map((items, index) => (
    <div
      key={index}
      className="flex justify-between pl-[24px] pr-[20px] py-[5px] border-b-[1px] border-grey-200"
    >
      <div className="flex">
        <div className="flex min-w-[92px] md:min-w-[124px] justify-between pr-[34px]">
          <span className="content-center font-inter small text-grey300 font-medium">
            {items.rank}
          </span>
          <div
            key={items.rankRatingIcon}
            className="flex flex-col items-center justify-center md:flex-row "
          >
            {items.rankRatingIcon ? (
              <>
                <Image
                  src={items.rankRatingIcon}
                  width={16}
                  height={16}
                  alt="icon"
                  aria-label={`Rank rating icon for ${items.rankRating}`}
                />
              </>
            ) : (
              <></>
            )}

            <span className="content-center font-inter small text-grey400 font-normal">
              {items.rankRating}
            </span>
          </div>
        </div>
        <div className="flex gap-[12px]">
          <span className="shadow-custom-1 hidden md:flex overflow-hidden rounded-[8px] w-[64px] h-[64px]">
            <Image
              src={items.universityLogo}
              width="64"
              height="64"
              alt="university logo"
            />
          </span>

          <div className="flex flex-col justify-center">
            <span className="font-inter small text-grey300 font-semibold">
              {items.universityName}
            </span>
            <div className="flex items-center">
              <Image
                src="/static/assets/icons/blue-star.svg"
                width="24"
                height="24"
                alt="star-blue"
              />
              <span className="align-middle font-inter small text-grey300 font-normal">
                {items.universityrating}
              </span>
            </div>
          </div>
        </div>
      </div>

      <span className="content-center hidden md:block font-inter small text-grey300 font-medium">
        {items.score}
      </span>
    </div>
  ));

  return (
    <>
      <div>
        <div className="flex flex-col">
          <div className="bg-grey-100 py-[12px] px-[24px] flex justify-between border-b-[1px] border-grey-200">
            <span className="font-inter x-small tracking-[1px] text-grey300 uppercase font-semibold">
              QUALIFICATION
            </span>
            <span className="font-inter x-small tracking-[1px] text-grey300 uppercase font-semibold">
              REQUIREMENTS
            </span>
          </div>
          {tableQualification}
        </div>
        <div className="flex flex-col">
          <span className="py-[16px] px font-inter tracking-[1px] x-small text-grey-500 uppercase font-semibold">
            SOURCE: COMPLETE UNIVERSITY GUIDE
          </span>
          <div className="bg-grey-100 py-[12px] flex justify-between px-[24px] border-b-[1px] border-grey-200">
            <div className="flex">
              <span className="min-width-[60px] md:min-w-[124px] font-inter x-small tracking-[1px] text-grey300 uppercase font-semibold">
                RANK
              </span>
              <span className="pl-[56px] md:pl-[24px] font-inter x-small tracking-[1px] text-grey300 uppercase font-semibold">
                University name
              </span>
            </div>
            <span className="font-inter hidden md:block x-small tracking-[1px] text-grey300 uppercase font-semibold">
              Score
            </span>
          </div>
          {tableuniversity}
        </div>
      </div>
    </>
  );
};

export default Articletables;
