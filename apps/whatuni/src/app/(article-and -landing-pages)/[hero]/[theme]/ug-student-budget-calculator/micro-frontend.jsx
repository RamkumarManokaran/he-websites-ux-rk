"use client";
import { useEffect, useRef, useState } from "react";
import emitter from "@packages/lib/eventEmitter/eventEmitter";
import Script from "next/script";
export default function MicroFrontend() {
  const [count, setCount] = useState();
  const ref = useRef(null);
  const domain = `${
    process.env.NEXT_PUBLIC_ENVIRONMENT === "dev"
      ? "https://mdev.dev.aws."
      : process.env.NEXT_PUBLIC_ENVIRONMENT === "stg"
        ? "https://mtest.test.aws."
        : "https://www."
  }`;
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${domain}whatuni.com/colc/static/css/main.colc.1.0.2.css`;
    link.type = "text/css";
    document.head.appendChild(link);
    if (ref.current) {
      const onCustomEvent = (event) => {
        const customEventDetail = event.detail;
        setCount(customEventDetail);
      };
      ref.current.addEventListener("colcEvents", onCustomEvent);
    }
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  useEffect(() => {
    emitter.emit("courseCount", count);
    document.cookie = `USER_FAV_BASKET_COUNT=${count?.userData?.favouriteCount || 0}; Path=/`;
  }, [count]);

  return (
    <>
      <div className="min-h-[1000px]">
        <Script
          src={`${domain}whatuni.com/colc/static/js/main.colc.1.0.2.js`}
        ></Script>
        <colc-calculator ref={ref}></colc-calculator>
      </div>
    </>
  );
}
