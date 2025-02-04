"use client";
import { useState, useEffect, useRef } from "react";

import Image from "next/image";
import Form from "next/form";
import { useRouter } from "next/navigation";
import {
  currentAuthenticatedUser,
  GADataLayerFn,
} from "@packages/lib/utlils/helper-function";
export default function PgsSearch({ pgs_search_data }: any) {

  // console.log(pgs_search_data,"pgs_search_datapgs_search_datapgs_search_datapgs_search_data")
  const [isPgsUniversityClicked, setIsPgsUniversityClicked] = useState(false);
  const [qualification, setQualification] = useState({
    qualUrl: "",
    qualCode: "",
    qualDesc: "",
  });
  const [filteredsubjectlist, setFilteredsubject] = useState([]);
  const [filteredUniversity, setFilteredUniversity] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(false);
  const [qualdropdown, setQualDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState({
    description: "",
    url: "",
    categoryCode: "",
    browseCatId: "",
    parentSubject: "",
    qualCode: "",
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const universityClick = () => {
    setIsPgsUniversityClicked((prev) => !prev);
    setShowDropdown(true);
    setQualDropdown(true);
  };
  const [isPgsSearched, setIsPgsSearched] = useState(false);
  const router = useRouter();
  const handleKeyUp = (event: any) => {
    if (event.key === "Enter") {
      setIsPgsSearched(!isPgsSearched);
    }
  };

  useEffect(() => {
    const { description } = searchValue || {};

    // Early return if description is invalid or too short
    if (!description || description?.length < 3) {
      setFilteredsubject([]);
      setFilteredUniversity([]);
      return;
    }

    // Filter subjects first
    const filteredSubjects = pgs_search_data?.courseDetails?.filter(
      (subjects: any) =>
        subjects?.description?.toLowerCase()?.includes(description.toLowerCase())
    );
    // Priority search function to sort filtered results based on search text position
    const prioritySearch = (list: any, searchText: any) => {
      if (!searchText) return list;

      const searchLower = searchText?.toLowerCase();

      return list
        ?.map((item: any) => ({
          ...item,
          position: item?.description?.toLowerCase()?.indexOf(searchLower),
          startsWithSearch: item?.description
            ?.toLowerCase()
            ?.startsWith(searchLower),
          exactMatch: item?.description?.toLowerCase() === searchLower,
        }))
        .filter((item: any) => item?.position !== -1) // Only include items with searchText
        .sort((a: any, b: any) => {
          if (a?.exactMatch !== b?.exactMatch) return a?.exactMatch ? -1 : 1;
          if (a?.startsWithSearch !== b?.startsWithSearch)
            return a?.startsWithSearch ? -1 : 1;
          if (a?.position !== b?.position) return a?.position - b?.position;
          return a?.description?.localeCompare(b.description);
        })
        ?.map((item: any) => ({
          description: item?.description,
          url: item?.url,
          category_code: item?.category_code,
          browse_cat_id: item?.browse_cat_id,
          parent_subject: item?.parent_subject,
          qual_Code: item?.qual_Code,
        }));
    };
    const filteredUniversity = pgs_search_data?.collegeDetails?.filter(
      (subjects: any) =>
        subjects?.collegeNameDisplay
          ?.toLowerCase()
          ?.includes(description?.toLowerCase()) ||
          subjects?.collegeNameAlias
          ?.toLowerCase()
          ?.includes(description?.toLowerCase())
    );
    const prioritySearchcollge = (list: any, searchText: any) => {
      if (!searchText) return list;

      const searchLower = searchText?.toLowerCase();

      return list
        ?.map((item: any) => ({
          ...item,
          position: item?.collegeNameDisplay?.toLowerCase()?.indexOf(searchLower),
          startsWithSearch: item?.collegeNameDisplay
          ?.toLowerCase()
          ?.startsWith(searchLower),
          exactMatch: item?.collegeNameDisplay?.toLowerCase() === searchLower,
        }))
    
        ?.sort((a: any, b: any) => {
          if (a?.exactMatch !== b?.exactMatch) return a?.exactMatch ? -1 : 1;
          if (a?.startsWithSearch !== b?.startsWithSearch)
            return a?.startsWithSearch ? -1 : 1;
          if (a?.position !== b?.position) return a?.position - b?.position;
          return a?.collegeNameDisplay?.localeCompare(b?.collegeNameDisplay);
        })
        ?.map((item: any) => ({
          collegeId: item?.collegeId,
          collegeNameDisplay: item?.collegeNameDisplay,
          collegeNameAlias: item?.collegeNameAlias,
          collegeName: item?.collegeName,
          college_text_key:item?.college_text_key,
        }));
    };
       

    setFilteredUniversity(
      prioritySearchcollge(filteredUniversity, description)
    );
    setFilteredsubject(prioritySearch(filteredSubjects, description));
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown((prev) => !prev);
        setQualDropdown((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const keywordSearch = async () => {
    const sanitizedDescription = searchValue?.description
    ?.trim() // Remove spaces from the front and back
    ?.replace(/[^a-zA-Z0-9\s]+/g, "-") // Replace one or more special characters with a hyphen
    ?.replace(/\s+/g, "-") // Replace spaces with hyphens
    ?.replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    ?.replace(/^-|-$/g, "") // Remove hyphens from the start and end
    ?.toLowerCase(); // Convert the entire string to lowercase
    if (!searchValue?.description?.trim() && !qualification?.qualDesc) {
      return setError(true);
    } else {
      if (qualification?.qualDesc && !searchValue?.description?.trim()) {
        GADataLayerFn(
          "ga_events",
          "homepage_search",
          "keyword_search",
          sanitizedDescription,
          "NA",
          "NA",
          localStorage?.getItem("gaPageName") || "",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "in_year",
          await currentAuthenticatedUser(),
          qualification.qualDesc,
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          `${process.env.PROJECT}`,
          "NA",
          "NA"
        );
        return router.push(`${qualification.qualUrl}`);
      }
      if (searchValue?.description?.trim() && !qualification?.qualDesc) {
        GADataLayerFn(
          "ga_events",
          "homepage_search",
          "keyword_search",
          sanitizedDescription,
          "NA",
          "NA",
          localStorage?.getItem("gaPageName") || "",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "in_year",
          await currentAuthenticatedUser(),
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          `${process.env.PROJECT}`,
          "NA",
          "NA"
        );
        return router.push(`/pgs/search?keyword=${sanitizedDescription}`);
      }
      if (searchValue?.description?.trim() && qualification?.qualDesc) {
        GADataLayerFn(
          "ga_events",
          "homepage_search",
          "keyword_search",
          sanitizedDescription,
          "NA",
          "NA",
          localStorage?.getItem("gaPageName") || "",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          "in_year",
          await currentAuthenticatedUser(),
          qualification.qualDesc,
          "NA",
          "NA",
          "NA",
          "NA",
          "NA",
          `${process.env.PROJECT}`,
          "NA",
          "NA"
        );
        return router.push(
          `/pgs/search?keyword=${sanitizedDescription}&qualification=${qualification.qualUrl}`
        );
      }
    }
  };

  const courseLink = (e: any) => {
    if (qualification?.qualCode) {
      return router.push(`${e?.url}&qualification=${qualification?.qualUrl}`);
    } else {
      return router.push(`${e?.url}`);
    }
  };

  return (
    <div className="max-w-container mx-auto">
      <div
        ref={containerRef}
        className="px-[16px] py-[16px] xl:p-0 flex flex-col gap-[16px]"
      >
        <div className="bg-white rounded-[24px] p-[16px] relative z-3 border border-grey-200 hover:border-primary-500 shadow-custom-1 md:rounded-[32px] md:mt-[-28px] md:pl-[24px] md:p-[10px]">
          <div className="flex flex-col gap-[16px] small md:flex-row">
            <Form action={keywordSearch} className="relative grow">
              <input
                autoComplete="off"
                name="keyword"
                value={searchValue?.description}
                onChange={(e) => {
                  setSearchValue((prev: any) => ({
                    ...prev,
                    description: e.target.value
                    ?.replace(/\s{2,}/g, " ")
                    ?.trimStart(),
                    url: "",
                  }));
                  setError(false);
                  setQualDropdown(false);
                }}
                onClick={universityClick}
                onKeyUp={handleKeyUp}
                type="text"
                className="w-full focus:outline-none pt-0 pb-[16px] text-black placeholder:text-gray-500 border-b border-grey-200 md:py-[10px] md:border-none"
                aria-label="submenu"
                placeholder="Subject, qualification or university"
              />
              {isPgsUniversityClicked && showDropdown && qualdropdown && (
                <div className="flex flex-col w-[calc(100%+32px)] absolute z-[1] bg-white shadow-custom-3 rounded-[8px] left-[-16px] top-[53px] md:w-[345px]">
                  <div className="x-small font-semibold uppercase px-[16px] py-[10px] text-neutral-700 bg-neutral-50">
                    QUALIFICATION
                  </div>
                  <ul>
                    {pgs_search_data?.studyLevelList?.map(
                      (item: any, index: any) => (
                        <li
                          onClick={() => {
                            setQualification(item);

                            universityClick();
                          }}
                          key={index}
                          className="px-[16px] py-[10px] block hover:bg-blue-50 hover:underline cursor-pointer"
                        >
                          {item?.qualDesc}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              {showDropdown && searchValue?.description?.length > 2 && (
                <div
                  //   ref={containerRef}
                  className="flex flex-col w-[calc(100%+32px)] absolute z-[1] bg-white shadow-custom-3 rounded-[8px]  left-[-16px] top-[53px] custom-scrollbar-2 min-h-[285px]
                  max-h-[297px] overflow-y-auto mr-[4px]"
                >
                  {searchValue?.description?.length > 2 && (
                    <div onClick={() => keywordSearch()}>
                      <div className="px-[16px] py-[12px]">
                        <p className="x-small font-semibold text-black tracking-[1px] leading-[18px]">
                          KEYWORD SEARCH FOR
                        </p>
                        <p className="small text-primary-400">
                          {` '${searchValue?.description}'`}
                        </p>
                      </div>
                    </div>
                  )}
                  {filteredsubjectlist?.length > 0 && (
                    <>
                      <div className="x-small font-semibold uppercase px-[16px] py-[10px] text-neutral-700 bg-neutral-50">
                        COURSES
                      </div>
                      <ul>
                        {filteredsubjectlist?.map((item: any, index) => (
                          <div
                            key={index}
                            onClick={async () => {
                              setSearchValue(item);
                              GADataLayerFn(
                                "ga_events",
                                "homepage_search",
                                "subject_search",
                                "NA",
                                item?.parentSubject
                                  ? item?.parentSubject
                                  : item?.description,
                                item?.parentSubject ? item?.description : "NA",
                                localStorage?.getItem("gaPageName") || "",
                                "NA",
                                "NA",
                                "NA",
                                "NA",
                                "NA",
                                "NA",
                                "NA",
                                "NA",
                                "NA",
                                "in_year",
                                await currentAuthenticatedUser(),
                                qualification?.qualDesc,
                                "NA",
                                "NA",
                                "NA",
                                "NA",
                                "NA",
                                `${process.env.PROJECT}`,
                                "NA",
                                "NA"
                              );

                              courseLink(item);
                            }}
                            className="px-[16px] py-[10px] block hover:bg-blue-50  hover:underline cursor-pointer"
                          >
                            <span className="text-grey900 ">
                              {item?.description}
                            </span>{" "}
                            {/* <span className="text-grey-700">{item.course}</span> */}
                          </div>
                        ))}
                      </ul>
                    </>
                  )}
                  {filteredUniversity?.length > 0 && (
                    <>
                      <div className="x-small font-semibold uppercase px-[16px] py-[10px] text-neutral-700 bg-neutral-50">
                        INSTITUTIONS
                      </div>
                      <ul>
                        {filteredUniversity?.map((item: any, index) => (
                          <a
                            href={`/universities/${item?.college_text_key}`}
                            key={index}
                            onClick={async () => {
                              GADataLayerFn(
                                "ga_events",
                                "homepage_search",
                                "university_search",
                                "NA",
                                "NA",
                                "NA",
                                localStorage?.getItem("gaPageName") || "",
                                "NA",
                                item?.collegeNameDisplay,
                                "NA",
                                "NA",
                                "NA",
                                item?.collegeId,
                                "NA",
                                "NA",
                                "NA",
                                "in_year",
                                await currentAuthenticatedUser(),
                                "NA",
                                "NA",
                                "NA",
                                "NA",
                                "NA",
                                "NA",
                                `${process.env.PROJECT}`,
                                "NA",
                                "NA"
                              );
                            }}
                            className="px-[16px] py-[10px] block hover:bg-blue-50  hover:underline cursor-pointer"
                          >
                            <span className="text-grey900">
                              {item?.collegeNameDisplay}
                            </span>{" "}
                            {/* <span className="text-grey-700">{item.course}</span> */}
                          </a>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </Form>
            {qualification?.qualDesc && (
              <div className="flex items-center justify-between gap-[4px] bg-gray-100 text-grey-500 font-semibold px-[12px] py-[8px] rounded-[4px]">
                <span>{qualification?.qualDesc}</span>

                <svg
                  className="cursor-pointer"
                  onClick={() =>
                    setQualification({
                      qualUrl: "",
                      qualCode: "",
                      qualDesc: "",
                    })
                  }
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="#1f2937"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="#1f2937"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            <button
              type="submit"
              onClick={() => keywordSearch()}
              className="btn btn-primary w-full flex items-center justify-center gap-[6px] px-[24px] py-[10px] md:w-[114px]"
            >
              <Image
                src="/static/assets/icons/search_icon.svg"
                width="18"
                height="18"
                alt="Search icon"
              />
              Search
            </button>
          </div>
        </div>
        {error && (
          <p className="small text-negative-default">
            Enter subject, qualification or university
          </p>
        )}
      </div>
    </div>
  );
}
