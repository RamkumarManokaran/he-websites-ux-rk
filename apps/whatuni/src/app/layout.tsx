import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import Subscribecomponents from "@packages/shared-components/common-utilities/newsletter-and-subscription/subscribe-newsletter/subscribecomponents";
import Script from "next/script";
import { Seoquery } from "@packages/lib/graphQL/graphql-query";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import TrackSessionId from "@packages/lib/utlils/tracksessionid";
import GoogleOneTap from "@packages/lib/utlils/GoogleOneTap";
import HeaderWrapper from "../../../../packages/shared-components/layout-components/header/headerWrapper";
import Footer from "@packages/shared-components/layout-components/footer/footercomponents";
import OneTrustCookieScript from "@packages/lib/oneTrust/OneTrustCookieScript";
import SetCookiewuIdToken from "@packages/lib/utlils/setcookie";
import GTMScript from "@packages/lib/utlils/loadgtm";
const farroBold = localFont({
  src: "./fonts/Farro-Bold.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const interBold = localFont({
  src: "./fonts/Inter-Bold.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});
export async function generateMetadata(): Promise<Metadata> {
  try {
    const metadata = await graphQlFetchFunction(Seoquery);
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
        "og:title":
          metadata?.data?.contentData?.items[0]?.seoFields?.metaTite ||
          "The best UK University & degree guides | rankings & reviews",
        "og:type": "website",
        "og:description":
          metadata?.data?.contentData?.items[0]?.seoFields?.metaDescription ||
          "Compare the best University & degree courses for free - Degree course rankings, university reviews, degree course details, university profiles to help you decide which University to attend",
        "og:image": `${process.env.PROJECT === "Whatuni" ? "https://images.ctfassets.net/szez98lehkfm/UEsONfx1Q29FkoafrRlPT/e89b566373b65e6a6cfa1f575986566c/whatuni_logo.svg" : "https://images.ctfassets.net/szez98lehkfm/6Z2XBvZNThCE23P5umA60L/b24e7dbf371dadfedc8a124ade7d77e9/POSTGRADUATE_SEARCH_RGB.svg"}`,
        "og:url":
          metadata?.data?.contentData?.items[0]?.seoFields?.canonical ||
          `https://www.whatuni.com/`,

        "meta:description":
          metadata?.data?.contentData?.items[0]?.seoFields?.metaDescription,
        "fb:app_id": "617249984971742",
        "twitter:card": "summary",
        "twitter:creator": "@whatuni",
        "twitter:url": `${metadata?.data?.contentData?.items[0]?.seoFields?.canonical} ?? "https://www.whatuni.com/"`,
        "twitter:title":
          metadata?.data?.contentData?.items[0]?.seoFields?.metaTite,
        "twitter:description":
          metadata?.data?.contentData?.items[0]?.seoFields?.metaDescription,
        "twitter:image": `${process.env.PROJECT === "Whatuni" ? "https://images.ctfassets.net/szez98lehkfm/UEsONfx1Q29FkoafrRlPT/e89b566373b65e6a6cfa1f575986566c/whatuni_logo.svg" : "https://images.ctfassets.net/szez98lehkfm/6Z2XBvZNThCE23P5umA60L/b24e7dbf371dadfedc8a124ade7d77e9/POSTGRADUATE_SEARCH_RGB.svg"}`,
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GTMScript />
      <body
        className={`${farroBold.variable} ${interBold.variable} antialiased`}
      >
        <Suspense>
          <OneTrustCookieScript
            domianValue={process.env.NEXT_PUBLIC_WU_ONE_TRUST_DOMAIN || ""}
          />
        </Suspense>
        <GoogleOneTap />
        <SetCookiewuIdToken />
        <TrackSessionId />

        <HeaderWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
