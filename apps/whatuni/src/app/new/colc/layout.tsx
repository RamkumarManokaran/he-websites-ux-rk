import type { Metadata } from "next";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { ColcLandingPageSeoQuery } from "@packages/lib/graphQL/cocl-landing";
export async function generateMetadata(): Promise<Metadata> {
  try {
    const metadata = await graphQlFetchFunction(ColcLandingPageSeoQuery);
    return {
      alternates: {
        canonical:
          metadata?.data?.contentData?.items[0]?.seoFields?.canonical ||
          "https://www.Whatuni.com/",
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
