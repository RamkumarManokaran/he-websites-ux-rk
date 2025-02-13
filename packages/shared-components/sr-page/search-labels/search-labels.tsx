"use client";
import emitter from "@packages/lib/eventEmitter/eventEmitter";
const SearchLabels = () => {
  const List = [
    "2023",
    "Undergraduate",
    "Sn3 TR7",
    "Full time",
    "Full time",
    "england",
  ];
  const openFilterFunction = () => {
    emitter.emit("isfilterOpen", null);
  };
  return (
    <section className="overflow-x-auto snap-x snap-mandatory bg-white px-[16px] py-[10px] md:px-[20px] xl:px-0 lg:py-[8px]">
      <div className="max-w-container mx-auto">
        <ul className="flex items-start gap-[8px] uppercase">
          {List?.map((items, index) => (
            <li
              className="bg-secondary-50 text-blue-500 whitespace-nowrap rounded-[4px] px-[10px] py-[3px] font-semibold x-small flex items-center gap-[2px]"
              key={index + 1}
            >
              {items}
              <svg
                className="cursor-pointer"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L12 4M4 4L12 12"
                  stroke="#3460DC"
                  strokeWidth="1.13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
          ))}
          <li
            className="bg-secondary-50 text-blue-500 whitespace-nowrap rounded-[4px] px-[10px] py-[3px] font-semibold x-small flex items-center gap-[2px]"
            onClick={openFilterFunction}
          >
            <div aria-label="Plus Icon">
              <svg
                className="cursor-pointer"
                width="7"
                height="20"
                viewBox="0 0 7 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.55756 10.508H4.31356V12.788H2.68156V10.508H0.437563V8.96H2.68156V6.668H4.31356V8.96H6.55756V10.508Z"
                  fill="#3460DC"
                />
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SearchLabels;
