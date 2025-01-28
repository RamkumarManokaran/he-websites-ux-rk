import type { Metadata } from "next";
import { ArticleDetailSeoQuery } from "@packages/lib/graphQL/article-detail";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const Params = await params;
  const slugurl = `/${Params?.hero}/${Params?.theme}/${Params?.article}/`;
  try {
    const query = ArticleDetailSeoQuery(slugurl);
    const metadata = await graphQlFetchFunction(query);
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
      other: {
        "fb:app_id": "374120612681083",
        "fb:admins": "27327779286",
        "og:title":
          metadata?.data?.contentData?.items[0]?.seoFields?.metaTite || "",
        "og:type": "article",
        "og:description":
          metadata?.data?.contentData?.items[0]?.seoFields?.metaDescription ||
          "",
        "og:image":
          "https://images-dom.prod.aws.idp-connect.com/commimg/myhotcourses/blog/post/myhc_69542.jpg",
        "og:url":
          metadata?.data?.contentData?.items[0]?.seoFields?.canonical ||
          `https://www.whatuni.com/${slugurl}`,
        "twitter:card": "summary",
        "twitter:creator": "@whatuni",
        "twitter:url":
          metadata?.data?.contentData?.items[0]?.seoFields?.canonical ||
          `https://www.whatuni.com/${slugurl}`,
        "twitter:title":
          metadata?.data?.contentData?.items[0]?.seoFields?.metaTite || "",
        "twitter:description":
          metadata?.data?.contentData?.items[0]?.seoFields?.metaDescription ||
          "",
        "twitter:image":
          "https://images-dom.prod.aws.idp-connect.com/wu-cont/images/logo_print.png",
        "apple-itunes-app": "app-id=1267341390",
        "google-play-app": "app-id=com.hotcourses.group.wuapp",
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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return <>{children}</>;
}
