import type { Metadata } from "next";
import { ColcSeo } from "@packages/lib/graphQL/coclc";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
export async function generateMetadata(): Promise<Metadata> {

 
  try {
    const metadata = await graphQlFetchFunction(ColcSeo);
    return {
      alternates: {
        canonical:
          metadata?.data?.contentData?.items[0]?.seoFields?.canonical ||
          "https://www.whatuni.com/money/money/budgeting/ug-student-budget-calculator/",
      },
      title:
        metadata?.data?.contentData?.items[0]?.seoFields?.metaTite ||
        "Default Title",
      description:
        metadata?.data?.contentData?.items[0]?.seoFields?.metaDescription ||
        "Default Description",
      robots:
        metadata?.data?.contentData?.items[0]?.robots?.title || "index, follow",
      keywords:
        metadata?.data?.contentData?.items[0]?.seoFields?.metaKeywords || [],
        other: {
          "og:title": metadata?.data?.contentData?.items[0]?.seoFields?.metaTite || "",
          "og:type": "website",
          "og:description":metadata?.data?.contentData?.items[0]?.seoFields?.metaDescription || "",
          "og:image":"https://images.ctfassets.net/szez98lehkfm/UEsONfx1Q29FkoafrRlPT/e89b566373b65e6a6cfa1f575986566c/whatuni_logo.svg",
          "og:url":metadata?.data?.contentData?.items[0]?.seoFields?.canonical ||  "https://www.whatuni.com/money/money/budgeting/ug-student-budget-calculator/",
          "meta:description":metadata?.data?.contentData?.items[0]?.seoFields?.metaDescription,
         "fb:app_id": "374120612681083",
          "twitter:card": "summary",
          "twitter:creator": "@whatuni",
          "twitter:url": metadata?.data?.contentData?.items[0]?.seoFields?.canonical ||   "https://www.whatuni.com/money/money/budgeting/ug-student-budget-calculator/",
          "twitter:title": metadata?.data?.contentData?.items[0]?.seoFields?.metaTite, 
          "twitter:description":metadata?.data?.contentData?.items[0]?.seoFields?.metaDescription,
          "twitter:image":
          "https://images.ctfassets.net/szez98lehkfm/UEsONfx1Q29FkoafrRlPT/e89b566373b65e6a6cfa1f575986566c/whatuni_logo.svg",
          "apple-itunes-app":"",
          "google-play-app": "", 
        }, 
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Default Title",
      description: "Default Description",
      robots: "noindex, nofollow",
      keywords: null,
      alternates: {
        canonical: "https://www.Whatuni.com/",
      },
    };
  }
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
