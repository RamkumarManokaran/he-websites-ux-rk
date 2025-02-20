import React from "react";
import MiniBannerSkeleton from "@packages/shared-components/skeleton/minibannerskeleton";
import Articlesnippetskeleton from "@packages/shared-components/skeleton/articlesnippetskeleton";
import AdviceCourseCardSkeleton from "@packages/shared-components/skeleton/advicecoursecardskeleton";
const loading = () => {
  return (
    <>
      <MiniBannerSkeleton />
      <Articlesnippetskeleton />
      <AdviceCourseCardSkeleton />
    </>
  );
};

export default loading;
