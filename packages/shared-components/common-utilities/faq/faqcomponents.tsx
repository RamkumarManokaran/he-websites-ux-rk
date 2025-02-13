"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
const Faqcomponents = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faq_items = [
    {
      title: "How can I see my existing clients through Designership?",
      content:
        "It’s incredibly important to us that you’re supported. Designership has a dedicated team to provide answers, advice, and context throughout your experience with Designership. Your feedback and input is a huge part of your growth.",
    },
    {
      title: "How does Designership attract clients?",
      content:
        "It’s incredibly important to us that you’re supported. Designership has a dedicated team to provide answers, advice, and context throughout your experience with Designership. Your feedback and input is a huge part of your growth.",
    },
    {
      title: "What type of support does Designership provide?",
      content:
        "It’s incredibly important to us that you’re supported. Designership has a dedicated team to provide answers, advice, and context throughout your experience with Designership. Your feedback and input is a huge part of your growth.",
    },
    {
      title: "How can I see my existing clients through Designership?",
      content:
        "It’s incredibly important to us that you’re supported. Designership has a dedicated team to provide answers, advice, and context throughout your experience with Designership. Your feedback and input is a huge part of your growth.",
    },
    {
      title: "How does Designership attract clients?",
      content:
        "It’s incredibly important to us that you’re supported. Designership has a dedicated team to provide answers, advice, and context throughout your experience with Designership. Your feedback and input is a huge part of your growth.",
    },
    {
      title: "What type of support does Designership provide?",
      content:
        "It’s incredibly important to us that you’re supported. Designership has a dedicated team to provide answers, advice, and context throughout your experience with Designership. Your feedback and input is a huge part of your growth.",
    },
  ];
  return (
    <div className="faq-container bg-white">
      <div className="max-w-container mx-auto">
        <div className="faq-card-container flex flex-col gap-[32px] px-[16px] py-[40px] md:px-[20px] md:py-[64px] lg:px-[20px] xl:px-[0]">
          <div className="faq-header flex flex-col gap-[4px]">
            <div className="h2 font-bold">Heading</div>
            <p className="font-normal small">Subheading</p>
          </div>
          <div className="accordion flex flex-col rounded-[6px] border border-grey-200 px-[16px]">
            {faq_items.map((item, index) => (
              <div
                className="accordion-item flex flex-col gap-[8px] py-[16px] border-b border-b-grey-200 last:border-b-0 cursor-pointer"
                key={index}
              >
                <div
                  className="accordion-header flex items-center justify-between gap-[48px] para font-semibold text-grey-600"
                  onClick={() => toggleAccordion(index)}
                >
                  {item.title}
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                  >
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
                      className={`accordion-body `}
                    >
                      <div className="mt-[16px]">{item.content}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqcomponents;
