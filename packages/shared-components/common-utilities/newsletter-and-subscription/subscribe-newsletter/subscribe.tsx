"use client";
import React, { useState } from "react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import Subscribebtn from "@packages/shared-components/common-utilities/cards/interaction-button/subscribebtn";
import { v4 as uuidv4 } from "uuid";
import { currentAuthenticatedUser, GA4DataLayerFn, getCookie } from "@packages/lib/utlils/helper-function";
//import { getCookieValue } from "@packages/lib/utlils/commonFunction";
import Link from "next/link";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { logClickstreamEvent } from "@packages/lib/utlils/clickstream";
const Subscribe = ({ data, isPreviewTrue,category ,subCategory}: any) => {
  let jsondata = useContentfulLiveUpdates(data);
  if (!isPreviewTrue) {
    jsondata = data;
  }
  let  valid=false;
  const [isChecked, setIsChecked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [errorstate, SetErrorState] = useState({
    emailError: false,
    checkboxError: false,
  });
  const emailChange = (event: any) => {
    setEmail(event.target.value);
    
  };
  const handleCheckboxChange = (e: any) => {
    setIsChecked(!isChecked);
    SetErrorState((prev) => ({ ...prev, checkboxError: !!isChecked }));
  };
  const submitNewsletter = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.uk)$/;
    const isEmailValid = emailRegex.test(email.trim());
    console.log(isEmailValid,"from the email pod")
    if (isEmailValid) valid=true;
    SetErrorState((prev) => ({ ...prev, emailError: !isEmailValid }));
    if (valid && isChecked && email) {
      console.log(!errorstate.emailError,valid)
      setSuccess(true);
      const correlation_id = uuidv4();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BFF_API_DOMAIN}/hewebsites/v1/guest/users/registration`,
        {
          method: "POST",
          headers: {
            "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
            "x-correlation-id": correlation_id,
            "Content-Type": "application/json",
            sitecode: `${process.env.PROJECT === "Whatuni" ? "WU_WEB" : "PGS_WEB"}`,
          },
          body: JSON.stringify({
            userDetails: {
              personalDetails: {
                email: email,
                marketingSolusFlag: "Y",
              },
            },
            userSourceType: "SPAMBOXREGISTERED",
            affiliateId: `${process.env.AFFILATE_ID}`,
            cognitoFlag: "N",
          }),
        }
      );
      const isSuccess = await res.json();
      if (isSuccess?.message === "User Added") {
        setSuccess(true);
        GA4DataLayerFn({event:"registration", eventName: "registration",data_label:"subscription_footer",data_label2:subCategory,page_name : localStorage?.getItem("gaPageName") || "",user_id:await currentAuthenticatedUser(),article_category:category})
        logClickstreamEvent({pageName:localStorage?.getItem("gaPageName") || "",eventType:"SignedUp",signupMethod:"Newletter Subscription",CTATitle:jsondata?.ctaLabel})
      } else if (isSuccess?.message === "User Updated") {
        setSuccess(true);
        GA4DataLayerFn({event:"registration", eventName: "registration",data_label:"subscription_footer",data_label2:subCategory,page_name : localStorage?.getItem("gaPageName") || "",user_id:await currentAuthenticatedUser(),article_category:category})
        logClickstreamEvent({pageName:localStorage?.getItem("gaPageName") || "",eventType:"SignedUp",signupMethod:"Newletter Subscription",CTATitle:jsondata?.ctaLabel})
      } else {
        logClickstreamEvent({pageName:localStorage?.getItem("gaPageName") || "",eventType:"SignedUp",signupMethod:"Newletter Subscription",CTATitle:jsondata?.ctaLabel,signupFailureReason:isSuccess?.message.toString()})
        console.log("error");
      }
    } else {
      if (email && !isChecked) {
        SetErrorState((prev) => ({
          ...prev,
          checkboxError: true,
        }));
      } else if (!email && isChecked) {
        SetErrorState((prev) => ({
          ...prev,
          emailError: true,
        }));
      } else if (!email && !isChecked) {
        SetErrorState(() => ({
          checkboxError: true,
          emailError: true,
        }));
      }
    }
  };

  return (
    <>
      {isPreviewTrue && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: jsondata?.sys?.id,
              fieldId: "newseDesc",
              targetSelector: "#newsletter_desc",
            },
            {
              entryId: jsondata?.sys?.id,
              fieldId: "newsTitle",
              targetSelector: "#newsletter_title",
            },
            {
              entryId: jsondata?.sys?.id,
              fieldId: "newsEmail",
              targetSelector: "#newsletter_email_placeholder",
            },
          ]}
        />
      )}
      <div className="subscribe-container bg-primary-50">
        <div className="max-w-container mx-auto">
          <div className="subscribe-card-container flex flex-col md:items-center gap-[24px] px-[16px] md:px-[20px] py-[40px] md:py-[64px]">
            <div className="subscribe-header flex flex-col gap-[4px]">
              <div
                className="h2 font-bold md:text-center"
                id="newsletter_title"
              >
                {jsondata?.newsTitle}
              </div>
              <p
                className="font-normal small md:text-center"
                id="newsletter_desc"
              >
                {jsondata?.newsDesc?.json?.content[0]?.content[0]?.value}
              </p>
            </div>
            {success && (
              <div className="successfull_cont w-full md:w-[714px] flex  gap-[8px] bg-positive-light border border-positive-dark rounded-[6px] p-[16px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 11L7 15L17 5"
                    stroke="#106519"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex flex-grow small font-semibold text-positive-dark">
                  Thanks, we’ll be in touch soon
                </div>
              </div>
            )}
            {!success && (
              <>
                <div className="subscribe-form-control w-full lg:w-[714px]">
                  <input
                    type="text"
                    className="form-control w-full focus:outline-none p-[11px_10px_11px_24px] small text-grey-900 placeholder:text-grey-700  border border-grey-200 rounded-[30px] shadow-custom-1 hover:border-primary-400"
                    aria-label="email address field"
                    id="newsletter_email_placeholder"
                    placeholder={jsondata?.newsEmail}
                    value={email}
                    onChange={(event) => { emailChange(event); SetErrorState((prev) => ({ ...prev, emailError: false }));}}
                  />
                  {errorstate.emailError && (
                    <div className="error mt-[8px]">
                      <p className="x-small font-regular text md:text-center text-negative-default">
                        Please enter a valid email address
                      </p>
                    </div>
                  )}
                </div>
                <div className="col form_check relative w-full lg:w-[714px]">
                  <div className="flex items-start justify-center gap-[8px]">
                    <div className="checkbox_card">
                      <input
                        type="checkbox"
                        className="form-checkbox hidden"
                        id="newsletters"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor="newsletters"
                        className="flex justify-center items-center w-[16px] h-[16px] rounded-[3px] border border-grey-400 my-[2px] group-checked:bg-primary-400"
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
                      className="check-label small font-normal text-grey300"
                    >
                      I confirm I am over 16 and agree to the{" "}
                      <Link
                        target="_blank"
                        href="https://www.whatuni.com/wu-cont/termsAndCondition.htm"
                        className="text-primary-400 hover:text-primary-500 underline"
                        title=""
                      >
                        terms and conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        target="_blank"
                        href="https://www.whatuni.com/wu-cont/privacy.htm"
                        className="text-primary-400 hover:text-primary-500 underline"
                        title=""
                      >
                        privacy notice
                      </Link>
                    </label>
                  </div>
                  {errorstate.checkboxError && (
                    <div className="error  mt-[8px]">
                      <p className="x-small font-regular text md:text-center text-negative-default">
                        Please agree to our terms and conditions and privacy
                        notice
                      </p>
                    </div>
                  )}
                </div>
                <Subscribebtn
                  sysId={jsondata?.sys?.id}
                  isContentPreview={isPreviewTrue}
                  btnAction={submitNewsletter}
                  btnName={jsondata?.ctaLabel}
                  error={
                    errorstate.checkboxError || errorstate.emailError || !email
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
