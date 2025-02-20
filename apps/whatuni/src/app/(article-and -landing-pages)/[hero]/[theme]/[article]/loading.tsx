"use client";
export default function Loading() {
  return (
    <div className="bg-white ">
      <div className="max-w-container mx-auto px-[16px] xl:px-[0]">
        {/* Skeleton Breadcrum  */}
        <div className="pt-[16px] pb-[40px]">
          <nav aria-label="breadcrumb">
            <ul className="flex flex-wrap gap-[20px]">
              <li className="flex relative">
                <span className="skeleton after:absolute after:flex after:justify-center after:content-['/'] after:w-[20px] after:h-[20px] after:right-[-20px] rounded-none after:text-grey-300 min-w-[65px] h-[17px] flex skeleton-text-animated"></span>
              </li>
              <li className="flex relative">
                <span className="skeleton after:absolute after:flex after:justify-center after:content-['/'] after:w-[20px] after:h-[20px] after:right-[-20px] rounded-none after:text-grey-300 min-w-[65px] h-[17px] flex skeleton-text-animated"></span>
              </li>
              <li className="flex relative">
                <span className="skeleton after:absolute after:flex after:justify-center after:content-['/'] after:w-[20px] after:h-[20px] after:right-[-20px] rounded-none after:text-grey-300 min-w-[65px] h-[17px] flex skeleton-text-animated"></span>
              </li>
              <li className="flex relative">
                <span className="skeleton after:absolute after:flex after:justify-center after:content-[''] after:w-[20px] after:h-[20px] after:right-[-20px] rounded-none after:text-grey-300 min-w-[65px] h-[17px] flex skeleton-text-animated"></span>
              </li>
            </ul>
          </nav>
        </div>
        {/* Skeleton Breadcrum END */}
        {/* skeleton article description  */}
        <section className="pb-[40px]">
          <div className="flex flex-col">
            <span className="skeleton skeleton-text-animated flex max-w-[100px] h-[10px]"></span>
            <span className="skeleton skeleton-text-animated flex max-w-[200px] h-[30px]"></span>
            <span className="skeleton skeleton-text-animated flex max-w-[90%] h-[10px]"></span>
            <span className="skeleton skeleton-text-animated flex max-w-[80%] h-[10px]"></span>
            <span className="skeleton skeleton-text-animated flex max-w-[60%] min-h-[10px]"></span>
            <span className="skeleton skeleton-text-animated flex max-w-[100px] min-h-[40px]"></span>
          </div>
        </section>
        {/* skeleton article description END */}
        {/* skeleton article author  */}
        <section className="lg:pb-[40px]">
          <div className="flex flex-col lg:flex-row lg:gap-[20px]">
            <div className="border-t-[1px] lg:border-y-[1px] border-grey-200 py-[16px] min-w-[289px] max-w-[100%]">
              <div className="flex gap-[16px]">
                <span className="skeleton skeleton-text-animated flex max-w-[40px] min-h-[40px]"></span>
                <div className="flex w-full flex-col">
                  <span className="skeleton skeleton-text-animated flex max-w-[90%] min-h-[10px]"></span>
                  <span className="skeleton skeleton-text-animated flex max-w-[60%] min-h-[10px]"></span>
                </div>
              </div>
            </div>
            <div className="w-full">
              <span className="skeleton skeleton-text-animated flex min-h-[500px]"></span>
            </div>
          </div>
        </section>
        {/* skeleton article author END */}
      </div>
    </div>
  );
}
