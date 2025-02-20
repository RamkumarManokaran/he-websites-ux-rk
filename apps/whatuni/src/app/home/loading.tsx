import React from "react";
import HeroSliderComponentSkeleton from "@packages/shared-components/skeleton/heroslidercomponentskeleton";
import Wuscacomponentskeleton from "@packages/shared-components/skeleton/wuscacomponentskeleton";
const HomePageLoadingState = () => {
  return (
    <>
      <HeroSliderComponentSkeleton />
      <Wuscacomponentskeleton />
    </>
  );
};

export default HomePageLoadingState;
