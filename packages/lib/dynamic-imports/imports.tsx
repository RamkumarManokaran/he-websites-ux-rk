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
          import("@packages/shared-components/home/wuscas/wuscascomponents"),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "DynamicMediaComponent":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/home/discover/discovercomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "PageTagCloud":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/home/tag-cloud/tagcloudcomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "PageMultimediaTestimonials":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/home/testimonials/testimonialcomponents"
          ),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );
    case "Reviews":
      return dynamic(
        () =>
          import("@packages/shared-components/home/reviews/reviewscomponents"),
        { loading: () => <DynamicSkeleton skeletonName={input} /> }
      );

    case "EligibilityCriteria":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/article-landing/eligibility-criteria/eligibilitycriteriacomponents"
          )
      );
    case "TextSnippet":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/article-snippet/articlesnippetcomponents"
          )
      );
    case "Links":
      return null;
    case "Faqs":
      return dynamic(
        () =>
          import(
            "@packages/shared-components/common-utilities/faq/faqcomponents"
          )
      );
    case "pageviewlog":
      return dynamic(() => import("@packages/lib/utlils/pageviewlogging"));
    default:
      return null;
  }
};
export default dynamicComponentImports;
