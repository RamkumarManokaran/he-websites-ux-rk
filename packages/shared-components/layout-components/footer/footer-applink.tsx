"use client";
import React, { useState, useEffect } from "react";

import { AppLinkItem } from "@packages/lib/types/interfaces";
import {
  currentAuthenticatedUser,
  GADataLayerFn,
} from "@packages/lib/utlils/helper-function";
interface PropsInterface {
  data: AppLinkItem[];
}
const FooterAppLinks = ({ data }: PropsInterface) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  const domain = `${
    process.env.NEXT_PUBLIC_ENVIRONMENT === "dev"
      ? "https://mdev.dev.aws."
      : process.env.NEXT_PUBLIC_ENVIRONMENT === "stg"
        ? "https://mtest.test.aws."
        : "https://www."
  }`;
  return (
    <ul
      className="flex flex-row md:flex-col gap-[16px]"
      data-testid="nav_applinks"
    >
      {data[0] && (
        <li data-testid="app_store">
          <a
            className="block w-fit"
            target="_blank"
            href={
              isMobile
                ? data[0]?.primaryCtaUrl
                : `${domain}whatuni.com/whatuni-mobile-app`
            }
            onClick={async () => {
              GADataLayerFn(
                "ga_contentful_events",
                data[0]?.primaryCtaEventName,
                "NA",
                "NA",
                "NA",
                "NA",
                localStorage?.getItem("gaPageName") || "",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "in_year",
                await currentAuthenticatedUser(),
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                `${process.env.PROJECT}`,
                data[0]?.primaryCtaLabel,
                data[0]?.primaryCtaUrl
              );
            }}
            aria-label="App Store"
          >
            <svg
              width="120"
              height="41"
              viewBox="0 0 120 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="1"
                width="119"
                height="39"
                rx="6.5"
                fill="black"
              />
              <rect
                x="0.5"
                y="1"
                width="119"
                height="39"
                rx="6.5"
                stroke="#A6A6A6"
              />
              <path
                d="M81.5259 19.701V21.992H80.0899V23.4944H81.5259V28.5994C81.5259 30.3426 82.3145 31.0398 84.2984 31.0398C84.647 31.0398 84.9791 30.9983 85.2696 30.9485V29.4627C85.0206 29.4876 84.8628 29.5042 84.5889 29.5042C83.7007 29.5042 83.3106 29.0892 83.3106 28.1429V23.4944H85.2696V21.992H83.3106V19.701H81.5259Z"
                fill="white"
              />
              <path
                d="M90.3234 31.1644C92.9631 31.1644 94.5817 29.3963 94.5817 26.4661C94.5817 23.5525 92.9548 21.7762 90.3234 21.7762C87.6838 21.7762 86.0568 23.5525 86.0568 26.4661C86.0568 29.3963 87.6755 31.1644 90.3234 31.1644ZM90.3234 29.5789C88.7712 29.5789 87.8996 28.4417 87.8996 26.4661C87.8996 24.5071 88.7712 23.3616 90.3234 23.3616C91.8674 23.3616 92.7473 24.5071 92.7473 26.4661C92.7473 28.4334 91.8674 29.5789 90.3234 29.5789Z"
                fill="white"
              />
              <path
                d="M95.9666 30.99H97.7513V25.6526C97.7513 24.3826 98.7059 23.5276 100.059 23.5276C100.374 23.5276 100.906 23.5857 101.055 23.6356V21.8758C100.864 21.826 100.524 21.8011 100.258 21.8011C99.0794 21.8011 98.075 22.4485 97.8177 23.3367H97.6849V21.9505H95.9666V30.99Z"
                fill="white"
              />
              <path
                d="M105.486 23.2952C106.806 23.2952 107.669 24.2166 107.711 25.636H103.145C103.245 24.2249 104.166 23.2952 105.486 23.2952ZM107.703 28.5496C107.371 29.2552 106.632 29.6453 105.553 29.6453C104.125 29.6453 103.204 28.6409 103.145 27.0555V26.9559H109.529V26.3333C109.529 23.4944 108.01 21.7762 105.495 21.7762C102.946 21.7762 101.328 23.6107 101.328 26.4993C101.328 29.388 102.913 31.1644 105.503 31.1644C107.57 31.1644 109.014 30.1683 109.421 28.5496H107.703Z"
                fill="white"
              />
              <path
                d="M69.8223 27.6519C69.96 29.8716 71.8098 31.2912 74.5629 31.2912C77.5053 31.2912 79.3464 29.8028 79.3464 27.4282C79.3464 25.5612 78.2968 24.5288 75.7502 23.9352L74.3822 23.5996C72.7647 23.2211 72.1109 22.7135 72.1109 21.8273C72.1109 20.7088 73.1261 19.9775 74.6489 19.9775C76.0943 19.9775 77.0923 20.6916 77.273 21.8359H79.1486C79.0367 19.7452 77.1956 18.274 74.6747 18.274C71.9646 18.274 70.1579 19.7452 70.1579 21.9564C70.1579 23.7803 71.1817 24.8643 73.4272 25.3892L75.0275 25.7763C76.6707 26.1635 77.3934 26.7313 77.3934 27.6777C77.3934 28.7789 76.2578 29.5791 74.7091 29.5791C73.0487 29.5791 71.8958 28.8306 71.7323 27.6519H69.8223Z"
                fill="white"
              />
              <path
                d="M51.335 21.8011C50.1065 21.8011 49.044 22.4153 48.4961 23.4446H48.3633V21.9505H46.6451V33.9949H48.4297V29.6204H48.5708C49.044 30.575 50.065 31.1395 51.3516 31.1395C53.6343 31.1395 55.087 29.3382 55.087 26.4661C55.087 23.594 53.6343 21.8011 51.335 21.8011ZM50.8287 29.5374C49.3345 29.5374 48.3965 28.3587 48.3965 26.4744C48.3965 24.5818 49.3345 23.4031 50.837 23.4031C52.3477 23.4031 53.2525 24.5569 53.2525 26.4661C53.2525 28.3836 52.3477 29.5374 50.8287 29.5374Z"
                fill="white"
              />
              <path
                d="M61.3318 21.8011C60.1033 21.8011 59.0408 22.4153 58.4929 23.4446H58.3601V21.9505H56.6419V33.9949H58.4265V29.6204H58.5676C59.0408 30.575 60.0618 31.1395 61.3484 31.1395C63.6311 31.1395 65.0838 29.3382 65.0838 26.4661C65.0838 23.594 63.6311 21.8011 61.3318 21.8011ZM60.8255 29.5374C59.3313 29.5374 58.3933 28.3587 58.3933 26.4744C58.3933 24.5818 59.3313 23.4031 60.8338 23.4031C62.3445 23.4031 63.2493 24.5569 63.2493 26.4661C63.2493 28.3836 62.3445 29.5374 60.8255 29.5374Z"
                fill="white"
              />
              <path
                d="M43.4431 30.99H45.4907L41.0083 18.5752H38.9348L34.4524 30.99H36.4312L37.5755 27.6949H42.3074L43.4431 30.99ZM39.8726 20.8293H40.0189L41.817 26.0774H38.0659L39.8726 20.8293Z"
                fill="white"
              />
              <path
                d="M35.6511 9.21094V15.2H37.8135C39.5981 15.2 40.6316 14.1001 40.6316 12.1868C40.6316 10.3025 39.5898 9.21094 37.8135 9.21094H35.6511ZM36.5808 10.0576H37.7097C38.9507 10.0576 39.6853 10.8462 39.6853 12.1992C39.6853 13.573 38.9631 14.3533 37.7097 14.3533H36.5808V10.0576Z"
                fill="white"
              />
              <path
                d="M43.7967 15.2871C45.1165 15.2871 45.9258 14.4031 45.9258 12.938C45.9258 11.4812 45.1124 10.593 43.7967 10.593C42.4769 10.593 41.6634 11.4812 41.6634 12.938C41.6634 14.4031 42.4727 15.2871 43.7967 15.2871ZM43.7967 14.4944C43.0206 14.4944 42.5848 13.9258 42.5848 12.938C42.5848 11.9585 43.0206 11.3857 43.7967 11.3857C44.5687 11.3857 45.0086 11.9585 45.0086 12.938C45.0086 13.9216 44.5687 14.4944 43.7967 14.4944Z"
                fill="white"
              />
              <path
                d="M52.818 10.6802H51.9256L51.1205 14.1292H51.0499L50.1202 10.6802H49.2652L48.3355 14.1292H48.2691L47.4598 10.6802H46.555L47.8001 15.2H48.7174L49.6471 11.8713H49.7176L50.6515 15.2H51.577L52.818 10.6802Z"
                fill="white"
              />
              <path
                d="M53.8456 15.2H54.7379V12.5562C54.7379 11.8506 55.1571 11.4106 55.817 11.4106C56.477 11.4106 56.7924 11.7717 56.7924 12.498V15.2H57.6847V12.2739C57.6847 11.199 57.1286 10.593 56.12 10.593C55.4394 10.593 54.9911 10.896 54.7711 11.3982H54.7047V10.6802H53.8456V15.2Z"
                fill="white"
              />
              <path d="M59.09 15.2H59.9824V8.91626H59.09V15.2Z" fill="white" />
              <path
                d="M63.3384 15.2871C64.6582 15.2871 65.4675 14.4031 65.4675 12.938C65.4675 11.4812 64.6541 10.593 63.3384 10.593C62.0186 10.593 61.2051 11.4812 61.2051 12.938C61.2051 14.4031 62.0144 15.2871 63.3384 15.2871ZM63.3384 14.4944C62.5623 14.4944 62.1265 13.9258 62.1265 12.938C62.1265 11.9585 62.5623 11.3857 63.3384 11.3857C64.1104 11.3857 64.5503 11.9585 64.5503 12.938C64.5503 13.9216 64.1104 14.4944 63.3384 14.4944Z"
                fill="white"
              />
              <path
                d="M68.1263 14.5234C67.6407 14.5234 67.2879 14.2869 67.2879 13.8801C67.2879 13.4817 67.5701 13.27 68.1927 13.2285L69.2967 13.158V13.5356C69.2967 14.0959 68.7986 14.5234 68.1263 14.5234ZM67.898 15.2747C68.4915 15.2747 68.9854 15.0173 69.2552 14.5649H69.3257V15.2H70.1849V12.1121C70.1849 11.1575 69.5457 10.593 68.4126 10.593C67.3875 10.593 66.657 11.0911 66.5657 11.8672H67.429C67.5286 11.5476 67.8731 11.365 68.3711 11.365C68.9812 11.365 69.2967 11.6348 69.2967 12.1121V12.5022L68.0723 12.5728C66.9974 12.6392 66.3914 13.1082 66.3914 13.9216C66.3914 14.7476 67.0264 15.2747 67.898 15.2747Z"
                fill="white"
              />
              <path
                d="M73.213 15.2747C73.8355 15.2747 74.3626 14.98 74.6324 14.4861H74.703V15.2H75.558V8.91626H74.6656V11.3982H74.5992C74.3543 10.9001 73.8314 10.6055 73.213 10.6055C72.0716 10.6055 71.337 11.5103 71.337 12.938C71.337 14.3699 72.0633 15.2747 73.213 15.2747ZM73.4662 11.4065C74.2132 11.4065 74.6822 12 74.6822 12.9421C74.6822 13.8884 74.2174 14.4736 73.4662 14.4736C72.7108 14.4736 72.2584 13.8967 72.2584 12.938C72.2584 11.9875 72.7149 11.4065 73.4662 11.4065Z"
                fill="white"
              />
              <path
                d="M81.3444 15.2871C82.6643 15.2871 83.4736 14.4031 83.4736 12.938C83.4736 11.4812 82.6601 10.593 81.3444 10.593C80.0246 10.593 79.2111 11.4812 79.2111 12.938C79.2111 14.4031 80.0205 15.2871 81.3444 15.2871ZM81.3444 14.4944C80.5683 14.4944 80.1325 13.9258 80.1325 12.938C80.1325 11.9585 80.5683 11.3857 81.3444 11.3857C82.1164 11.3857 82.5563 11.9585 82.5563 12.938C82.5563 13.9216 82.1164 14.4944 81.3444 14.4944Z"
                fill="white"
              />
              <path
                d="M84.6548 15.2H85.5471V12.5562C85.5471 11.8506 85.9663 11.4106 86.6262 11.4106C87.2861 11.4106 87.6016 11.7717 87.6016 12.498V15.2H88.4939V12.2739C88.4939 11.199 87.9377 10.593 86.9292 10.593C86.2485 10.593 85.8003 10.896 85.5803 11.3982H85.5139V10.6802H84.6548V15.2Z"
                fill="white"
              />
              <path
                d="M92.6036 9.55542V10.7009H91.8856V11.4521H92.6036V14.0046C92.6036 14.8762 92.9979 15.2249 93.9898 15.2249C94.1642 15.2249 94.3302 15.2041 94.4754 15.1792V14.4363C94.3509 14.4487 94.2721 14.457 94.1351 14.457C93.691 14.457 93.4959 14.2495 93.4959 13.7764V11.4521H94.4754V10.7009H93.4959V9.55542H92.6036Z"
                fill="white"
              />
              <path
                d="M95.6732 15.2H96.5656V12.5603C96.5656 11.8755 96.9723 11.4148 97.7028 11.4148C98.3336 11.4148 98.6698 11.78 98.6698 12.5022V15.2H99.5622V12.2822C99.5622 11.2073 98.9687 10.5972 98.0058 10.5972C97.3251 10.5972 96.8478 10.9001 96.6278 11.4065H96.5573V8.91626H95.6732V15.2Z"
                fill="white"
              />
              <path
                d="M102.781 11.3525C103.441 11.3525 103.873 11.8132 103.894 12.5229H101.611C101.661 11.8174 102.121 11.3525 102.781 11.3525ZM103.889 13.9797C103.723 14.3325 103.354 14.5276 102.814 14.5276C102.101 14.5276 101.64 14.0254 101.611 13.2327V13.1829H104.802V12.8716C104.802 11.4521 104.043 10.593 102.785 10.593C101.511 10.593 100.702 11.5103 100.702 12.9546C100.702 14.3989 101.495 15.2871 102.789 15.2871C103.823 15.2871 104.545 14.7891 104.748 13.9797H103.889Z"
                fill="white"
              />
              <path
                d="M24.769 20.8008C24.7907 19.1198 25.6934 17.5292 27.1256 16.6488C26.2221 15.3584 24.7088 14.5403 23.1344 14.4911C21.4552 14.3148 19.8272 15.4959 18.9715 15.4959C18.0992 15.4959 16.7817 14.5086 15.363 14.5378C13.5137 14.5975 11.7898 15.6489 10.8901 17.2656C8.95607 20.6141 10.3987 25.5351 12.2513 28.2417C13.1782 29.5671 14.2615 31.0475 15.6789 30.995C17.066 30.9375 17.584 30.1105 19.2583 30.1105C20.9171 30.1105 21.4031 30.995 22.8493 30.9616C24.3377 30.9375 25.2754 29.6304 26.1698 28.2925C26.8358 27.3481 27.3483 26.3044 27.6882 25.2C25.9391 24.4602 24.771 22.7 24.769 20.8008Z"
                fill="white"
              />
              <path
                d="M22.0373 12.7111C22.8489 11.7369 23.2487 10.4847 23.1518 9.22046C21.912 9.35068 20.7668 9.94324 19.9443 10.8801C19.14 11.7954 18.7214 13.0255 18.8006 14.2415C20.0408 14.2542 21.2601 13.6777 22.0373 12.7111Z"
                fill="white"
              />
            </svg>
          </a>
        </li>
      )}
      {data[1] && (
        <li data-testid="play_store">
          <a
            className="block w-fit"
            target="_blank"
            href={
              isMobile
                ? data[1]?.primaryCtaUrl
                : `${domain}whatuni.com/whatuni-mobile-app`
            }
            onClick={async () => {
              GADataLayerFn(
                "ga_contentful_events",
                data[1]?.primaryCtaEventName,
                "NA",
                "NA",
                "NA",
                "NA",
                localStorage?.getItem("gaPageName") || "",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "in_year",
                await currentAuthenticatedUser(),
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                "NA",
                `${process.env.PROJECT}`,
                data[1]?.primaryCtaLabel,
                data[1]?.primaryCtaUrl
              );
            }}
            aria-label="Google Play"
          >
            <svg
              width="135"
              height="41"
              viewBox="0 0 135 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="1"
                width="134"
                height="39"
                rx="4.5"
                fill="black"
              />
              <rect
                x="0.5"
                y="1"
                width="134"
                height="39"
                rx="4.5"
                stroke="#A6A6A6"
              />
              <path
                d="M68.136 22.2511C65.784 22.2511 63.867 24.0401 63.867 26.5041C63.867 28.9531 65.784 30.7571 68.136 30.7571C70.489 30.7571 72.406 28.9531 72.406 26.5041C72.405 24.0401 70.488 22.2511 68.136 22.2511ZM68.136 29.0831C66.847 29.0831 65.736 28.0201 65.736 26.5051C65.736 24.9741 66.848 23.9271 68.136 23.9271C69.425 23.9271 70.536 24.9741 70.536 26.5051C70.536 28.0191 69.425 29.0831 68.136 29.0831ZM58.822 22.2511C56.47 22.2511 54.553 24.0401 54.553 26.5041C54.553 28.9531 56.47 30.7571 58.822 30.7571C61.175 30.7571 63.092 28.9531 63.092 26.5041C63.092 24.0401 61.175 22.2511 58.822 22.2511ZM58.822 29.0831C57.533 29.0831 56.422 28.0201 56.422 26.5051C56.422 24.9741 57.534 23.9271 58.822 23.9271C60.111 23.9271 61.222 24.9741 61.222 26.5051C61.223 28.0191 60.111 29.0831 58.822 29.0831ZM47.744 23.5571V25.3611H52.062C51.933 26.3761 51.595 27.1171 51.079 27.6321C50.451 28.2601 49.468 28.9531 47.744 28.9531C45.086 28.9531 43.008 26.8101 43.008 24.1521C43.008 21.4941 45.086 19.3511 47.744 19.3511C49.178 19.3511 50.225 19.9151 50.998 20.6401L52.271 19.3671C51.191 18.3361 49.758 17.5471 47.744 17.5471C44.103 17.5471 41.042 20.5111 41.042 24.1521C41.042 27.7931 44.103 30.7571 47.744 30.7571C49.709 30.7571 51.192 30.1121 52.351 28.9041C53.543 27.7121 53.914 26.0361 53.914 24.6831C53.914 24.2651 53.882 23.8781 53.817 23.5561H47.744V23.5571ZM93.052 24.9581C92.698 24.0081 91.618 22.2511 89.411 22.2511C87.22 22.2511 85.399 23.9751 85.399 26.5041C85.399 28.8881 87.204 30.7571 89.62 30.7571C91.569 30.7571 92.697 29.5651 93.165 28.8721L91.715 27.9051C91.232 28.6141 90.571 29.0811 89.62 29.0811C88.67 29.0811 87.993 28.6461 87.558 27.7921L93.245 25.4401L93.052 24.9581ZM87.252 26.3761C87.204 24.7321 88.525 23.8951 89.476 23.8951C90.217 23.8951 90.845 24.2661 91.055 24.7971L87.252 26.3761ZM82.629 30.5001H84.497V17.9991H82.629V30.5001ZM79.567 23.2021H79.503C79.084 22.7021 78.278 22.2511 77.264 22.2511C75.137 22.2511 73.188 24.1201 73.188 26.5211C73.188 28.9051 75.137 30.7581 77.264 30.7581C78.279 30.7581 79.084 30.3071 79.503 29.7921H79.567V30.4041C79.567 32.0311 78.697 32.9011 77.296 32.9011C76.152 32.9011 75.443 32.0801 75.153 31.3871L73.526 32.0641C73.993 33.1911 75.233 34.5771 77.296 34.5771C79.487 34.5771 81.34 33.2881 81.34 30.1461V22.5101H79.568V23.2021H79.567ZM77.425 29.0831C76.136 29.0831 75.057 28.0031 75.057 26.5211C75.057 25.0221 76.136 23.9271 77.425 23.9271C78.697 23.9271 79.696 25.0221 79.696 26.5211C79.696 28.0031 78.697 29.0831 77.425 29.0831ZM101.806 17.9991H97.335V30.5001H99.2V25.7641H101.805C103.873 25.7641 105.907 24.2671 105.907 21.8821C105.907 19.4971 103.874 17.9991 101.806 17.9991ZM101.854 24.0241H99.2V19.7391H101.854C103.249 19.7391 104.041 20.8941 104.041 21.8821C104.041 22.8501 103.249 24.0241 101.854 24.0241ZM113.386 22.2291C112.035 22.2291 110.636 22.8241 110.057 24.1431L111.713 24.8341C112.067 24.1431 112.727 23.9171 113.418 23.9171C114.383 23.9171 115.364 24.4961 115.38 25.5251V25.6541C115.042 25.4611 114.318 25.1721 113.434 25.1721C111.649 25.1721 109.831 26.1531 109.831 27.9861C109.831 29.6591 111.295 30.7361 112.935 30.7361C114.189 30.7361 114.881 30.1731 115.315 29.5131H115.379V30.4781H117.181V25.6851C117.182 23.4671 115.524 22.2291 113.386 22.2291ZM113.16 29.0801C112.55 29.0801 111.697 28.7741 111.697 28.0181C111.697 27.0531 112.759 26.6831 113.676 26.6831C114.495 26.6831 114.882 26.8601 115.38 27.1011C115.235 28.2601 114.238 29.0801 113.16 29.0801ZM123.743 22.5021L121.604 27.9221H121.54L119.32 22.5021H117.31L120.639 30.0771L118.741 34.2911H120.687L125.818 22.5021H123.743ZM106.937 30.5001H108.802V17.9991H106.937V30.5001Z"
                fill="white"
              />
              <path
                d="M47.418 10.7429C47.418 11.5809 47.1701 12.2479 46.673 12.7459C46.109 13.3379 45.3731 13.6339 44.4691 13.6339C43.6031 13.6339 42.8661 13.3339 42.2611 12.7339C41.6551 12.1329 41.3521 11.3889 41.3521 10.5009C41.3521 9.61194 41.6551 8.86794 42.2611 8.26794C42.8661 7.66694 43.6031 7.36694 44.4691 7.36694C44.8991 7.36694 45.3101 7.45094 45.7001 7.61794C46.0911 7.78594 46.404 8.00894 46.6381 8.28794L46.111 8.81594C45.714 8.34094 45.167 8.10394 44.468 8.10394C43.836 8.10394 43.29 8.32594 42.829 8.76994C42.368 9.21394 42.1381 9.79094 42.1381 10.4999C42.1381 11.2089 42.368 11.7859 42.829 12.2299C43.29 12.6739 43.836 12.8959 44.468 12.8959C45.138 12.8959 45.6971 12.6729 46.1441 12.2259C46.4341 11.9349 46.602 11.5299 46.647 11.0109H44.468V10.2899H47.375C47.405 10.4469 47.418 10.5979 47.418 10.7429Z"
                fill="white"
              />
              <path
                d="M52.0281 8.237H49.2961V10.139H51.7601V10.86H49.2961V12.762H52.0281V13.5H48.5251V7.5H52.0281V8.237Z"
                fill="white"
              />
              <path
                d="M55.279 13.5H54.508V8.237H52.832V7.5H56.955V8.237H55.279V13.5Z"
                fill="white"
              />
              <path d="M59.938 13.5V7.5H60.709V13.5H59.938Z" fill="white" />
              <path
                d="M64.1281 13.5H63.3572V8.237H61.6812V7.5H65.8042V8.237H64.1281V13.5Z"
                fill="white"
              />
              <path
                d="M73.6089 12.725C73.0189 13.331 72.2859 13.634 71.4089 13.634C70.5319 13.634 69.7989 13.331 69.2099 12.725C68.6199 12.119 68.3259 11.377 68.3259 10.5C68.3259 9.62299 68.6199 8.88099 69.2099 8.27499C69.7989 7.66899 70.5319 7.36499 71.4089 7.36499C72.2809 7.36499 73.0129 7.66999 73.6049 8.27899C74.1969 8.88799 74.4929 9.62799 74.4929 10.5C74.4929 11.377 74.1979 12.119 73.6089 12.725ZM69.7789 12.222C70.2229 12.672 70.7659 12.896 71.4089 12.896C72.0519 12.896 72.5959 12.671 73.0389 12.222C73.4829 11.772 73.7059 11.198 73.7059 10.5C73.7059 9.80199 73.4829 9.22799 73.0389 8.77799C72.5959 8.32799 72.0519 8.10399 71.4089 8.10399C70.7659 8.10399 70.2229 8.32899 69.7789 8.77799C69.3359 9.22799 69.1129 9.80199 69.1129 10.5C69.1129 11.198 69.3359 11.772 69.7789 12.222Z"
                fill="white"
              />
              <path
                d="M75.5749 13.5V7.5H76.513L79.429 12.167H79.4619L79.429 11.011V7.5H80.1999V13.5H79.3949L76.344 8.606H76.3109L76.344 9.762V13.5H75.5749Z"
                fill="white"
              />
              <path
                d="M47.418 10.7429C47.418 11.5809 47.1701 12.2479 46.673 12.7459C46.109 13.3379 45.3731 13.6339 44.4691 13.6339C43.6031 13.6339 42.8661 13.3339 42.2611 12.7339C41.6551 12.1329 41.3521 11.3889 41.3521 10.5009C41.3521 9.61194 41.6551 8.86794 42.2611 8.26794C42.8661 7.66694 43.6031 7.36694 44.4691 7.36694C44.8991 7.36694 45.3101 7.45094 45.7001 7.61794C46.0911 7.78594 46.404 8.00894 46.6381 8.28794L46.111 8.81594C45.714 8.34094 45.167 8.10394 44.468 8.10394C43.836 8.10394 43.29 8.32594 42.829 8.76994C42.368 9.21394 42.1381 9.79094 42.1381 10.4999C42.1381 11.2089 42.368 11.7859 42.829 12.2299C43.29 12.6739 43.836 12.8959 44.468 12.8959C45.138 12.8959 45.6971 12.6729 46.1441 12.2259C46.4341 11.9349 46.602 11.5299 46.647 11.0109H44.468V10.2899H47.375C47.405 10.4469 47.418 10.5979 47.418 10.7429Z"
                stroke="white"
                strokeWidth="0.2"
                strokeMiterlimit="10"
              />
              <path
                d="M52.0281 8.237H49.2961V10.139H51.7601V10.86H49.2961V12.762H52.0281V13.5H48.5251V7.5H52.0281V8.237Z"
                stroke="white"
                strokeWidth="0.2"
                strokeMiterlimit="10"
              />
              <path
                d="M55.279 13.5H54.508V8.237H52.832V7.5H56.955V8.237H55.279V13.5Z"
                stroke="white"
                strokeWidth="0.2"
                strokeMiterlimit="10"
              />
              <path
                d="M59.938 13.5V7.5H60.709V13.5H59.938Z"
                stroke="white"
                strokeWidth="0.2"
                strokeMiterlimit="10"
              />
              <path
                d="M64.1281 13.5H63.3572V8.237H61.6812V7.5H65.8042V8.237H64.1281V13.5Z"
                stroke="white"
                strokeWidth="0.2"
                strokeMiterlimit="10"
              />
              <path
                d="M73.6089 12.725C73.0189 13.331 72.2859 13.634 71.4089 13.634C70.5319 13.634 69.7989 13.331 69.2099 12.725C68.6199 12.119 68.3259 11.377 68.3259 10.5C68.3259 9.62299 68.6199 8.88099 69.2099 8.27499C69.7989 7.66899 70.5319 7.36499 71.4089 7.36499C72.2809 7.36499 73.0129 7.66999 73.6049 8.27899C74.1969 8.88799 74.4929 9.62799 74.4929 10.5C74.4929 11.377 74.1979 12.119 73.6089 12.725ZM69.7789 12.222C70.2229 12.672 70.7659 12.896 71.4089 12.896C72.0519 12.896 72.5959 12.671 73.0389 12.222C73.4829 11.772 73.7059 11.198 73.7059 10.5C73.7059 9.80199 73.4829 9.22799 73.0389 8.77799C72.5959 8.32799 72.0519 8.10399 71.4089 8.10399C70.7659 8.10399 70.2229 8.32899 69.7789 8.77799C69.3359 9.22799 69.1129 9.80199 69.1129 10.5C69.1129 11.198 69.3359 11.772 69.7789 12.222Z"
                stroke="white"
                strokeWidth="0.2"
                strokeMiterlimit="10"
              />
              <path
                d="M75.5749 13.5V7.5H76.513L79.429 12.167H79.4619L79.429 11.011V7.5H80.1999V13.5H79.3949L76.344 8.606H76.3109L76.344 9.762V13.5H75.5749Z"
                stroke="white"
                strokeWidth="0.2"
                strokeMiterlimit="10"
              />
              <g filter="url(#filter0_ii_131_934)">
                <path
                  d="M10.4359 8.03797C10.1449 8.34597 9.9729 8.82397 9.9729 9.44297V31.559C9.9729 32.179 10.1449 32.656 10.4359 32.964L10.5099 33.036L22.8989 20.647V20.501V20.355L10.5099 7.96497L10.4359 8.03797Z"
                  fill="url(#paint0_linear_131_934)"
                />
                <path
                  d="M27.0279 24.778L22.8989 20.647V20.501V20.355L27.0289 16.225L27.1219 16.278L32.0149 19.058C33.4119 19.852 33.4119 21.151 32.0149 21.946L27.1219 24.726L27.0279 24.778Z"
                  fill="url(#paint1_linear_131_934)"
                />
                <g filter="url(#filter1_i_131_934)">
                  <path
                    d="M27.1218 24.725L22.8978 20.501L10.4358 32.964C10.8958 33.452 11.6568 33.512 12.5138 33.026L27.1218 24.725Z"
                    fill="url(#paint2_linear_131_934)"
                  />
                </g>
                <path
                  d="M27.1218 16.2769L12.5138 7.97694C11.6568 7.48994 10.8958 7.55094 10.4358 8.03894L22.8988 20.5019L27.1218 16.2769Z"
                  fill="url(#paint3_linear_131_934)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_ii_131_934"
                  x="9.9729"
                  y="7.64087"
                  width="23.0898"
                  height="25.7208"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="-0.15" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_131_934"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="0.15" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_innerShadow_131_934"
                    result="effect2_innerShadow_131_934"
                  />
                </filter>
                <filter
                  id="filter1_i_131_934"
                  x="10.4358"
                  y="20.501"
                  width="16.686"
                  height="12.8607"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="-0.15" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_131_934"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_131_934"
                  x1="21.8007"
                  y1="9.20897"
                  x2="5.0187"
                  y2="25.991"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#00A0FF" />
                  <stop offset="0.0066" stopColor="#00A1FF" />
                  <stop offset="0.2601" stopColor="#00BEFF" />
                  <stop offset="0.5122" stopColor="#00D2FF" />
                  <stop offset="0.7604" stopColor="#00DFFF" />
                  <stop offset="1" stopColor="#00E3FF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_131_934"
                  x1="33.8334"
                  y1="20.501"
                  x2="9.63753"
                  y2="20.501"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFE000" />
                  <stop offset="0.4087" stopColor="#FFBD00" />
                  <stop offset="0.7754" stopColor="#FFA500" />
                  <stop offset="1" stopColor="#FF9C00" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_131_934"
                  x1="24.8279"
                  y1="22.7949"
                  x2="2.06939"
                  y2="45.5534"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF3A44" />
                  <stop offset="1" stopColor="#C31162" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_131_934"
                  x1="7.29719"
                  y1="0.676745"
                  x2="17.4595"
                  y2="10.839"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#32A071" />
                  <stop offset="0.0685" stopColor="#2DA771" />
                  <stop offset="0.4762" stopColor="#15CF74" />
                  <stop offset="0.8009" stopColor="#06E775" />
                  <stop offset="1" stopColor="#00F076" />
                </linearGradient>
              </defs>
            </svg>
          </a>
        </li>
      )}
    </ul>
  );
};

export default FooterAppLinks;
