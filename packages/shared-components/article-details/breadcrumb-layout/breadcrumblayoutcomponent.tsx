import React from "react";
import Link from "next/link";
import Image from "next/image";

const Breadcrumblayoutcomponent = ({ propsdata, preview }: any) => {
  return (
    <nav aria-label="breadcrumb">
      <ul className="flex flex-wrap gap-[20px]">
        {propsdata.map((breadcrumbData: any) => (
          <li className="inter small" key={breadcrumbData.label}>
            {breadcrumbData.url && !breadcrumbData.Imgurl ? (
              <Link
                className='text-primary-400 hover:underline after:absolute after:content-["/"] after:w-[20px] after:h-[20px] after:text-center after:text-grey-300'
                href={breadcrumbData.url}
              >
                {breadcrumbData.label}
              </Link>
            ) : breadcrumbData.Imgurl && breadcrumbData.url ? (
              <Link
                className='text-primary-400 hover:underline after:absolute after:content-["/"] after:w-[20px] after:h-[20px] after:text-center after:text-grey-300'
                href={breadcrumbData.url}
              >
                <Image
                  src={breadcrumbData.Imgurl}
                  width="17"
                  className="inline-block"
                  height="18"
                  alt="breadcrumb icon"
                />
              </Link>
            ) : (
              <span className="text-grey300">{breadcrumbData.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumblayoutcomponent;
