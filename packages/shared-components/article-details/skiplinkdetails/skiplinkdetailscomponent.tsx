"use client";
import React, { useState } from "react";
import Link from "next/link";

import Pullquote from "../pull-quote/pull-quote";
import Ctabanner from "../cta-banner/cta-banner";
import Articleimage from "../article-image/article-image";
// import Reviewscomponents from "@/app/home/reviews/reviewscomponents";
import Articletables from "../article-tables/article-tables";
import Dontmissout from "../dont-missout/dontmissout";
import Findoutmore from "../findoutmore/findout-more";
import Reviewscomponents from "@packages/shared-components/home/reviews/reviewscomponents";

const Skiplinkdetails = () => {
  // Toggle function
  const [modelOpen, setModalOpen] = useState(false);
  const toggleFunc = () => {
    setModalOpen(!modelOpen);
  };

  const skiplinkLabel = [
    "Heading skip link",
    "Heading skip link",
    "Heading skip link",
    "Heading skip link",
  ];
  const skiplinklabellisting = skiplinkLabel?.map((skiplinkLabel, index) => (
    <li
      className={`border-s-[4px]  py-[10px] px-[16px] small font-inter font-normal hover:text-grey300 hover:underline hover:border-blue-400 ${
        index == 0
          ? "border-blue-400 text-blue-400"
          : "border-grey-300 text-grey300"
      }`}
      key={`${skiplinkLabel}-${index + 1}`}
    >
      <Link href={`#skiplink-${index + 1}`}>
        {skiplinkLabel} {index + 1}
      </Link>
    </li>
  ));
  const skiplinkmobilelisting = skiplinkLabel?.map((items, index) => (
    <li
      className={`border-s-[4px]  py-[10px] px-[16px] small font-inter font-normal ${
        index == 0
          ? "border-grey300 text-grey300"
          : "border-grey-300 text-white"
      }`}
      key={`${items}-${index + 1}`}
    >
      <Link href={`#skiplink-${index + 1}`}>
        {items} {index + 1}
      </Link>
    </li>
  ));
  return (
    <>
      <div className="pb-[16px] border-b border-grey-200 lg:hidden mb-[40px]">
        <div
          className={`bg-blue-400 rounded-[4px] overflow-hidden border-b relative border-grey-200 skiplinkoption ${modelOpen ? "active" : ""}`}
        >
          <div className="">
            <div
              onClick={toggleFunc}
              className="bg-blue-400 cursor-pointer flex justify-between p-[18px]"
            >
              <span className="text-white">On this page</span>
              <div className="burger-menu flex flex-col justify-center gap-[4px]">
                <span className="bg-white w-[18px] h-[2px] rounded-[4px] flex"></span>
                <span className="bg-white w-[18px] h-[2px] rounded-[4px] flex"></span>
                <span className="bg-white w-[18px] h-[2px] rounded-[4px] flex"></span>
              </div>
            </div>
            <ul>{skiplinkmobilelisting}</ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-[20px]">
        <div className="min-w-[289px] hidden lg:flex flex-col relative max-w-[100%]">
          <div className="sticky lg:flex flex-col lg:gap-[8px] top-[50px]">
            <h2 className="text-black para font-semibold font-inter">
              On this page
            </h2>
            <ul>{skiplinklabellisting}</ul>
          </div>
        </div>
        <div className="w-full article-details-aside">
          <div id="skiplink-1">
            {/* RTF content  */}
            <section className="pb-[40px]">
              <div className="rtf-innerstyle flex flex-col gap-[16px]">
                <h1>Level 1 heading</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  placerat lectus nec suscipit faucibus. Vestibulum arcu urna,
                  malesuada vitae euismod ultrices, accumsan vitae ex. Nunc
                  scelerisque nibh ac feugiat auctor. Class aptent taciti
                  sociosqu ad litora torquent per conubia nostra, per inceptos
                  himenaeos. Nulla pharetra posuere ligula, eget commodo turpis
                  semper a. Phasellus tincidunt elementum sem, nec feugiat
                  lectus dignissim nec.
                </p>
                <h2>Level 2 heading</h2>
                <ul>
                  <li>Business Administration</li>
                  <li>Business Management</li>
                  <li>Business Studies</li>
                  <li>Global Business Management</li>
                  <li>Human Resource Management (HRM)</li>
                </ul>
                {/* Article-Image  */}
                <Articleimage />
                {/* Article-Image END */}
                {/* Pull quotes END */}
                <Pullquote />
                {/* Pull quotes END */}
                <h5>Level 2 heading</h5>
                <ul>
                  <li>
                    <h6>Level 3 heading</h6>
                    <p>
                      Undertaking one extra year of study before progressing to
                      your degree is ideal if you do not meet the entry
                      qualifications nd/or need to improve your English Language
                      proficiency.
                    </p>
                  </li>
                  <li>
                    <h6>Level 3 heading</h6>
                    <p>
                      You’ll spend one extra year of study, typically after Year
                      2 or Year 3, gaining valuable experience in work or
                      studying abroad.
                    </p>
                  </li>
                </ul>
                <Articletables />
                <Findoutmore />
              </div>
              <section className="pt-[40px]">
                <Ctabanner />
              </section>
            </section>
            {/* RTF content END */}
          </div>
          <div id="skiplink-2">
            {/* RTF content  */}
            <section className="pb-[40px]">
              <div className="rtf-innerstyle flex flex-col gap-[16px]">
                <h1>Level 1 heading</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  placerat lectus nec suscipit faucibus. Vestibulum arcu urna,
                  malesuada vitae euismod ultrices, accumsan vitae ex. Nunc
                  scelerisque nibh ac feugiat auctor. Class aptent taciti
                  sociosqu ad litora torquent per conubia nostra, per inceptos
                  himenaeos. Nulla pharetra posuere ligula, eget commodo turpis
                  semper a. Phasellus tincidunt elementum sem, nec feugiat
                  lectus dignissim nec.
                </p>
                <h2>Level 2 heading</h2>
                <ul>
                  <li>Business Administration</li>
                  <li>Business Management</li>
                  <li>Business Studies</li>
                  <li>Global Business Management</li>
                  <li>Human Resource Management (HRM)</li>
                </ul>
                {/* Article-Image  */}
                <Articleimage />
                {/* Article-Image END */}
                {/* Pull quotes END */}
                <Pullquote />
                {/* Pull quotes END */}
                <h5>Level 2 heading</h5>
                <ul>
                  <li>
                    <h6>Level 3 heading</h6>
                    <p>
                      Undertaking one extra year of study before progressing to
                      your degree is ideal if you do not meet the entry
                      qualifications nd/or need to improve your English Language
                      proficiency.
                    </p>
                  </li>
                  <li>
                    <h6>Level 3 heading</h6>
                    <p>
                      You’ll spend one extra year of study, typically after Year
                      2 or Year 3, gaining valuable experience in work or
                      studying abroad.
                    </p>
                  </li>
                </ul>
                <Articletables />
                <Findoutmore />
              </div>
              <section className="pt-[40px]">
                <Ctabanner />
              </section>
            </section>
            {/* RTF content END */}
          </div>
          <div id="skiplink-3">
            {/* RTF content  */}
            <section className="pb-[40px]">
              <div className="rtf-innerstyle flex flex-col gap-[16px]">
                <h1>Level 1 heading</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  placerat lectus nec suscipit faucibus. Vestibulum arcu urna,
                  malesuada vitae euismod ultrices, accumsan vitae ex. Nunc
                  scelerisque nibh ac feugiat auctor. Class aptent taciti
                  sociosqu ad litora torquent per conubia nostra, per inceptos
                  himenaeos. Nulla pharetra posuere ligula, eget commodo turpis
                  semper a. Phasellus tincidunt elementum sem, nec feugiat
                  lectus dignissim nec.
                </p>
                <h2>Level 2 heading</h2>
                <ul>
                  <li>Business Administration</li>
                  <li>Business Management</li>
                  <li>Business Studies</li>
                  <li>Global Business Management</li>
                  <li>Human Resource Management (HRM)</li>
                </ul>
                {/* Article-Image  */}
                <Articleimage />
                {/* Article-Image END */}
                {/* Pull quotes END */}
                <Pullquote />
                {/* Pull quotes END */}
                <h5>Level 2 heading</h5>
                <ul>
                  <li>
                    <h6>Level 3 heading</h6>
                    <p>
                      Undertaking one extra year of study before progressing to
                      your degree is ideal if you do not meet the entry
                      qualifications nd/or need to improve your English Language
                      proficiency.
                    </p>
                  </li>
                  <li>
                    <h6>Level 3 heading</h6>
                    <p>
                      You’ll spend one extra year of study, typically after Year
                      2 or Year 3, gaining valuable experience in work or
                      studying abroad.
                    </p>
                  </li>
                </ul>
                <Articletables />
                <Findoutmore />
              </div>
              <section className="pt-[40px]">
                <Ctabanner />
              </section>
            </section>
            {/* RTF content END */}
          </div>
          <div id="skiplink-4">
            {/* RTF content  */}
            <section className="pb-[40px]">
              <div className="rtf-innerstyle flex flex-col gap-[16px]">
                <h1>Level 1 heading</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  placerat lectus nec suscipit faucibus. Vestibulum arcu urna,
                  malesuada vitae euismod ultrices, accumsan vitae ex. Nunc
                  scelerisque nibh ac feugiat auctor. Class aptent taciti
                  sociosqu ad litora torquent per conubia nostra, per inceptos
                  himenaeos. Nulla pharetra posuere ligula, eget commodo turpis
                  semper a. Phasellus tincidunt elementum sem, nec feugiat
                  lectus dignissim nec.
                </p>
                <h2>Level 2 heading</h2>
                <ul>
                  <li>Business Administration</li>
                  <li>Business Management</li>
                  <li>Business Studies</li>
                  <li>Global Business Management</li>
                  <li>Human Resource Management (HRM)</li>
                </ul>
                {/* Article-Image  */}
                <Articleimage />
                {/* Article-Image END */}
                {/* Pull quotes END */}
                <Pullquote />
                {/* Pull quotes END */}
                <h5>Level 2 heading</h5>
                <ul>
                  <li>
                    <h6>Level 3 heading</h6>
                    <p>
                      Undertaking one extra year of study before progressing to
                      your degree is ideal if you do not meet the entry
                      qualifications nd/or need to improve your English Language
                      proficiency.
                    </p>
                  </li>
                  <li>
                    <h6>Level 3 heading</h6>
                    <p>
                      You’ll spend one extra year of study, typically after Year
                      2 or Year 3, gaining valuable experience in work or
                      studying abroad.
                    </p>
                  </li>
                </ul>
                <Articletables />
                <Findoutmore />
              </div>
            </section>
            <section className="pb-[40px]">
              <Ctabanner />
            </section>
            <section>
              <Dontmissout />
            </section>
            {/* <section><Reviewscomponents/></section> */}
            {/* RTF content END */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Skiplinkdetails;
