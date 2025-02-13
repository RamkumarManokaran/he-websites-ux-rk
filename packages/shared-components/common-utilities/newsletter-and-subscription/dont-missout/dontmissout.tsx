"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { fetchAuthSession } from "aws-amplify/auth";

import { v4 as uuidv4 } from "uuid";
import { DataLayerGA4AttrType } from "@packages/lib/types/datalayerGA";
import {
  currentAuthenticatedUser,
  GA4DataLayerFn,
  getArticleDetailUrlParamValues,
} from "@packages/lib/utlils/helper-function";
import { logClickstreamEvent } from "@packages/lib/utlils/clickstream";
import { usePathname } from "next/navigation";
import makeApiCall from "@packages/REST-API/rest-api";
import getApiUrl from "@packages/REST-API/api-urls";

const Dontmissout = ({ key, data, preview }: any) => {
  const propsdata = useContentfulLiveUpdates(data);
  const [yearofentry, setYearofentry] = useState([]);
  const [firstname, setFristname] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [prevemail, setEmailprev] = useState("");
  const [year, setYear] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [firstnameerror, setFristnameerror] = useState(false);
  const [lastnameerror, setLastnameerror] = useState(false);
  const [emailerror, setEmailerror] = useState(false);
  const [validemailerror, setValidemailerror] = useState(false);
  const [yearerror, setYearerror] = useState(false);
  const [alreadyregisteruser, setAlreadyregisteruser] = useState(false);
  const [agreementerror, setAgreementerror] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const validateEmail = (email: any) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  const { category, subCategory, articleTitle } =
    getArticleDetailUrlParamValues();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await fetchAuthSession();
        if (session?.tokens) {
          const hasAccessToken = session?.tokens?.accessToken !== undefined;
          const hasIdToken = session?.tokens?.idToken !== undefined;
          if (hasAccessToken && hasIdToken) {
            setAuthenticated(true);
          }
        } else {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();

    const fetchYearofentry = async () => {
      try {
        const yeardata = await makeApiCall(
          getApiUrl?.newsletterYearOfEntry,
          "GET",
          null,
          "affiliateId=220703&actionType=YOE",
          null
        );
        setYear(yeardata[0]?.optionValue);
        setYearofentry(yeardata);

        // console.log(yeardata, "yeardata");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchYearofentry();
  }, []);

  function handleSubmit(e: any) {
    let isFormValid: any = true;
    setEmailprev(email);
    e.preventDefault();
    setFristnameerror(false);
    setLastnameerror(false);
    setEmailerror(false);
    setYearerror(false);
    setAgreementerror(false);
    if (!firstname) {
      setFristnameerror(true);
    }
    if (!lastname) {
      isFormValid = false;
      setLastnameerror(true);
    }
    if (!email) {
      setEmailerror(true);
      isFormValid = false;
    }
    if (email) {
      if (!validateEmail(email)) {
        setValidemailerror(true);
        isFormValid = false;
      }
    }
    if (!year) {
      setYearerror(true);
      isFormValid = false;
    }
    if (!agreement) {
      setAgreementerror(true);
      isFormValid = false;
    }

    // console.log(firstname, lastname, email, year, agreement);

    const handleSubscriptionGAlog = async () => {
      const datalog: DataLayerGA4AttrType = {
        event: "registration",
        eventName: "registration",
        data_label: "subscription_footer",
        page_name: localStorage?.getItem("gaPageName")?.toString(),
        target_year: year,
        user_id: await currentAuthenticatedUser(),
        article_category: category,
        data_label2: subCategory,
        clearing: "in_year",
      };
      GA4DataLayerFn(datalog);
    };

    const handleSubscriptionCSlog = async (
      userId: any,
      signupFailureReason: any
    ) => {
      logClickstreamEvent({
        pageName: localStorage?.getItem("gaPageName")?.toString(),
        sectionName: propsdata?.newsTitle ?? "",
        eventType: "SignedUp",
        CTATitle: `${propsdata?.ctaLabel ?? "Get free newsletters"}`,
        signupMethod: "Newsletter Subcription",
        signupFailureReason: signupFailureReason ?? "",
        interestedIntakeYear: year,
        userId: userId,
      });
    };

    const res = async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_BFF_API_DOMAIN}/hewebsites/v1/guest/users/registration`,
        {
          method: "POST",
          headers: {
            "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
            sitecode: `${process.env.PROJECT === "Whatuni" ? "WU_WEB" : "PGS_WEB"}`,
            "Content-Type": "application/json",
            "x-correlation-id": uuidv4(),
          },
          body: JSON.stringify({
            userDetails: {
              personalDetails: {
                email: email,
                firstName: firstname,
                secondName: lastname,
                yearOfEntry: year,
                marketingSolusFlag: "Y",
              },
            },
            userSourceType: "SPAMBOXREGISTERED",
            affiliateId: 220703,
            cognitoFlag: "N",
          }),
        }
      );

    if (
      isFormValid &&
      !firstnameerror &&
      !lastnameerror &&
      !emailerror &&
      !yearerror &&
      !agreementerror &&
      !validemailerror &&
      firstname &&
      lastname &&
      email &&
      year &&
      agreement &&
      prevemail !== email
    ) {
      setSuccessMessage(true);
      res()
        .then(async (response) => {
          if (response.ok) {
            setSuccessMessage(true);
            const resdata = await response.json();
            handleSubscriptionGAlog();
            handleSubscriptionCSlog(resdata?.user_uuid ?? "0", "");
          }
        })
        .catch((error) => {
          console.error("Error:", error); // Handle any errors
          handleSubscriptionCSlog("0", error.toString());
        });
    } else if (
      prevemail &&
      prevemail === email &&
      isFormValid &&
      !firstnameerror &&
      !lastnameerror &&
      !emailerror &&
      !yearerror &&
      !agreementerror &&
      !validemailerror &&
      firstname &&
      lastname &&
      email &&
      year &&
      agreement
    ) {
      setSuccessMessage(true);
      setAlreadyregisteruser(true);
    } else {
      setSuccessMessage(false);
      setEmailprev("");
    }
  }
  const domain = `${
    process.env.NEXT_PUBLIC_ENVIRONMENT === "dev"
      ? "https://mdev.dev.aws."
      : process.env.NEXT_PUBLIC_ENVIRONMENT === "stg"
        ? "https://mtest.test.aws."
        : "https://www."
  }`;
  return (
    <>
      {authenticated && (
        <>
          {preview && (
            <ContentfulInspectorManager
              fields={[
                {
                  entryId: propsdata?.sys?.id,
                  fieldId: "newsTitle",
                  targetSelector: "#article_detail_newsTitle",
                },
                {
                  entryId: propsdata?.sys?.id,
                  fieldId: "newsEmail",
                  targetSelector: "#artilce-details-newsEmail",
                },
                {
                  entryId: propsdata?.sys?.id,
                  fieldId: "newsFirstName",
                  targetSelector: "#artilce-page-newsFirstName",
                },

                {
                  entryId: propsdata?.sys?.id,
                  fieldId: "newsLastName",
                  targetSelector: "#artilce-page-newsLastName",
                },
                {
                  entryId: propsdata?.sys?.id,
                  fieldId: "newsEntryYear",
                  targetSelector: "#artilce-page-newsEntryYear",
                },
                {
                  entryId: propsdata?.sys?.id,
                  fieldId: "ctaLabel",
                  targetSelector: "#artilce-page-news-ctaLabel",
                },
                {
                  entryId: propsdata?.sys?.id,
                  fieldId: "json",
                  targetSelector: "#artilce-page-news-json",
                },
              ]}
            />
          )}
          <div className="bg-blue-100 p-[16px] md:p-[24px] flex flex-col gap-[16px] rounded-[8px]">
            <div className="!m-0">
              <div id="article_detail_newsTitle" className="h4">
                {propsdata?.newsTitle}
              </div>
              <div
                id="artilce-page-news-json"
                className="small font-inter font-normal text-grey300"
              >
                {propsdata?.newsDesc?.json &&
                  documentToReactComponents(propsdata.newsDesc.json)}
              </div>
            </div>
            {/* Successfull message  */}
            {successMessage && (
              <div className="rounded-[6px] p-[16px] bg-positive-light flex justify-between border border-positive-default">
                <span className="flex items-center gap-[11px] text-positive-dark small font-inter font-semibold">
                  <span>
                    <Image
                      alt="tick icon"
                      width="14"
                      height="10"
                      src="/static/assets/icons/green_tick.svg"
                    />
                  </span>
                  {propsdata?.submitSuccessMessage}
                </span>
                <span
                  onClick={() => setSuccessMessage(false)}
                  className="cursor-pointer"
                >
                  <Image
                    alt="close icon"
                    width="20"
                    height="20"
                    src="/static/assets/icons/green-closeicon.svg"
                  />
                </span>
              </div>
            )}

            {/* Successfull message END */}

            <div className="">
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col gap-[16px]"
              >
                {/* input  */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
                  <div className="flex flex-col gap-[4px]">
                    <input
                      id="artilce-page-newsFirstName"
                      value={firstname ?? ""}
                      onChange={(e) => {
                        setFristname(e.target.value.trim());
                        setFristnameerror(false);
                        setSuccessMessage(false);
                        setAlreadyregisteruser(false);
                        setValidemailerror(false);
                      }}
                      type="text"
                      placeholder={`${propsdata?.newsFirstName ?? "First name*"}`}
                      className="form-control w-full small font-normal text-grey300 px-[12px] py-[10px] border border-grey-500 rounded-[4px] outline-none shadow-custom-2"
                    />
                    {firstnameerror && (
                      <span className="x-small font-normal text-negative-default">
                        Please enter your first name
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <input
                      id="artilce-page-newsLastName"
                      onChange={(e) => {
                        setLastname(e.target.value.trim());
                        setLastnameerror(false);
                        setSuccessMessage(false);
                        setAlreadyregisteruser(false);
                      }}
                      value={lastname ?? ""}
                      type="text"
                      placeholder={`${propsdata?.newsLastName ?? "Last name*"}`}
                      className="form-control w-full small font-normal text-grey300 px-[12px] py-[10px] border border-grey-500 rounded-[4px] outline-none shadow-custom-2"
                    />
                    {lastnameerror && (
                      <span className="x-small font-normal text-negative-default">
                        Please enter your last name
                      </span>
                    )}
                  </div>
                  <div className="md:col-span-2 lg:col-span-1 grid gap-[4px]">
                    <input
                      id="artilce-details-newsEmail"
                      onChange={(e) => {
                        setEmail(e.target.value.trim());
                        setEmailerror(false);
                        setSuccessMessage(false);
                        setAlreadyregisteruser(false);
                        setValidemailerror(false);
                      }}
                      value={email.trim() ?? ""}
                      type="email"
                      placeholder={`${propsdata?.newsEmail ?? "Email address*"}`}
                      className="form-control w-full small font-normal text-grey300 px-[12px] py-[10px] border border-grey-500 rounded-[4px] outline-none shadow-custom-2"
                    />
                    {emailerror && (
                      <span className="x-small font-normal text-negative-default">
                        Please enter your email address
                      </span>
                    )}
                    {validemailerror && (
                      <span className="x-small font-normal text-negative-default">
                        Please enter the valid email address
                      </span>
                    )}
                  </div>
                </div>
                {/* radio box  */}
                <div className="flex flex-col gap-[4px]">
                  <label
                    id="artilce-page-newsEntryYear"
                    className="small font-semibold font-inter text-grey300"
                  >
                    {`${propsdata?.newsEntryYear ?? "What year would you like to start your new course?"}`}
                  </label>
                  <div className="flex gap-[16px] md:gap-[24px]">
                    {yearofentry?.map((item: any, index: any) => (
                      <div key={index} className="flex gap-[12px] items-center">
                        <input
                          checked={year === item?.optionId}
                          onChange={(e) => {
                            setYear(e.target.value);
                            setYearerror(false);
                            setSuccessMessage(false);
                            setAlreadyregisteruser(false);
                          }}
                          value={item?.optionValue}
                          type="radio"
                          className="w-[16px] h-[16px]"
                          name="newsletter-starting"
                          id={item?.optionId}
                        />
                        <label
                          className="select-none cursor-pointer"
                          htmlFor={item?.optionId}
                        >
                          {item?.optionId}
                        </label>
                      </div>
                    ))}
                    {/* <div className="flex gap-[4px] md:gap-[16px] items-center">
                      <input
                        checked={year === "2025"}
                        onChange={(e) => {
                          setYear(e.target.value);
                          setYearerror(false);
                          setSuccessMessage(false);
                          setAlreadyregisteruser(false);
                        }}
                        value={"2025"}
                        type="radio"
                        className="w-[16px] h-[16px]"
                        name="newsletter-starting"
                        id="2025"
                      />
                      <label
                        className="select-none cursor-pointer"
                        htmlFor="2025"
                      >
                        2025
                      </label>
                    </div>
                    <div className="flex gap-[4px] md:gap-[16px] items-center">
                      <input
                        checked={year === "2026"}
                        onChange={(e) => {
                          setYear(e.target.value);
                          setYearerror(false);
                          setSuccessMessage(false);
                          setAlreadyregisteruser(false);
                        }}
                        value={"2026"}
                        type="radio"
                        className="w-[16px] h-[16px]"
                        name="newsletter-starting"
                        id="2026"
                      />
                      <label
                        className="select-none cursor-pointer"
                        htmlFor="2026"
                      >
                        2026
                      </label>
                    </div>
                    <div className="flex gap-[4px] md:gap-[16px] items-center">
                      <input
                        checked={year === "2027"}
                        onChange={(e) => {
                          setYear(e.target.value);
                          setYearerror(false);
                          setSuccessMessage(false);
                          setAlreadyregisteruser(false);
                        }}
                        value={"2027"}
                        type="radio"
                        className="w-[16px] h-[16px]"
                        name="newsletter-starting"
                        id="2027"
                      />
                      <label
                        className="select-none cursor-pointer"
                        htmlFor="2027"
                      >
                        2027
                      </label>
                    </div> */}
                    {/* <div className="flex gap-[4px] md:gap-[16px] items-center">
                      <input
                        checked={year === "2028"}
                        onChange={(e) => {
                          setYear(e.target.value);
                          setYearerror(false);
                          setSuccessMessage(false);
                          setAlreadyregisteruser(false);
                        }}
                        value={"2028"}
                        type="radio"
                        className="w-[16px] h-[16px]"
                        name="newsletter-starting"
                        id="2028"
                      />
                      <label
                        className="select-none cursor-pointer"
                        htmlFor="2028"
                      >
                        2028
                      </label>
                    </div> */}
                  </div>
                  {yearerror && (
                    <span className="x-small font-normal text-negative-default">
                      What year would you like to start your new course?
                    </span>
                  )}
                </div>
                {/* terms and condition  */}
                <div className="form_check flex flex-col gap-[4px]">
                  <div className="form-check-group flex flex-col gap-[8px]">
                    <div className="col flex items-start gap-[12px] relative">
                      <div className="checkbox_card">
                        <input
                          checked={agreement ? true : false}
                          onChange={(e) => {
                            setAgreement(e.target.checked);
                            setAgreementerror(false);
                            setSuccessMessage(false);
                            setAlreadyregisteruser(false);
                          }}
                          type="checkbox"
                          className="form-checkbox hidden"
                          id="newsletters"
                        />
                        <label
                          htmlFor="newsletters"
                          className="flex justify-center items-center w-[16px] h-[16px] rounded-[3px] bg-white border border-grey-400 my-[6px]"
                        >
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.2534 0.723569C9.40607 0.863517 9.41638 1.10073 9.27643 1.2534L3.77643 7.2534C3.70732 7.3288 3.6104 7.37269 3.50815 7.37491C3.40589 7.37714 3.30716 7.33749 3.23483 7.26517L0.734835 4.76517C0.588388 4.61872 0.588388 4.38128 0.734835 4.23484C0.881282 4.08839 1.11872 4.08839 1.26517 4.23484L3.48822 6.45789L8.72357 0.746605C8.86351 0.593936 9.10073 0.583622 9.2534 0.723569Z"
                              fill="white"
                              stroke="white"
                              strokeWidth="0.666667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </label>
                      </div>
                      <label
                        htmlFor="newsletters"
                        className="select-none check-label !text-small font-semibold w-[calc(100%_-_28px)]"
                      >
                        <p className="select-none !text-small font-normal text-grey-600">
                          I confirm I’m over 13 and agree to the
                          <Link
                            className="!text-primary-500 underline pl-[4px]"
                            target="_blank"
                            href={`${domain}whatuni.com/wu-cont/termsAndCondition.htm`}
                          >
                            terms and conditions
                          </Link>
                          &nbsp;and
                          <Link
                            className="!text-primary-500 underline pl-[4px]"
                            target="_blank"
                            href={`${domain}whatuni.com/degrees/help/privacy.htm`}
                          >
                            privacy notice
                          </Link>
                          , and agree to become a member of the
                          <Link
                            className="!text-primary-500 underline pl-[4px]"
                            target="_blank"
                            href={`${domain}whatuni.com/wu-cont/termsAndCondition.htm`}
                          >
                            Whatuni community
                          </Link>
                          *
                        </p>
                      </label>
                    </div>
                    {agreementerror && (
                      <span className="x-small font-normal text-negative-default">
                        Please agree to our terms and conditions and privacy
                        notice
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="flex flex-col">
                    <button
                      id="artilce-page-news-ctaLabel"
                      className="btn btn-primary h-[41px] px-[20px] py-[10px] flex justify-end gap-[10px] items-center"
                    >
                      {`${propsdata?.ctaLabel ?? "Get free newsletters"} `}
                      <Image
                        src="/static/assets/icons/arrow-right-white.svg"
                        width="13"
                        height="10"
                        alt="arrow"
                      />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dontmissout;
