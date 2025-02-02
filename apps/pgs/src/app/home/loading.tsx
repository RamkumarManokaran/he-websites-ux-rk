import React from "react";
import HeroSliderComponentSkeleton from "@packages/shared-components/skeleton/heroslidercomponentskeleton";
import Tagcloudcardskeleton from "@packages/shared-components/skeleton/tagcloudcardskeleton";
const HomePageLoadingState = () => {
  return (
    <>
      <HeroSliderComponentSkeleton />
      <Tagcloudcardskeleton />
    </>
  );
};

export default HomePageLoadingState;
