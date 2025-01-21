"use client";
import { useEffect } from "react";
import Script from "next/script";
export default function MicroFrontend() {
  const domain = `${
    process.env.NEXT_PUBLIC_ENVIRONMENT === "dev"
      ? "https://mdev.dev.aws."
      : process.env.NEXT_PUBLIC_ENVIRONMENT === "stg"
        ? "https://mtest.test.aws."
        : "https://www."
  }`;
  console.log(domain);
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${domain}whatuni.com/colc/static/css/main.colc.0.1.3.css`;
    link.type = "text/css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <div>
        <Script
          src={`${domain}whatuni.com/colc/static/js/main.colc.0.1.3.js`}
        ></Script>
        <colc-calculator></colc-calculator>
      </div>
    </>
  );
}
