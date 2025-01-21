import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Seoquery } from "@packages/lib/graphQL/graphql-query";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import Script from "next/script";
import Footer from "@packages/shared-components/common-utilities/footer/footercomponents";
import HeaderWrapper from "@packages/shared-components/common-utilities/header/headerWrapper";
import OneTrustCookieScript from "@packages/lib/oneTrust/OneTrustCookieScript";
import GoogleOneTapPgs from "@packages/lib/utlils/GoogleOneTapPgs";
import { Suspense } from "react";
const farroBold = localFont({
  src: "./fonts/Farro-Bold.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const interBold = localFont({
  src: "./fonts/Inter-Bold.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const metadata = await graphQlFetchFunction(Seoquery);
    return {
      alternates: {
        canonical:
          metadata?.data?.contentData?.items[0]?.seoFields?.canonical ||
          "https://www.postgraduatesearch.com",
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
        canonical: "https://www.postgraduatesearch.com",
      },
    };
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-ga-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){
        w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_PGS_GTM_ACCOUNT || ""}');
    `,
          }}
        />
      </head>
      <body
        className={`${farroBold.variable} ${interBold.variable} antialiased`}
      >
        {" "}
        <Suspense>
          <OneTrustCookieScript
            domianValue={`${process.env.NEXT_PUBLIC_PGS_ONE_TRUST_DOMAIN}`}
          />
        </Suspense>
        <GoogleOneTapPgs />
        <HeaderWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
