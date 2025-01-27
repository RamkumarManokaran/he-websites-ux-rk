"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Menucategory1card from "@packages/shared-components/layout-components/megamenu/menucategory1card";
import Menucategory2card from "@packages/shared-components/layout-components/megamenu/menucategory2card";
import Menucategory3card from "@packages/shared-components/layout-components/megamenu/menucategory3card";
import Menucategory4card from "@packages/shared-components/layout-components/megamenu/menucategory4card";
import Menucategory5card from "@packages/shared-components/layout-components/megamenu/menucategory5card";
const Megamenucomponents = ({ data }: any) => {
  const [content, setContent] = useState<any>(
    data?.data?.contentData?.items[0]?.headerMainMenuCollection?.items
  );
  const [openMenu, setOpenMenu] = useState<string | boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // useEffect(() => {
  //   if (openMenu) {
  //     document.body.classList.add("overflow-y-hidden");
  //   } else {
  //     document.body.classList.remove("overflow-y-hidden");
  //   }
  // }, [openMenu]);
  const handleMenuToggle = (menuId: string) => {
    setOpenMenu(openMenu === menuId ? false : menuId);
    if (openMenu === menuId ? false : menuId) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function Megamenuoptions(child: any, parentMenu: any) {
    if (child?.items[1]?.navTitle && child?.items[1]?.navIcon === null) {
      return <Menucategory1card data={child?.items} parentMenu={parentMenu} />;
    } else if (child?.items[1]?.navTitle && child?.items[1]?.navIcon) {
      if (child?.items[1]?.flagNavItemStyle === "Nav Icon") {
        return (
          <Menucategory2card data={child?.items} parentMenu={parentMenu} />
        );
      }
      if (child?.items[1]?.flagNavItemStyle === "Nav Image") {
        return (
          <Menucategory3card data={child?.items} parentMenu={parentMenu} />
        );
      }
      if (child?.items[1]?.flagNavItemStyle === "Nav Hero Image") {
        if (child?.items?.length == 2) {
          return (
            <Menucategory5card data={child?.items} parentMenu={parentMenu} />
          );
        }
        return (
          <Menucategory4card data={child?.items} parentMenu={parentMenu} />
        );
      }
    } else {
      return <p>No data</p>;
    }
  }

  return (
    <>
      <div className="flex lg:items-center lg:justify-center">
        <nav className="p-[16px] w-[335px] h-[100vh] overflow-y-scroll bg-white lg:p-0 lg:w-fit lg:h-auto lg:overflow-y-visible">
          <ul className="flex flex-col lg:flex-row gap-[10px] lg:gap-[0] justify-center">
            {content?.map((menuItem: any, index: number) => (
              <li
                className="cursor-pointer"
                key={index}
                onMouseEnter={
                  !isMobile ? () => setOpenMenu(`menu${index}`) : undefined
                }
                onMouseLeave={!isMobile ? () => setOpenMenu(false) : undefined}
              >
                <div
                  onClick={
                    isMobile
                      ? () => handleMenuToggle(`menu${index}`)
                      : undefined
                  }
                  className={`flex justify-between items-center min-h-[64px] px-[16px] py-[10px] lg:py-[26px] lg:px-[12px] font-semibold para text-grey300 bg-neutral100 lg:hover:bg-transparent lg:bg-transparent 
                        lg:hover:shadow-custom-7`}
                >
                  {menuItem?.navTitle}
                  {menuItem?.navIcon?.url && (
                    <Image
                      className="block lg:hidden rounded-[24px] outline outline-1 outline-neutral-200 outline-offset-2 !h-[44px]"
                      src={menuItem?.navIcon?.url || ""}
                      width="44"
                      height="44"
                      quality={100}
                      alt={menuItem?.navTitle || ""}
                    />
                  )}
                </div>
                {isMobile ? (
                  <div
                    className={`${openMenu == `menu${index}` ? "translate-x-0 opacity-[1]" : "-translate-x-full opacity-0"} megamenu !fixed top-0 right-auto w-[335px] bg-neutral-50 lg:bg-white shadow-custom-5 lg:absolute lg:top-[76px] left-[0] transition-all duration-300 ease-in-out`}
                  >
                    <div
                      onClick={() => handleMenuToggle(`menu${index}`)}
                      className={`back-navigation font-bold flex items-center gap-[10px] p-[16px] border-b border-b-neutral300`}
                    >
                      <svg
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.44444 12.4444L1 6.99999M1 6.99999L6.44444 1.55554M1 6.99999L15 6.99999"
                          stroke="#0F172A"
                          strokeWidth="1.67"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {menuItem?.navTitle}
                    </div>
                    <div className="max-w-container mx-auto">
                      <section className="grid grid-cols-1 lg:grid-cols-1  lg:gap-[16px] p-[0] lg:p-[24px h-[calc(100vh_-_40px)] overflow-y-scroll pb-[40px]">
                        {menuItem?.navChildC1Collection?.items?.length > 1 &&
                          Megamenuoptions(
                            menuItem?.navChildC1Collection,
                            menuItem?.navTitle
                          )}
                        {menuItem?.navChildC2Collection?.items?.length > 1 &&
                          Megamenuoptions(
                            menuItem?.navChildC2Collection,
                            menuItem?.navTitle
                          )}
                        {menuItem?.navChildC3Collection?.items?.length > 1 &&
                          Megamenuoptions(
                            menuItem?.navChildC3Collection,
                            menuItem?.navTitle
                          )}
                        {menuItem?.navChildC4Collection?.items?.length > 1 &&
                          Megamenuoptions(
                            menuItem?.navChildC4Collection,
                            menuItem?.navTitle
                          )}
                      </section>
                    </div>
                  </div>
                ) : (
                  <>
                    {
                      // openMenu === `menu${index}` && (
                      <div
                        className={`${openMenu === `menu${index}` ? "block" : "hidden"}`}
                      >
                        <div
                          className={`${openMenu ? "animate-fadeIn block" : "hidden"} backdrop-shadow absolute top-[76px] left-0 right-0 bottom-0 z-[5] h-[100vh]`}
                        ></div>
                        <div
                          className={`${openMenu ? "block animate-fadeIn" : "hidden animate-fadeOut"} megamenu bg-neutral-50 lg:bg-white shadow-custom-5 lg:absolute lg:top-[76px] left-[0] right-[0] z-[5] lg:border-t lg:border-grey-300 `}
                        >
                          <div className="max-w-container mx-auto">
                            <section
                              onMouseLeave={(event) => {
                                if (!isMobile) {
                                  const rect =
                                    event.currentTarget.getBoundingClientRect();

                                  const mouseY = event.clientY;

                                  if (mouseY > rect.bottom) {
                                    setOpenMenu(false);
                                  }
                                }
                              }}
                              className={`grid grid-cols-1 lg:grid-cols-4 lg:gap-[20px] p-[0] lg:p-[24px_0]`}
                            >
                              {menuItem?.navChildC1Collection?.items?.length >
                                1 &&
                                Megamenuoptions(
                                  menuItem?.navChildC1Collection,
                                  menuItem?.navTitle
                                )}
                              {menuItem?.navChildC2Collection?.items?.length >
                                1 &&
                                Megamenuoptions(
                                  menuItem?.navChildC2Collection,
                                  menuItem?.navTitle
                                )}
                              {menuItem?.navChildC3Collection?.items?.length >
                                1 &&
                                Megamenuoptions(
                                  menuItem?.navChildC3Collection,
                                  menuItem?.navTitle
                                )}
                              {menuItem?.navChildC4Collection?.items?.length >
                                1 &&
                                Megamenuoptions(
                                  menuItem?.navChildC4Collection,
                                  menuItem?.navTitle
                                )}
                            </section>
                          </div>
                        </div>
                      </div>
                    }
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Megamenucomponents;
