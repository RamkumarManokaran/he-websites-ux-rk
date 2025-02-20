"use server";
import React from "react";
import { FooterNavItem } from "@packages/lib/types/interfaces";
interface PropsInterface {
  data: FooterNavItem;
}
const FooterCopyRights = ({ data }: PropsInterface) => {
  return (
    <>
      {data.navTitle && (
        <div className="copyrights mt-[40px]">
          <p
            className="x-small text-grey300 text-center"
            data-testid="copy_rights"
          >
            {data.navTitle}
          </p>
        </div>
      )}
    </>
  );
};

export default FooterCopyRights;
