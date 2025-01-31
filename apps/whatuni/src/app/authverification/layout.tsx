import type { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
    return {
      alternates: {
        canonical:
          "",
      },
      title:
        "",
      description:
        "",
      robots:
         "",
      keywords:
         [],
        other: {
          "og:title":  "",
          "og:type": "",
          "og:description":"",
          "og:image":"",
          "og:url":"",
          "meta:description":"",
          "fb:app_id": "",
          "twitter:card": "",
          "twitter:creator": "",
          "twitter:url": "" ,
          "twitter:title":"", 
          "twitter:description":"",
          "twitter:image":
          "",
          "apple-itunes-app": "",
          "google-play-app": "", 
        }, 
    }; 
}
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
