"use client";
import React, { useState } from "react";
const ClickAndShow = ({ children }: any) => {
  const [isModuleOpen, setIsModuleOpen] = useState(false);

  const moduleToggle = () => {
    setIsModuleOpen(!isModuleOpen);
  };
  return (
    <div className="flex flex-col gap-[4px">
      <div
        onClick={moduleToggle}
        className="flex items-center gap-[4px] text-primary-400 small font-semibold cursor-pointer"
      >
        {isModuleOpen ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.5 8.49986C1.5 7.98702 1.91574 7.57129 2.42857 7.57129L13.5714 7.57129C14.0843 7.57129 14.5 7.98703 14.5 8.49986C14.5 9.0127 14.0843 9.42843 13.5714 9.42843L2.42857 9.42843C1.91574 9.42843 1.5 9.0127 1.5 8.49986Z"
              fill="#4664DC"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 1.875C10.641 1.875 11.1607 2.39467 11.1607 3.03571V8.83929H16.9643C17.6053 8.83929 18.125 9.35895 18.125 10C18.125 10.641 17.6053 11.1607 16.9643 11.1607H11.1607V16.9643C11.1607 17.6053 10.641 18.125 10 18.125C9.35895 18.125 8.83929 17.6053 8.83929 16.9643V11.1607H3.03571C2.39467 11.1607 1.875 10.641 1.875 10C1.875 9.35895 2.39467 8.83928 3.03571 8.83928L8.83929 8.83929V3.03571C8.83929 2.39467 9.35895 1.875 10 1.875Z"
              fill="#4664DC"
            />
          </svg>
        )}
        Modules
      </div>
      {isModuleOpen && (
        <div
          className={`transition-all duration-300 ease-in-out ${
            isModuleOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ClickAndShow;
