import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Menucategory3card from "@packages/shared-components/layout-components/megamenu/menucategory3card";
import { GADataLayerFn } from "@packages/lib/utlils/helper-function";
import "@testing-library/jest-dom";
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: any; alt: any }) => (
    <img src={src} alt={alt} />
  ),
}));

jest.mock("@packages/lib/utlils/helper-function", () => ({
  GADataLayerFn: jest.fn(),
  currentAuthenticatedUser: jest.fn(() => Promise.resolve("test-user")),
}));

describe("Menucategory3card", () => {
  const mockData = [
    {
      flagNavItemStyle: "L2 Text",
      navTitle: "Category Title",
    },
    {
      flagNavItemStyle: "Normal Item",
      navTitle: "Item 1",
      navUrl: "/item1",
      navCtaTarget: "Open in new tab",
      navIcon: { url: "/icon1.png" },
    },
    {
      flagNavItemStyle: "Normal Item",
      navTitle: "Item 2",
      navUrl: "/item2",
      navIcon: { url: "/icon2.png" },
    },
  ];

  const parentMenu = "Parent Menu";

  it("renders the category title correctly", () => {
    render(<Menucategory3card data={mockData} parentMenu={parentMenu} />);
    expect(screen.getByText("Category Title")).toBeInTheDocument();
  });

  it("renders the list items correctly", () => {
    render(<Menucategory3card data={mockData} parentMenu={parentMenu} />);

    const items = screen.getAllByRole("link");
    expect(items).toHaveLength(2); // Excludes the L2 Text item

    expect(items[0]).toHaveAttribute("href", "/item1");
    expect(items[0]).toHaveAttribute("target", "_blank");
    expect(items[0]).toHaveAttribute("rel", "noopener noreferrer");
    expect(items[0].textContent).toContain("Item 1");

    expect(items[1]).toHaveAttribute("href", "/item2");
    expect(items[1].textContent).toContain("Item 2");
  });

  it("calls GADataLayerFn on item click", async () => {
    render(<Menucategory3card data={mockData} parentMenu={parentMenu} />);

    const item = screen.getByText("Item 1");
    expect(item).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(item);
    });

    expect(GADataLayerFn).toHaveBeenCalledWith(
      "ga_contentful_events",
      "header_clicks",
      "NA",
      "NA",
      "NA",
      "NA",
      "homepage",
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
      "test-user",
      "NA",
      "NA",
      "NA",
      "NA",
      "NA",
      "NA",
      `${process.env.PROJECT}`,
      "Item 1",
      "/item1",
      parentMenu,
      "Category Title"
    );
  });

  it("renders images for items with icons", () => {
    render(<Menucategory3card data={mockData} parentMenu={parentMenu} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);

    expect(images[0]).toHaveAttribute("src", "/icon1.png");
    expect(images[0]).toHaveAttribute("alt", "Megamenu thumb");

    expect(images[1]).toHaveAttribute("src", "/icon2.png");
    expect(images[1]).toHaveAttribute("alt", "Megamenu thumb");
  });
});
