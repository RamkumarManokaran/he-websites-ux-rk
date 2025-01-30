"use client";
import React from "react";

import Image from "next/image";
import { SearchFormHandle } from "@packages/lib/types/interfaces";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Form from "next/form";
import {
  GADataLayerFn,
  currentAuthenticatedUser,
} from "@packages/lib/utlils/helper-function";

interface UniversityTabProps {
  searchFormHandle: any;
  setsearchFormHandle: any;
  data: any;
}
const UniversityTab: React.FC<UniversityTabProps> = ({
  searchFormHandle,
  setsearchFormHandle,
  data,
}) => {
  const router = useRouter();
  const [dropdownIndex, setdropdownIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [universityList, setUniversityList] = useState<any>([]);
  const [unierror, setUnierror] = useState(false);
  const [unidetails, setUnidetails] = useState<Array<any>>(
    Array.isArray(data) ? data : []
  );
  // =====================================use effect for the close popups outside the popups=================================================================================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        courseActions("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // ============================================use effect to filter  uninversity==========================================================================================================
  useEffect(() => {
    if (
      !searchFormHandle?.university?.trim() ||
      searchFormHandle?.university?.trim().length < 3
    ) {
      setUniversityList([]);
      return;
    }

    const results = unidetails?.filter((colleges: any) =>
      colleges.collegeNameDisplay
        ?.toLowerCase()
        .includes(searchFormHandle?.university?.trim()?.toLowerCase()) || 
        colleges.collegeNameAlias
        ?.toLowerCase()
        .includes(searchFormHandle?.university?.trim()?.toLowerCase())
    );
    
    const prioritySearch = (
      list: { description: string; [key: string]: any }[],
      searchText: string
    ) => {
      if (!searchText) return list;
      const searchLower = searchText?.toLowerCase();
      return list
        ?.map((item) => ({
          ...item,
          position: item?.description?.toLowerCase().indexOf(searchLower),
          startsWithSearch: item?.collegeNameDisplay
            ?.toLowerCase()
            .startsWith(searchLower),
          exactMatch: item?.collegeNameDisplay?.toLowerCase() === searchLower,
        }))
        .filter((item) => item.position !== -1) // Only include items with searchText
        .sort((a: any, b: any) => {
          if (a.exactMatch !== b.exactMatch) return a.exactMatch ? -1 : 1;
          if (a.startsWithSearch !== b.startsWithSearch)
            return a.startsWithSearch ? -1 : 1;
          if (a.position !== b.position) return a.position - b.position;
          return a?.collegeNameDisplay?.localeCompare(b?.collegeNameDisplay);
        })
        ?.map((item: any) => ({
          collegeId: item?.collegeId,
          collegeNameDisplay: item.collegeNameDisplay,
          collegeNameAlias: item.collegeNameAlias,
          collegeName: item.collegeName,
        }));
    };

    setUniversityList(
      prioritySearch(results, searchFormHandle.university) || []
    );
  }, [searchFormHandle?.university]);
  // ======================================================================================================================================================================/
  const resetAllTabs = (currentTab: string) => ({
    isUniversityClicked:
      currentTab === "University"
        ? !searchFormHandle?.isUniversityClicked
        : false,
  });

  const courseActions = (tabName: string) => {
    setsearchFormHandle((prevData: SearchFormHandle) => ({
      ...prevData,
      ...resetAllTabs(tabName),
    }));
  };
  function handleUnisearch() {
    setUnierror(true);
  }
  return (
    <div ref={containerRef} className="flex flex-col gap-[16px]">
      <div className="bg-white rounded-[24px] p-[16px] border border-grey-200 hover:border-primary-500 shadow-custom-1 md:rounded-[32px] md:pl-[24px] md:p-[10px]">
        <Form
          action={handleUnisearch}
          className="flex flex-col gap-[16px] small md:flex-row"
        >
          <div className="relative grow">
            <input
              autoComplete="off"
              onClick={() => {
                courseActions("University");
                setUnierror(false);
              }}
              type="text"
              className="w-full focus:outline-none pt-0 pb-[16px] text-black placeholder:text-gray-500 border-b border-grey-200 md:py-[10px] md:border-none"
              aria-label=""
              placeholder="University name"
              onChange={(event) => {
                setsearchFormHandle((preData: any) => ({
                  ...preData,
                  university: event.target.value
                    .replace(/\s{2,}/g, " ")
                    .trimStart(),
                  isUniversityClicked: true,
                }));
                setUnierror(false);
              }}
              value={searchFormHandle?.university || ""}
              onKeyDown={(e) => {
                if (!searchFormHandle?.isUniversityClicked) return;
                const allOptions: any = universityList || [];
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
                        university:
                          universityList[selectedIndex - 1]?.collegeNameDisplay,
                        isUniversityClicked: false,
                      }));

                      router.push(
                        `/university-profile/${universityList[
                          selectedIndex - 1
                        ]?.collegeNameDisplay
                          ?.toLowerCase()
                          ?.replace(
                            /\s+/g,
                            "-"
                          )}/${universityList[selectedIndex - 1]?.collegeId}/`
                      );
                    }
                    break;
                }
              }}
            />
            {searchFormHandle?.isUniversityClicked &&
              searchFormHandle?.university?.trim().length > 2 && (
                <div className="flex flex-col w-[calc(100%+16px)] absolute z-[1] bg-white shadow-custom-3 rounded-[8px] left-[-8px] top-[53px] custom-scrollbar-2 max-h-[205px] overflow-y-auto mr-[4px]">
                  <ul>
                    {universityList?.map((item: any, index: any) => (
                      <a
                        href={`/university-profile/${item?.collegeNameDisplay
                          ?.toLowerCase() // Convert to lowercase
                          ?.replace(/\s+/g, "-")}/${item.collegeId}/`}
                        onClick={async () => {
                          // Update state
                          setsearchFormHandle((prevData: any) => ({
                            ...prevData,
                            university: item.collegeNameDisplay,
                            isUniversityClicked: false,
                          }));

                          // Trigger GADataLayerFn
                          GADataLayerFn(
                            "ga_events",
                            "homepage_search",
                            "university_search",
                            "NA",
                            "NA",
                            "NA",
                            localStorage?.getItem("gaPageName") || "",
                            "NA",
                            item.collegeNameDisplay,
                            "NA",
                            "NA",
                            "NA",
                            item.collegeId,
                            "NA",
                            "NA",
                            "NA",
                            "NA",
                            await currentAuthenticatedUser(),
                            "NA",
                            "NA",
                            "NA",
                            "NA",
                            "NA",
                            "NA",
                            `${process.env.PROJECT}`,
                            "NA",
                            "NA" // Site name or context
                          );
                        }}
                        key={index}
                        className="px-[16px] py-[10px] block small hover:bg-blue-50 hover:underline cursor-pointer"
                      >
                        {item.collegeNameDisplay}
                      </a>
                    ))}
                  </ul>
                </div>
              )}
          </div>
          <button
            type="submit"
            className="btn btn-primary flex items-center justify-center gap-[6px] px-[24px] py-[10px] md:w-[114px]"
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
      {unierror && (
        <p className="small text-negative-default">
          Please select university from dropdown
        </p>
      )}
    </div>
  );
};

export default UniversityTab;
