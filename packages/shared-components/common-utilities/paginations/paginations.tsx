"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
const Paginations = ({ totalPages, currentPage }: any) => {
  const pageNumbers = [];
  const totalVisiblePages = 7;
console.log("TOTAl:"+ totalPages,currentPage)
  if (totalPages <= totalVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (currentPage <= 3) {
      for (let i = 2; i <= 5; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push("...");
      for (let i = totalPages - 4; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push("...");
      pageNumbers.push(currentPage - 1);
      pageNumbers.push(currentPage);
      pageNumbers.push(+currentPage + 1);
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  const items = pageNumbers;

  return (
    <>
      <div className="flex items-center justify-center gap-[20px] pt-[21px] mb-[30px]">
        <Link
          aria-label="move backward"
          href={currentPage > 1 ? `?pageNo=${currentPage - 1}` : `#`}
          type="button"
          className={`right-arrow flex items-center justify-center border border-primary-500 rounded-[25px] w-[34px] h-[34px] hover:bg-primary-600 ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
           <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 11L1 6L6 1"
                  stroke="#333F48"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
        </Link>
        <ul className="flex items-center justify-center gap-[2px] text-x-small">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                href={
                  item !== "..."
                    ? `?pageNo=${Number(item)}`
                    : `?pageNo=${Number(currentPage)}`
                }
                className={
                  currentPage == item
                    ? " flex items-center justify-center text-white w-[32px] h-[32px] bg-secondary-500 hover:text-white"
                    : `flex items-center justify-center text-primary-500 w-[32px] h-[32px] ${item !== "..." ? "hover:bg-secondary-500 hover:text-white" : ""}`
                }
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <a
          aria-label="move forward"
          href={
            currentPage < totalPages
              ? `?pageNo=${+currentPage + 1}`
              : `?pageNo=${+currentPage}`
          }
          className="cursor-pointer flex items-center justify-center text-center px-[2px] py-[8px] rounded-[4px] w-[36px] h-[36px]"
        >
          <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L6 6L1 11"
                  stroke="#333F48"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
        </a>
      </div>
    </>
  );
};

export default Paginations;
// export default Paginations;

// import Link from "next/link";
// import React from "react";
// const Paginations = () => {
//   return (
//     <div className="pt-[24px] pb-[40px] md:pb-[64px]">
//       <nav aria-label="navigation">
//         <ul className="pagination flex justify-center items-center gap-[8px]">
//           <li>
//             <a className="cursor-pointer flex items-center justify-center text-center px-[2px] py-[8px] rounded-[4px] w-[36px] h-[36px]">
//               <svg
//                 width="7"
//                 height="12"
//                 viewBox="0 0 7 12"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M6 11L1 6L6 1"
//                   stroke="#333F48"
//                   strokeWidth="1.67"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </li>
//           <li>
//             <Link
//               className="block small w-[36px] h-[36px] font-normal text-center px-[2px] py-[8px] rounded-[4px] bg-primary-400 text-white"
//               href="#"
//             >
//               1
//             </Link>
//           </li>
//           <li>
//             <Link
//               className="block small w-[36px] h-[36px] font-normal text-grey300 text-center px-[2px] py-[8px] rounded-[4px] hover:bg-blue-100 hover:text-primary-400"
//               href="#"
//             >
//               2
//             </Link>
//           </li>
//           <li>
//             <Link
//               className="block small w-[36px] h-[36px] font-normal text-grey300 text-center px-[2px] py-[8px] rounded-[4px] hover:bg-blue-100 hover:text-primary-400"
//               href="#"
//             >
//               3
//             </Link>
//           </li>
//           <li>
//             <Link
//               className="hidden md:block small w-[36px] h-[36px] font-normal text-grey300 text-center px-[2px] py-[8px] rounded-[4px] hover:bg-blue-100 hover:text-primary-400"
//               href="#"
//             >
//               4
//             </Link>
//           </li>
//           <li>
//             <Link
//               className="hidden md:block small w-[36px] h-[36px] font-normal text-grey300 text-center px-[2px] py-[8px] rounded-[4px] hover:bg-blue-100 hover:text-primary-400"
//               href="#"
//             >
//               5
//             </Link>
//           </li>
//           <li>
//             <span className="select-none flex items-center justify-center small w-[36px] h-[36px] font-normal text-grey300 text-center px-[2px] py-[8px] rounded-[4px] hover:bg-blue-100 hover:text-primary-400 ">
//               ...
//             </span>
//           </li>
//           <li>
//             <Link
//               className="block small w-[36px] h-[36px] font-normal text-grey300 text-center px-[2px] py-[8px] rounded-[4px] hover:bg-blue-100 hover:text-primary-400"
//               href="#"
//             >
//               25
//             </Link>
//           </li>
//           <li>
//             <a className="cursor-pointer flex items-center justify-center text-center px-[2px] py-[8px] rounded-[4px] w-[36px] h-[36px]">
//               <svg
//                 width="7"
//                 height="12"
//                 viewBox="0 0 7 12"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M1 1L6 6L1 11"
//                   stroke="#333F48"
//                   strokeWidth="1.67"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Paginations;
