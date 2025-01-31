import type { Metadata } from "next";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { ThemeLandingSeoQuery } from "@packages/lib/graphQL/theme-landing";
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const Params = await params;
  const slugurl = `/${Params?.hero}/${Params?.theme}/`;
  try {
    const query = ThemeLandingSeoQuery(slugurl);
    const metadata = await graphQlFetchFunction(query);

    return {
      alternates: {
        canonical:
          metadata?.data?.contentData?.items[0]?.seoFields?.canonical ||
          `https://www.whatuni.com/${slugurl}`,
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
          "og:url":metadata?.data?.contentData?.items[0]?.seoFields?.canonical ||  `https://www.whatuni.com${slugurl}`,
          "meta:description":metadata?.data?.contentData?.items[0]?.seoFields?.metaDescription,
          "fb:app_id": "374120612681083",
          "twitter:card": "summary",
          "twitter:creator": "@whatuni",
          "twitter:url": metadata?.data?.contentData?.items[0]?.seoFields?.canonical || `https://www.whatuni.com${slugurl}` ,
          "twitter:title": metadata?.data?.contentData?.items[0]?.seoFields?.metaTite, 
          "twitter:description":metadata?.data?.contentData?.items[0]?.seoFields?.metaDescription,
          "twitter:image":
          "https://images.ctfassets.net/szez98lehkfm/UEsONfx1Q29FkoafrRlPT/e89b566373b65e6a6cfa1f575986566c/whatuni_logo.svg",
          "apple-itunes-app":  `${slugurl ==="/money/ug-student-cost-of-living-calculator/" ?"" :"app-id=1267341390"}`,
          "google-play-app":  `${slugurl ==="/money/ug-student-cost-of-living-calculator/" ?"" :"app-id=com.hotcourses.group.wuapp"}`, 
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
