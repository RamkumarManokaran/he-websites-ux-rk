"use client";
import React, { useState } from "react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
const FaqClient = ({ jsondata, iscontentPreview }: any) => {
  let data = useContentfulLiveUpdates(jsondata);
  if (!iscontentPreview) {
    data = jsondata;
  }
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const dt: any = [];
  data?.faqEntriesCollection?.items?.forEach((item: any) => {
    const question = {
      entryId: item?.sys?.id,
      fieldId: "question",
      targetSelector: "#faq_question",
    };
    const answer = {
      entryId: item?.sys?.id,
      fieldId: "answer",
      targetSelector: "#faq_answer",
    };
    dt.push(question, answer);
  });
  return (
    <>
      {iscontentPreview && <ContentfulInspectorManager fields={dt} />}
      <div className="accordion flex flex-col rounded-[6px] border border-grey-200 px-[16px]">
        {data?.faqEntriesCollection?.items?.map((item: any, index: any) => (
          <div
            className="accordion-item flex flex-col gap-[8px] py-[16px] border-b border-b-grey-200 last:border-b-0 cursor-pointer"
            key={index}
          >
            <div
              className="accordion-header flex items-center justify-between gap-[48px] para font-semibold text-grey300"
              id="faq_question"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span>
                {openIndex === index ? (
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 6L6 1L1 6"
                      stroke="#82898F"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 1L6 6L1 1"
                      stroke="#82898F"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
            <div
              className={`accordion-body mt-[16px] ${openIndex === index ? "expanded flex" : "collapsed hidden"}`}
              id="faq_answer"
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default FaqClient;
