import React from "react";
import MiniBannerSkeleton from "@packages/shared-components/skeleton/minibannerskeleton";
import Articlesnippetskeleton from "@packages/shared-components/skeleton/articlesnippetskeleton";
import Wuscacomponentskeleton from "@packages/shared-components/skeleton/wuscacomponentskeleton";

const Loading = () => {
  return (
    <>
      <MiniBannerSkeleton />
      <Articlesnippetskeleton />
      <Wuscacomponentskeleton />
    </>
  );
};

export default Loading;
