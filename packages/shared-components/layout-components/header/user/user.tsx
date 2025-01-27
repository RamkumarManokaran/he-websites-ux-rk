"use client";

import { signOut } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsconfig from "../../../../configs/amplifyconfiguration";
Amplify.configure(awsconfig, { ssr: true });
export default function User({ topnav_data }: any) {
  async function clearAllCookies() {
    if (process.env.PROJECT === "Whatuni") {
      try {
        sessionStorage.clear();
        document.cookie =
          "wcache=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = `Signinonetap=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
        await signOut({ global: true }); // Wait for the signOut process to complete
        // window.location.href = "/"; // Force a full reload to the home page
      } catch (error) {
        console.error("Error signing out:", error); // Handle errors if signOut fails
      }
    } else {
      document.cookie = `pgs_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
      document.cookie = `pgs_bskt_cnt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
      document.cookie = `pgs_x=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;

      setTimeout(() => {
        const cookies: any = document.cookie
          .split(";")
          .reduce((acc: any, cookie: any) => {
            const [key, value] = cookie
              .split("=")
              ?.map((part: any) => part.trim());
            acc[key] = value;
            return acc;
          }, {});

        if (!cookies["pgs_auth"] && !cookies["pgs_bskt_cnt"]) {
          // Redirect only if cookies are deleted
          window.location.href = "/";
        }
      }, 100);
    }
  }
  const userprofile =
    topnav_data?.data?.contentData?.items[0]?.customerProfileMenu
      ?.navChildC1Collection?.items;
  return (
    <>
      <div className="flex justify-between p-[16px] absolute z-10 top-[56px] right-[-39px] shadow-custom-5 bg-white min-w-[339px] rounded-[4px] md:top-[65px] lg:top-[62px] lg:right-0">
        <ul className="small">
          {userprofile?.map((item: any, index: any) => (
            <li
              key={index}
              className={
                item?.navTitle === "Logout"
                  ? `text-primary-400 hover:underline`
                  : "mb-[16px] hover:underline"
              }
            >
              <a
                href={item?.navUrl || ""}
                className="font-normal small"
                onClick={() =>
                  item?.navTitle?.toLowerCase() === "logout"
                    ? clearAllCookies()
                    : ""
                }
              >
                {item?.navTitle}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="font-semibold x-small text-success-700 uppercase tracking-[1px] self-start"
        >
          Complete your profile
        </a>
      </div>
    </>
  );
}
