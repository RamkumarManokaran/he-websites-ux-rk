import dynamic from "next/dynamic";
import DynamicSkeleton from "./skeletons";
const dynamicComponentImports = (input: string | null | undefined) => {
  if (!input) {
    return null;
  }

  switch (input) {
    case "PageLogo":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/our-partners/ourpartnercomponent"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "PageStatPodContainer":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/wuscas/wuscascomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "DynamicMediaComponent":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/slider/discover/discovercomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "PageTagCloud":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/tag-cloud/tagcloudcomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "PageMultimediaTestimonials":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/testimonials/testimonialcomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "Reviews":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/slider/reviews/reviewscomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );

    case "EligibilityCriteria":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/eligibility-criteria/eligibilitycriteriacomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "TextSnippet":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/article-snippet/articlesnippetcomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "Links":
      return null;
    case "Faqs":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/faq/faqcomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "pageviewlog":
      return dynamic(() => import("@packages/lib/utlils/pageviewlogging"));
    case "ArticleCarousal":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/slider/advice/advicecomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    default:
      return null;
  }
};
export default dynamicComponentImports;
