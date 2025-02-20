"use client";
import React, { useState } from "react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { AnimatePresence, motion } from "motion/react";
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
  data?.faqEntriesCollection?.items?.forEach((item: any, index: number) => {
    const question = {
      entryId: item?.sys?.id,
      fieldId: "question",
      targetSelector: `#faq_question${index}`,
    };
    const answer = {
      entryId: item?.sys?.id,
      fieldId: "answer",
      targetSelector: `#faq_answer${index}`,
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
              id={`faq_question${index}`}
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <motion.span animate={{ rotate: openIndex === index ? 180 : 0 }}>
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
              </motion.span>
            </div>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { duration: 0.25, ease: "easeInOut" },
                  }}
                  className={`accordion-body ${openIndex === index ? "expanded flex" : "collapsed hidden"}`}
                  id={`faq_answer${index}`}
                >
                  <div className="mt-[16px]">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
};
export default FaqClient;
