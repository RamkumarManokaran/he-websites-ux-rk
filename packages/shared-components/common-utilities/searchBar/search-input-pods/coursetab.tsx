"use client";
import React from "react";
import Image from "next/image";
import { SearchFormHandle } from "@packages/lib/types/interfaces";
import Form from "next/form";
import { useState, useEffect, useRef } from "react";

import {
  GADataLayerFn,
  currentAuthenticatedUser,
} from "@packages/lib/utlils/helper-function";

import { fetchAuthSession } from "aws-amplify/auth";
import { getCookie } from "@packages/lib/utlils/helper-function";
interface CourseTabProps {
  searchFormHandle: any;
  setsearchFormHandle: any;
  data: any;
  placeholder: any;
}

const CourseTab: React.FC<CourseTabProps> = ({
  searchFormHandle,
  setsearchFormHandle,
  data,
  placeholder,
}) => {
  let ucasval: any = 0;
  let min: any = 0;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<any>(false);
  const [subjectlist, setSubjectlist] = useState(data?.courseDetails);
  const [locationlist, setLocationlist] = useState(data?.locationList);
  const [studymodelist, setStudymodelist] = useState(data?.studyLevelList);
  const [dropdownIndex, setdropdownIndex] = useState<number>(0);
  const [dropdownIndexQual, setdropdownIndexQual] = useState<number>(0);
  const [filteredsubject, setFilteredsubject] = useState<
    { [key: string]: any; description: string }[] | any
  >(undefined);

  const [subjecterror, setSubjecterror] = useState(false);
  const [dropdown, setDropdown] = useState<boolean>(false);

  console.log("test")
  useEffect(() => {
    setSubjectlist(data?.courseDetails);
    setLocationlist(data?.locationList);
    setStudymodelist(data?.studyLevelList);
  }, [data]);
  // ==============================use effect to check the use authentication======================================================================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await fetchAuthSession();

        if (session.tokens) {
          const hasAccessToken = session.tokens.accessToken !== undefined;
          const hasIdToken = session.tokens.idToken !== undefined;
          if (hasAccessToken && hasIdToken) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // ==========================use effect for the handle click outside========================================================================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        courseActions("UG");
        courseActions("Subject");
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ============================== use effect for filter subject list========================================================================
  useEffect(() => {
    const { description } = searchFormHandle.subject || {};
    const { qualCode } = searchFormHandle.courseType || {};
    if (!description?.trim() || description?.trim().length < 3) {
      setFilteredsubject([]);
      return;
    }
    const filteredSubjects = subjectlist?.filter(
      (subjects: any) =>
        subjects?.description
          ?.toLowerCase()
          .includes(description?.trim()?.toLowerCase()) &&
        subjects?.qualCode === qualCode
    );
    const prioritySearch = (
      list: { description: string; [key: string]: any }[],
      searchText: string
    ): { description: string; [key: string]: any }[] => {
      if (!searchText) return list;
      const searchLower = searchText?.toLowerCase();
      return list
        ?.map((item) => ({
          ...item,
          position: item?.description?.toLowerCase().indexOf(searchLower),
          startsWithSearch: item?.description
            ?.toLowerCase()
            ?.startsWith(searchLower),
          exactMatch: item?.description?.toLowerCase() === searchLower,
        }))

        .filter((item) => item.position !== -1)
        .sort((a, b) => {
          if (a.exactMatch !== b.exactMatch) return a.exactMatch ? -1 : 1;
          if (a.startsWithSearch !== b.startsWithSearch)
            return a.startsWithSearch ? -1 : 1;
          if (a.position !== b.position) return a.position - b.position;
          return a?.description?.localeCompare(b?.description);
        })
        ?.map((item: any) => ({
          description: item?.description,
          url: item.url,
          category_code: item.category_code,
          browse_cat_id: item.browse_cat_id,
          parent_subject: item.parentSubject,
          qual_Code: item.qualCode,
        }));
    };
    setFilteredsubject(prioritySearch(filteredSubjects, description?.trim()));
  }, [
    searchFormHandle?.subject?.description,
    searchFormHandle.courseType.qualCode,
  ]);

  // ====================================================use effect for the clear subject on qual change============================================================================================
  useEffect(() => {
    setsearchFormHandle((prevData: any) => ({
      ...prevData,
      subject: {
        ...prevData.subject,
        url: null,
        parent_subject: null,
        category_code: null,
        browse_cat_id: "KW",
        description: "",
      },
    }));
  }, [searchFormHandle.courseType.qualCode]);
  const resetAllTabs = (currentTab: string) => ({
    isCourseType: currentTab === "UG" ? !searchFormHandle?.isCourseType : false,
    isSubjectClicked:
      currentTab === "Subject" ? !searchFormHandle?.isSubjectClicked : false,
    isLocationClicked:
      currentTab === "Location" ? !searchFormHandle?.isLocationClicked : false,
  });

  const courseActions = (tabName: string) => {
    setsearchFormHandle((prevData: SearchFormHandle) => ({
      ...prevData,
      ...resetAllTabs(tabName),
    }));
  };
  // ============================serch handler===============================================================================================================
  const searchHandler = async () => {
    if (isAuthenticated) {
      const cookiesval = decodeURIComponent(getCookie("ucaspoint") || "");
      const minval: any = getCookie("min");
      min = parseInt(minval, 10);
      ucasval = cookiesval;
    } else {
      const minval: any = getCookie("min");
      min = parseInt(minval, 10);
      const cookiesval1: any = decodeURIComponent(getCookie("UCAS") || "{}");
      const point: any = JSON.parse(cookiesval1);
      ucasval = point?.ucasPoint;
    }
    if (
      searchFormHandle.location.regionName &&
      !searchFormHandle.subject.url &&
      !searchFormHandle?.subject?.description?.trim()
    ) {
      setSubjecterror(true);
    }
    if (!searchFormHandle?.subject?.description?.trim()) {
      setSubjecterror(true);
    }
    if (
      searchFormHandle.location?.regionName &&
      searchFormHandle.subject?.url
    ) {
      const sanitizedRegionName = searchFormHandle.location.regionName
        .trim() // Remove spaces from the front and back
        .replace(/[^a-zA-Z0-9\s]+/g, "-") // Replace one or more special characters with a hyphen
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
        .replace(/^-|-$/g, "") // Remove hyphens from the start and end
        ?.toLowerCase(); // Convert the entire string to lowercase

      
      GADataLayerFn(
        "ga_events",
        "homepage_search",
        "subject_search",
        "NA",
        searchFormHandle?.subject?.parent_subject
          ? searchFormHandle?.subject?.parent_subject
          : searchFormHandle?.subject?.description,
        searchFormHandle?.subject?.parent_subject
          ? searchFormHandle?.subject?.description
          : "NA",
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
        searchFormHandle?.courseType?.qualDesc,
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        `${process.env.PROJECT}`,
        "NA",
        "NA"
      );
      
      window.location.href=(
        `${process.env.NEXT_PUBLIC_ENVIRONMENT === "prd" ? "https://www.whatuni.com" :""}${searchFormHandle.subject.url}&location=${sanitizedRegionName}${ucasval ? `&score=${min ? min : "0"},${ucasval}` : ""}`
      );
    
    } else if (searchFormHandle.subject?.url) {
      GADataLayerFn(
        "ga_events",
        "homepage_search",
        "subject_search",
        "NA",
        searchFormHandle?.subject?.parent_subject
          ? searchFormHandle?.subject?.parent_subject
          : searchFormHandle?.subject?.description,
        searchFormHandle?.subject?.parent_subject
          ? searchFormHandle?.subject?.description
          : "NA",
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
        "0",
        searchFormHandle?.courseType?.qualDesc,
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        `${process.env.PROJECT}`,
        "NA",
        "NA"
      );
     
      window.location.href=(
        `${process.env.NEXT_PUBLIC_ENVIRONMENT === "prd" ? "https://www.whatuni.com" :""}${searchFormHandle.subject.url}${ucasval ? `&score=${min ? min : "0"},${ucasval}` : ""}`
      );
    } else if (searchFormHandle?.subject?.description?.trim()) {
      keywordSearch(true);
    }
  };


  const keywordSearch = async (canmatch: any) => {
    const sanitizedDescription = searchFormHandle?.subject?.description
      .trim()
      .replace(/[^a-zA-Z0-9\s]+/g, "-")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

      ?.toLowerCase();
    const searchUrlMap: Record<string, string> = {
      M: "/degree-courses/search",
      N: "/hnd-hnc-courses/search",
      T: "/access-foundation-courses/search",
      A: "/foundation-degree-courses/search",
      L: "/postgraduate-courses/search",
    };
    const matchedSubject = filteredsubject?.find(
      (item: any) =>
        item?.description?.toLowerCase() ===
        searchFormHandle?.subject?.description?.trim()?.toLowerCase()
    );

    if (searchFormHandle.location?.regionName && matchedSubject && canmatch) {
      const sanitizedRegionName = searchFormHandle.location.regionName
        .trim() // Remove spaces from the front and back
        .replace(/[^a-zA-Z0-9\s]+/g, "-") // Replace one or more special characters with a hyphen
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
        .replace(/^-|-$/g, "") // Remove hyphens from the start and end
        ?.toLowerCase(); // Convert the entire string to lowercase
      GADataLayerFn(
        "ga_events",
        "homepage_search",
        "subject_search",
        "NA",
        matchedSubject?.parent_subject
          ? matchedSubject?.parent_subject
          : matchedSubject?.description,
        matchedSubject?.parent_subject ? matchedSubject?.description : "NA",
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
        searchFormHandle?.courseType?.qualDesc,
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        `${process.env.PROJECT}`,
        "NA",
        "NA"
      );
      return window.location.href=(
        `${process.env.NEXT_PUBLIC_ENVIRONMENT === "prd" ? "https://www.whatuni.com" :""}${matchedSubject.url}&location=${sanitizedRegionName}${ucasval ? `&score=${min ? min : "0"},${ucasval}` : ""}`
      );
    }
    if (matchedSubject && canmatch) {
      GADataLayerFn(
        "ga_events",
        "homepage_search",
        "subject_search",
        "NA",
        matchedSubject?.parent_subject
          ? matchedSubject?.parent_subject
          : matchedSubject?.description,
        matchedSubject?.parent_subject ? matchedSubject?.description : "NA",
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
        searchFormHandle?.courseType?.qualDesc,
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        `${process.env.PROJECT}`,
        "NA",
        "NA"
      );
      return window.location.href=(
        `${process.env.NEXT_PUBLIC_ENVIRONMENT === "prd" ? "https://www.whatuni.com" :""}${matchedSubject.url}${ucasval ? `&score=${min ? min : "0"},${ucasval}` : ""}`
      );
    }
    const baseUrl = searchUrlMap[searchFormHandle.courseType.qualCode];
    if (baseUrl) {
      GADataLayerFn(
        "ga_events",
        "homepage_search",
        "subject_search",
        !matchedSubject && sanitizedDescription ? sanitizedDescription : "NA",
        matchedSubject?.parent_subject
          ? matchedSubject?.parent_subject
          : matchedSubject?.description,
        matchedSubject?.parent_subject ? matchedSubject?.description : "NA",
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
        searchFormHandle?.courseType?.qualDesc,
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        `${process.env.PROJECT}`,
        "NA",
        "NA"
      );
      return window.location.href=(`${process.env.NEXT_PUBLIC_ENVIRONMENT === "prd" ? "https://www.whatuni.com" :""}${baseUrl}?q=${sanitizedDescription}`);
    }
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div
        ref={containerRef}
        className="bg-white rounded-[24px] p-[16px] border border-grey-200 hover:border-primary-500 shadow-custom-1 md:rounded-[32px] md:pl-[24px] md:p-[10px]"
      >
        <Form
          action={searchHandler}
          className="flex flex-col small md:flex-row md:items-center"
        >
          <div className="relative shrink-0">
            <button
              onClick={() => {
                courseActions("UG");
                setDropdown(false);
              }}
              onChange={(event: any) => {
                setsearchFormHandle((prevData: SearchFormHandle) => ({
                  ...prevData,
                  courseType: { ...prevData, qualDesc: event.target.value },
                }));
              }}
              className="w-full flex items-center justify-between gap-[4px] pr-0 pb-[24px] text-black md:w-[160px] md:pr-[16px] md:pb-0"
              type="button"
              // ===========================key handle for the qualification===================================================

              onKeyDown={(e) => {
                if (!searchFormHandle?.isCourseType) return;
                const allOptions: any = studymodelist || [];
                const currentIndex = dropdownIndexQual;
                let newIndex = currentIndex;
                switch (e.key) {
                  case "ArrowDown":
                    e.preventDefault();
                    newIndex =
                      currentIndex < allOptions.length - 1
                        ? currentIndex + 1
                        : 0;
                    setdropdownIndexQual(newIndex);
                    const nextElement = document.querySelector(
                      `[data-index-1="${newIndex + 1}"]`
                    );
                    nextElement?.scrollIntoView({
                      block: "nearest",
                      behavior: "smooth",
                    });
                    document
                      .querySelectorAll("[data-index-1]")
                      .forEach((el) => {
                        el.classList.remove("bg-blue-50", "underline");
                      });
                    nextElement?.classList.add("bg-blue-50", "underline");
                    break;

                  case "ArrowUp":
                    e.preventDefault();
                    newIndex =
                      currentIndex > 0
                        ? currentIndex - 1
                        : allOptions.length - 1;
                    setdropdownIndexQual(newIndex);
                    const prevElement = document.querySelector(
                      `[data-index-1="${newIndex}"]`
                    );
                    prevElement?.scrollIntoView({
                      block: "nearest",
                      behavior: "smooth",
                    });
                    document
                      .querySelectorAll("[data-index-1]")
                      .forEach((el) => {
                        el.classList.remove("bg-blue-50", "underline");
                      });
                    prevElement?.classList.add("bg-blue-50", "underline");
                    break;

                  case "Enter":
                    e.preventDefault();

                    const selectedElement: any =
                      document.querySelector(".bg-blue-50");
                    if (selectedElement) {
                      const selectedIndex: any =
                        selectedElement?.getAttribute("data-index-1");
                      setsearchFormHandle((prevData: SearchFormHandle) => ({
                        ...prevData,
                        courseType: studymodelist[selectedIndex - 1],
                      }));
                      courseActions("UG");
                    }
                    break;
                }
              }}
            >
              {searchFormHandle?.courseType.qualDesc}
              <Image
                src="/static/assets/icons/arrow_down_black.svg"
                width="20"
                height="20"
                alt="Search icon"
              />
            </button>
            {searchFormHandle?.isCourseType && (
              <div className="bg-white z-[1] shadow-custom-3 rounded-[4px] absolute left-[-16px] top-[45px] w-[calc(100%+32px)] md:w-[calc(100%+16px)]">
                <ul>
                  {studymodelist?.map((item: any, index: any) => (
                    <li
                      onClick={() => {
                        setsearchFormHandle((prevData: SearchFormHandle) => ({
                          ...prevData,
                          courseType: item,
                        }));
                        courseActions("UG");
                      }}
                      className="block small px-[16px] py-[12px] hover:bg-blue-50 hover:underline cursor-pointer"
                      data-index-1={index + 1}
                      key={index}
                    >
                      {item.qualDesc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="w-full relative grow border-y-[1px] border-grey-200 md:border-l md:border-y-0">
            <input
              autoComplete="off"
              value={searchFormHandle?.subject?.description || ""}
              type="text"
              className="w-full focus:outline-none text-black placeholder:text-gray-500 px-[0] py-[24px] md:px-[16px] md:py-[10px]"
              aria-label="submenu"
              placeholder={placeholder || "Enter Subject"}
              onChange={(event) => {
                const trimmedValue = event.target.value.replace(/\s{2,}/g, " ");
                setsearchFormHandle((prevData: any) => ({
                  ...prevData,
                  subject: {
                    ...prevData.subject,
                    url: null,
                    parent_subject: null,
                    category_code: null,
                    browse_cat_id: "KW",
                    description: trimmedValue.trimStart(),
                  },
                }));
                setDropdown(true);
                setSubjecterror(false);
              }}
              onClick={() => {
                courseActions("Subject");
                setDropdown((prev) => !prev);
                setdropdownIndex(0);
              }}
              onKeyDown={(e) => {
                if (!dropdown) return;
                const allOptions: any = filteredsubject || [];
                const currentIndex = dropdownIndex;
                let newIndex = currentIndex;
                switch (e.key) {
                  case "ArrowDown":
                    e.preventDefault();
                    newIndex =
                      currentIndex < allOptions.length - 1
                        ? currentIndex + 1
                        : 0;
                    setdropdownIndex(newIndex);
                    const nextElement = document.querySelector(
                      `[data-index="${newIndex}"]`
                    );
                    nextElement?.scrollIntoView({
                      block: "nearest",
                      behavior: "smooth",
                    });

                    document.querySelectorAll("[data-index]").forEach((el) => {
                      el.classList.remove("bg-blue-50", "underline");
                    });
                    nextElement?.classList.add("bg-blue-50", "underline");
                    break;

                  case "ArrowUp":
                    e.preventDefault();
                    newIndex =
                      currentIndex > 0
                        ? currentIndex - 1
                        : allOptions.length - 1;
                    setdropdownIndex(newIndex);

                    const prevElement = document.querySelector(
                      `[data-index="${newIndex}"]`
                    );
                    prevElement?.scrollIntoView({
                      block: "nearest",
                      behavior: "smooth",
                    });

                    document.querySelectorAll("[data-index]").forEach((el) => {
                      el.classList.remove("bg-blue-50", "underline");
                    });
                    prevElement?.classList.add("bg-blue-50", "underline");
                    break;

                  case "Enter":
                    e.preventDefault();
                    const selectedElement: any =
                      document.querySelector(".bg-blue-50");
                    if (selectedElement) {
                      const selectedIndex: any =
                        selectedElement?.getAttribute("data-index");

                      setsearchFormHandle((prevData: SearchFormHandle) => ({
                        ...prevData,
                        subject: filteredsubject[selectedIndex - 1],
                        isSubjectClicked: !searchFormHandle?.isSubjectClicked,
                      }));
                      setDropdown(false);
                    } else {
                      searchHandler();
                    }
                    break;
                }
              }}
            />
            {dropdown && (
              <div className="bg-white z-[1] shadow-custom-3 rounded-[4px] absolute left-0 top-[54px] w-full max-h-[310px] overflow-y-auto custom-scrollbar-2">
                {/* Hardcode the item at index 0 */}
                {searchFormHandle?.subject?.description?.trim()?.length > 2 && (
                  <div
                    onClick={() => {
                      setsearchFormHandle((prevData: SearchFormHandle) => ({
                        ...prevData,
                        subject: subjectlist[0],
                        isSubjectClicked: !searchFormHandle?.isSubjectClicked,
                      }));
                      setDropdown(false);
                      keywordSearch(false);
                    }}
                    className="px-[16px] py-[12px] cursor-pointer"
                  >
                    <p className="x-small font-semibold text-black tracking-[1px] leading-[18px] uppercase">
                      Keyword search for
                    </p>
                    <p className="small text-primary-400">
                      {`'${searchFormHandle?.subject?.description}'`}
                    </p>
                  </div>
                )}
                <ul>
                  {/* Map through the rest of the items starting from index 1 */}
                  {filteredsubject?.map((item: any, index: any) => (
                    <li
                      onClick={() => {
                        setsearchFormHandle((prevData: SearchFormHandle) => ({
                          ...prevData,
                          subject: item,
                          isSubjectClicked: !searchFormHandle?.isSubjectClicked,
                        }));
                        // setSubjectlist([]);
                        setDropdown(false);
                      }}
                      data-index={index + 1}
                      key={index + 1} // Increment index to keep the key unique
                      className={`block small px-[16px] py-[12px] hover:bg-blue-50 hover:underline cursor-pointer `}
                    >
                      {item?.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div
            className="w-full relative grow md:border-l border-grey-200"
            onClick={() => {
              courseActions("Location");
              setDropdown(false);
            }}
          >
            <input
              autoComplete="off"
              type="text"
              className="w-full focus:outline-none text-black placeholder:text-gray-500 px-[0] py-[24px] md:px-[16px] md:py-[10px]"
              aria-label="submenu"
              placeholder="Location (optional)"
              value={searchFormHandle?.location.regionName || ""}
              onChange={(event) =>
                setsearchFormHandle((prevData: SearchFormHandle) => ({
                  ...prevData,
                  location: event.target.value,
                }))
              }
              readOnly
              onKeyDown={(e) => {
                if (!searchFormHandle?.isLocationClicked) return;

                const listItems = locationlist || [];
                const currentIndex = listItems.findIndex(
                  (item: any) =>
                    item.regionName === searchFormHandle.location.regionName
                );
                switch (e.key) {
                  case "ArrowDown":
                    e.preventDefault();
                    const nextIndex =
                      currentIndex < listItems.length - 1
                        ? currentIndex + 1
                        : 0;
                    setsearchFormHandle((prevData: any) => ({
                      ...prevData,
                      location: listItems[nextIndex],
                    }));
                    // Scroll the selected item into view
                    const nextElement = document.querySelector(
                      `li[data-index="${nextIndex}"]`
                    );
                    nextElement?.scrollIntoView({
                      block: "nearest",
                      behavior: "smooth",
                    });

                    break;

                  case "ArrowUp":
                    e.preventDefault();
                    const prevIndex =
                      currentIndex > 0
                        ? currentIndex - 1
                        : listItems.length - 1;
                    setsearchFormHandle((prevData: any) => ({
                      ...prevData,
                      location: listItems[prevIndex],
                    }));
                    // Scroll the selected item into view
                    const prevElement = document.querySelector(
                      `li[data-index="${prevIndex}"]`
                    );
                    prevElement?.scrollIntoView({
                      block: "nearest",
                      behavior: "smooth",
                    });

                    break;

                  case "Enter":
                    e.preventDefault();

                    if (searchFormHandle.location) {
                      courseActions("Location");
                      setsearchFormHandle((prevData: any) => ({
                        ...prevData,
                        isLocationClicked: false,
                      }));
                    }
                    break;
                }
              }}
            />
            {searchFormHandle?.isLocationClicked && (
              <div className="bg-white z-[1] shadow-custom-3 rounded-[4px] absolute left-0 top-[54px] w-full max-h-[310px] overflow-y-auto custom-scrollbar-2">
                <ul>
                  {locationlist?.map((item: any, index: any) => (
                    <li
                      onClick={() => {
                        setsearchFormHandle((prevData: SearchFormHandle) => ({
                          ...prevData,
                          location: item,
                        }));
                        courseActions("Location");
                      }}
                      key={index}
                      data-index={index}
                      className={`block small px-[16px] py-[12px] hover:bg-blue-50 hover:underline cursor-pointer ${
                        item.regionName ===
                        searchFormHandle?.location?.regionName
                          ? "bg-blue-50 underline"
                          : ""
                      }`}
                    >
                      {item.regionName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary flex items-center justify-center gap-[6px] px-[24px] py-[10px] md:min-w-[114px] md:w-[130px]"
          >
            <Image
              src="/static/assets/icons/search_icon.svg"
              width="18"
              height="18"
              alt="Search icon"
            />
            Search
          </button>
        </Form>
      </div>
      {subjecterror && (
        <p className="small text-negative-default"> Please enter subject</p>
      )}
    </div>
  );
};

export default CourseTab;
