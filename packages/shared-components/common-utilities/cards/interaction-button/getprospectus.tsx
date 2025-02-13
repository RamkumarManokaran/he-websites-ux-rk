import React from "react";

const Getprospectus = ({ pageName }: any) => {
  return (
    <>
      {pageName == "courseDetails" ? (
        <button type="button" className={"btn btn-negative-default w-full"}>
          Get Prospectus
        </button>
      ) : (
        <button type="button" className="btn btn-orange w-full">
          Get Prospectus {pageName}
        </button>
      )}
    </>
  );
};

export default Getprospectus;
