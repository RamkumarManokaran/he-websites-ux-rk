import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Menucategory2card from "@packages/shared-components/layout-components/megamenu/menucategory2card";
import {
  GADataLayerFn,
  currentAuthenticatedUser,
} from "@packages/lib/utlils/helper-function";
import "@testing-library/jest-dom";
import Image from "next/image";

jest.mock("@packages/lib/utlils/helper-function", () => ({
  GADataLayerFn: jest.fn(),
  currentAuthenticatedUser: jest.fn(() => Promise.resolve("test-user")),
}));

jest.mock("next/image", () => (props: any) => (
  <img {...props} alt={props.alt || "Image"} />
));

describe("Menucategory2card", () => {
  const mockData = [
    { flagNavItemStyle: "L2 Text", navTitle: "Category Title" },
    {
      flagNavItemStyle: "Nav Bold",
      navTitle: "Item 1",
      navUrl: "/item1",
      navCtaTarget: "Open in new tab",
      navIcon: { url: "/icon1.png" },
    },
    {
      flagNavItemStyle: "Nav Normal",
      navTitle: "Item 2",
      navUrl: "/item2",
      navIcon: { url: "/icon2.png" },
    },
  ];
  const mockParentMenu = "Parent Menu";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the category title when an item with flagNavItemStyle 'L2 Text' exists", () => {
    render(<Menucategory2card data={mockData} parentMenu={mockParentMenu} />);
    expect(screen.getByText("Category Title")).toBeInTheDocument();
  });

  it("renders items excluding the 'L2 Text' item", () => {
    render(<Menucategory2card data={mockData} parentMenu={mockParentMenu} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders the correct attributes for links", () => {
    render(<Menucategory2card data={mockData} parentMenu={mockParentMenu} />);
    const link1 = screen.getByText("Item 1");
    const link2 = screen.getByText("Item 2");

    expect(link1.closest("a")).toHaveAttribute("href", "/item1");
    expect(link1.closest("a")).toHaveAttribute("target", "_blank");
    expect(link1.closest("a")).toHaveAttribute("rel", "noopener noreferrer");

    expect(link2.closest("a")).toHaveAttribute("href", "/item2");
    expect(link2.closest("a")).toHaveAttribute("target", "_parent");
    expect(link2.closest("a")).not.toHaveAttribute("rel");
  });

  it("renders icons when navIcon.url is present", () => {
    render(<Menucategory2card data={mockData} parentMenu={mockParentMenu} />);
    const icons = screen.getAllByAltText("Megamenu thumb");
    expect(icons[0]).toHaveAttribute("src", "/icon1.png");
    expect(icons[1]).toHaveAttribute("src", "/icon2.png");
  });

  it("does not render icons when navIcon.url is absent", () => {
    const mockDataWithoutIcons = [
      { flagNavItemStyle: "L2 Text", navTitle: "Category Title" },
      { flagNavItemStyle: "Nav Bold", navTitle: "Item 1", navUrl: "/item1" },
    ];
    render(
      <Menucategory2card
        data={mockDataWithoutIcons}
        parentMenu={mockParentMenu}
      />
    );
    expect(screen.queryByAltText("Megamenu thumb")).not.toBeInTheDocument();
  });

  it("calls GADataLayerFn on link click with correct parameters", async () => {
    process.env.PROJECT = "test-project"; // Ensure environment variable is set
    render(<Menucategory2card data={mockData} parentMenu={mockParentMenu} />);
    const link = screen.getByText("Item 1");
    fireEvent.click(link);

    await waitFor(() => {
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
        "test-project",
        "Item 1",
        "/item1",
        mockParentMenu,
        "Category Title"
      );
    });
  });

  // it("calculates the correct size for the layout", () => {
  //   render(<Menucategory2card data={mockDataWithManyItems} parentMenu={mockParentMenu} />);
  //   const container = screen.getByText("Category Title").closest("div");
  //   expect(container).toHaveClass("lg:col-span-2"); // Update mockData to ensure size calculation works
  // });

  // it("does not break if data prop is null or undefined", () => {
  //   expect(() =>
  //     render(<Menucategory2card data={null} parentMenu={mockParentMenu} />)
  //   ).not.toThrow();
  // });
});
