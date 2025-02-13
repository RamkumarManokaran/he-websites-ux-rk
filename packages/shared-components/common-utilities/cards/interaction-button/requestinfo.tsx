import React from "react";

const RequestInfo = ({ showCount }: any) => {
  return (
    <>
      <button
        type="button"
        className={`btn btn-blue w-full ${
          showCount == 1 ? "justify-self-end lg:w-[162px]" : ""
        }`}
      >
        Request info
      </button>
    </>
  );
};

export default RequestInfo;
