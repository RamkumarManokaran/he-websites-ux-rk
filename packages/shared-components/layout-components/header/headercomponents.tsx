"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Megamenucomponents from "@packages/shared-components/layout-components/topnav/megamenucomponents";
import User from "@packages/shared-components/layout-components/header/user/user";
import emitter from "@packages/lib/eventEmitter/eventEmitter";
import { fetchAuthSession } from "aws-amplify/auth";
import { getCookie } from "@packages/lib/utlils/helper-function";
// ==========================================don't want for the current sprint =======================================================
import Search from "@packages/shared-components/layout-components/header/search-pod/header-search";
// import Shortlisted from "@packages/shared-components/common-utilities/header/shortlisted/shortlisted";

interface props {
  topnav_data: any;
}
const Header = ({ topnav_data }: props) => {
  const router = useRouter();
  const [initial, setInitial] = useState<any>("");

  const [basketCount, setBasketCount] = useState<any>(0);
  const [isAuthenticated, setIsAuthenticated] = useState("false");
  const [isMobileView, setIsMobile] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [clickStates, setClickStates] = useState({
    isSearchClicked: false,
    isUserClicked: false,
    isShortlistClicked: false,
  });
  const mobileViewRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const userref = useRef<HTMLSpanElement | null>(null);
  const shortlistref = useRef<HTMLSpanElement | null>(null);
  const pathname = usePathname();
  const [course_data, setCourseData] = useState({});
  const [uni_data, setUniData] = useState({});
  const getUserInitials = (firstName: any, lastName: any) => {
    let initials = "";

    if (firstName && firstName.length > 1) {
      initials += firstName.charAt(0);
    }

    if (lastName && lastName.length > 1) {
      initials += lastName.charAt(0);
    }

    return initials;
  };

  // =============================================================initial fetch===============================================================================
  useEffect(() => {
    const fetchData = async () => {
      // Define payloads
      const body: any = {
        affiliateId: 220703,
        actionType: "subject",
        keyword: "",
        qualCode: "",
        networkId: 2,
      };

      const unibody: any = {
        affiliateId: 220703,
        actionType: "institution",
        keyword: "",
        qualCode: "",
        networkId: 2,
      };

      // Construct query parameters for both payloads
      const queryParamsBody = new URLSearchParams(body).toString();
      const queryParamsUnibody = new URLSearchParams(unibody).toString();

      // URLs for both requests
      const urlBody = `${process.env.NEXT_PUBLIC_BFF_API_DOMAIN}/hewebsites/v1/homepage/sub-inst-ajax?${queryParamsBody}`;
      const urlUnibody = `${process.env.NEXT_PUBLIC_BFF_API_DOMAIN}/hewebsites/v1/homepage/sub-inst-ajax?${queryParamsUnibody}`;

      try {
        // Fetch data in parallel
        const [bodyResponse, unibodyResponse] = await Promise.all([
          fetch(urlBody, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
            },
            cache: "force-cache",
          }),
          fetch(urlUnibody, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
            },
            cache: "force-cache",
          }),
        ]);

        // Parse JSON responses
        const bodyData = await bodyResponse.json();
        const unibodyData = await unibodyResponse.json();
        setCourseData(bodyData);

        setUniData(unibodyData);

        // Log results
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (
      !(Object.keys(uni_data).length > 0) &&
      !(Object.keys(course_data).length > 0) &&
      process.env.PROJECT == "Whatuni" &&
      pathname !== "/"
    ) {
      fetchData();
    }
  }, []);
  // =======================use effect for the adding eventlisterner and  fetching cookies and checking authentication=====================================================
  useEffect(() => {
    // -------check the user authentication----------------------------
    const fetchUser = async () => {
      try {
        const session = await fetchAuthSession();
        if (session?.tokens) {
          const hasAccessToken = session?.tokens?.accessToken !== undefined;
          const hasIdToken = session?.tokens?.idToken !== undefined;
          if (hasAccessToken && hasIdToken) {
            setIsAuthenticated("true");
            const user_initial = getCookieValue("USER_INITIAL");
            if (!user_initial && session.tokens.idToken) {
              const user_initial = getUserInitials(
                session.tokens.idToken?.payload?.given_name,
                session.tokens.idToken?.payload?.family_name
              );
              setInitial(user_initial);
            } else {
              setInitial(user_initial);
            }
            const basket = getCookieValue("USER_FAV_BASKET_COUNT") || 0;
            setBasketCount(basket);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    const courseCountFunc = (customEventDetail: any) => {
      fetchUser();
    };
    emitter.addListener("courseCount", courseCountFunc);
    // --------------close all popups on clicking outside-----------------------------
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        userref.current &&
        !userref.current.contains(event.target as Node) &&
        shortlistref.current &&
        !shortlistref.current.contains(event.target as Node)
      ) {
        rightMenuAction("");
      } else if (
        mobileViewRef.current &&
        !mobileViewRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // ---------------function to close the search on listering the emitter------------------
    const handleRightMenuAction = (actionType: string) => {
      rightMenuAction(actionType);
    };

    // -------------------function to set ismobile state--------------------------------------
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    handleResize();
    function getCookieValue(name: any) {
      const cookieArray = document.cookie.split("; ");
      const cookie = cookieArray.find((c) => c.startsWith(`${name}=`));
      return cookie ? cookie.split("=")[1] : "";
    }

    if (process.env.PROJECT === "Whatuni") {
      fetchUser();
    } else {
      const user_initial = getCookieValue("pgs_auth") || "";
      const basket_count = getCookieValue("pgs_bskt_cnt") || 0;
      const pgs_x = getCookieValue("pgs_x") || 0;
      if (user_initial !== "null" && user_initial && pgs_x) {
        setIsAuthenticated("true");
        setInitial(user_initial);
        setBasketCount(basket_count);
      }
    }

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    emitter.on("rightMenuActionclose", handleRightMenuAction);
    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup event listeners
      document.removeEventListener("mousedown", handleClickOutside);
      emitter.off("rightMenuActionclose", handleRightMenuAction);
      window.removeEventListener("resize", handleResize);
    };
  }, [basketCount]);

  // ==========================================useEffect block the background while popups made=====================================================================
  useEffect(() => {
    const body = document.body;
    if (
      clickStates.isSearchClicked ||
      clickStates.isUserClicked ||
      clickStates.isShortlistClicked
    ) {
      body.classList.add("overflow-y-hidden");
    } else {
      body.classList.remove("overflow-y-hidden");
    }
  }, [clickStates]);
  // ===================================================================================================================================================================
  const mobileToggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isOpen]);
  const rightMenuAction = (actionName: string) => {
    setClickStates((prevStates) => {
      const newState = {
        isSearchClicked: false,
        isUserClicked: false,
        isShortlistClicked: false,
      };

      if (actionName === "SEARCH") {
        newState.isSearchClicked = !prevStates.isSearchClicked;
      } else if (actionName === "USER") {
        newState.isUserClicked = !prevStates.isUserClicked;
      } else if (actionName === "SHORTLIST") {
        newState.isShortlistClicked = !prevStates.isShortlistClicked;
      }
      return newState;
    });
  };
  return (
    <>
      <header className="bg-white shadow-custom-3 pl-[16px] pr-[21px]  md:px-[20px] xl2:px-0 relative">
        <div className="max-w-container mx-auto flex items-center ">
          <div
            className={`order-2 md:grow lg:order-1 lg:grow-0 ${process.env.PROJECT === "PGS" ? "basis-[146px] md:basis-[187px]" : "lg:basis-[54px]"}   py-[4px] lg:py-[8px]`}
          >
            <a
              href="/"
              className={`block ${process.env.PROJECT === "PGS" ? "w-[146px] md:w-[187px]" : "w-[54px]"}`}
            >
              {topnav_data?.data?.contentData?.items[0]?.websiteLogo?.url && (
                <Image
                  className={`w-full md:mx-auto lg:mx-0`}
                  src={
                    topnav_data?.data?.contentData?.items[0]?.websiteLogo?.url
                  }
                  alt="imageplaceholder"
                  priority={true}
                  width={70}
                  height={78}
                />
              )}
            </a>
          </div>
          <div className="order-1 md:grow md:basis-[100%] lg:order-2 lg:grow-1 lg:basis-0">
            <button
              className="mr-[16px] block lg:hidden"
              onClick={mobileToggleOpen}
              aria-label="Mobile Toggle"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="#333F48"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isMobileView ? (
              <>
                <div
                  onClick={mobileToggleOpen}
                  className={`fixed top-0 left-0 right-0 bottom-0 z-[5] ${
                    isOpen ? "animate-fadeIn backdrop-shadow block" : "hidden"
                  } lg:bg-transparent`}
                ></div>

                <div
                  className={`fixed top-0 left-0 z-[6] w-full h-full transition-all duration-300 ease-in-out ${
                    isOpen ? "" : "-translate-x-full duration-300"
                  } ${isMobileView ? "w-[376px] h-[100vh]" : ""}`}
                >
                  <div className="relative z-[6] w-fit">
                    <div
                      onClick={mobileToggleOpen}
                      className={`absolute right-[-40px] ${isMobileView ? "lg:hidden" : ""}`}
                    >
                      <div className="bg-neutral-900 p-[8px]">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 6L6 18"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 6L18 18"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div
                      ref={mobileViewRef}
                      className={`${isOpen ? "block" : "hidden"}`}
                    >
                      <Megamenucomponents data={topnav_data} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Megamenucomponents data={topnav_data} />
            )}
          </div>

          <div className="order-3 basis-[100%] md:grow lg:grow-0 lg:basis-0">
            <ul className="flex items-center justify-end gap-[10px] rightmenu py-[4px] lg:py-[8px]">
              {/* // commented beacuse the scope out sprint */}
              {pathname !== "/" && (
                <li>
                  <span
                    onClick={() => rightMenuAction("SEARCH")}
                    className="border border-gray-500 rounded-[34px] flex items-center justify-center w-[48px] h-[48px] cursor-pointer hover:border-primary-500 hover:bg-primary-500"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
                        stroke="#5C656E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {clickStates.isSearchClicked && (
                    <>
                      <div
                        className={`backdrop-shadow fixed top-0 left-0 right-0 bottom-0 z-[5]`}
                      ></div>
                      <div ref={containerRef}>
                        <Search course_data={course_data} uni_data={uni_data} />
                      </div>
                    </>
                  )}
                </li>
              )}
              <li className="relative">
                <span
                  title="User"
                  ref={userref}
                  onClick={() =>
                    isAuthenticated === "true"
                      ? rightMenuAction("USER")
                      : router.push("/register")
                  }
                  className="relative border border-gray-500 rounded-[34px] flex items-center justify-center w-[48px] h-[48px] cursor-pointer hover:border-primary-500 hover:bg-primary-500"
                >
                  {initial && isAuthenticated === "true" ? (
                    <span className="relative para font-semibold text-white rounded-[34px] flex items-center justify-center w-[48px] h-[48px] cursor-pointer bg-primary-400 hover:bg-primary-500">
                      {initial.toUpperCase()}
                    </span>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3332 5.83333C13.3332 7.67428 11.8408 9.16667 9.99984 9.16667C8.15889 9.16667 6.6665 7.67428 6.6665 5.83333C6.6665 3.99238 8.15889 2.5 9.99984 2.5C11.8408 2.5 13.3332 3.99238 13.3332 5.83333Z"
                        stroke="#5C656E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.99984 11.6667C6.77818 11.6667 4.1665 14.2783 4.1665 17.5H15.8332C15.8332 14.2783 13.2215 11.6667 9.99984 11.6667Z"
                        stroke="#5C656E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {/* user section */}
                {clickStates.isUserClicked && (
                  <>
                    <div className="backdrop-shadow fixed top-[64px] left-0 right-0 bottom-0 z-[5] md:top-[84px] lg:top-[76px]"></div>
                    <div ref={containerRef}>
                      <User topnav_data={topnav_data} />
                    </div>
                  </>
                )}
              </li>
              <li className="relative">
                <a
                  href={`${process.env.PROJECT === "Whatuni" ? "/degrees/comparison" : "/pgs/mypgs_compare_pkg.customise_basket_prc"}`}
                  title="Shortlist"
                  className="cursor-pointer"
                  // onClick={() => rightMenuAction("SHORTLIST")}
                >
                  <span
                    ref={shortlistref}
                    className="flex items-center justify-center min-h-[48px]"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z"
                        fill="#00BBFD"
                        stroke="#3460DC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {isAuthenticated === "true" && (
                    <div className="absolute flex items-center justify-center min-w-[16px] h-[16px] rounded-[8px] top-[22px] left-[13px] bg-success-400 text-black font-inter font-semibold xs-small px-[5px] py-[2px]">
                      {basketCount}
                    </div>
                  )}
                </a>
                {/* // commented beacuse the scope out sprint */}
                {/* shortlist section */}
                {/* {clickStates.isShortlistClicked && (
                  <>
                    <div className="backdrop-shadow fixed top-[64px] left-0 right-0 bottom-0 z-[5] md:top-[84px] lg:top-[76px]"></div>
                    <div ref={containerRef}>
                      <Shortlisted topnav_data={topnav_data}/>
                    </div>
                  </>
                )} */}
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
