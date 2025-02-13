import React from "react";
import Breadcrumblayoutcomponent from "@packages/shared-components/common-utilities/breadcrumb-layout/breadcrumblayoutcomponent";
const TopSection = () => {
  const breadcrumbData = [
    {
      url: "#",
      Imgurl: "/static/assets/icons/breadcrumbs-home-icon.svg",
    },
    {
      url: "#",
      label: "Home",
    },
    {
      url: "#",
      label: "Scholarships",
    },
    {
      url: "",
      label: "Search results",
    },
  ];
  return (
    <section className="px-[16px] md:px-[20px] xl:px-0">
      <div className="max-w-container mx-auto">
        <div className="px-[16px] xl:px-[0] md:p-[24px_0_8px] hidden md:block">
          <Breadcrumblayoutcomponent data={breadcrumbData} />
        </div>
        <div className="py-[16px]">
          <div className="h5 mb-[4px]">
            Top Law, Engineering & Architecture subjects for you
          </div>
          <p>000 universities offer 1563 courses</p>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
