import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Menucategory1card from "@packages/shared-components/layout-components/megamenu/menucategory1card";
import {
  GADataLayerFn,
  currentAuthenticatedUser,
} from "@packages/lib/utlils/helper-function";
import "@testing-library/jest-dom";

// Mocking helper functions
jest.mock("@packages/lib/utlils/helper-function", () => ({
  GADataLayerFn: jest.fn(),
  currentAuthenticatedUser: jest.fn(() => Promise.resolve("test-user")),
}));

describe("Menucategory1card", () => {
  const mockData = [
    { flagNavItemStyle: "L2 Text", navTitle: "Category Title" },
    {
      flagNavItemStyle: "Nav Bold",
      navTitle: "Item 1",
      navUrl: "/item1",
      navCtaTarget: "Open in new tab",
    },
    { flagNavItemStyle: "Nav Normal", navTitle: "Item 2", navUrl: "/item2" },
  ];
  const mockParentMenu = "Parent Menu";

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("throws an error if the data prop is missing", () => {
    expect(() =>
      render(<Menucategory1card data={null} parentMenu={mockParentMenu} />)
    ).toThrow("Menucategory1card requires data prop.");
  });

  it("renders the navTitle if an item with flagNavItemStyle 'L2 Text' exists", () => {
    render(<Menucategory1card data={mockData} parentMenu={mockParentMenu} />);
    expect(screen.getByText("Category Title")).toBeInTheDocument();
  });

  it("renders the list of items excluding 'L2 Text'", () => {
    render(<Menucategory1card data={mockData} parentMenu={mockParentMenu} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("calls GADataLayerFn and currentAuthenticatedUser on link click", async () => {
    process.env.PROJECT = "test-project"; // Ensure environment variable is set

    render(<Menucategory1card data={mockData} parentMenu={mockParentMenu} />);
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
        "Parent Menu",
        "Category Title"
      );
    });
  });

  it("renders links with correct target and rel attributes", () => {
    render(<Menucategory1card data={mockData} parentMenu={mockParentMenu} />);
    const link = screen.getByText("Item 1");

    expect(link).toHaveAttribute("href", "/item1");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    const link2 = screen.getByText("Item 2");
    expect(link2).toHaveAttribute("href", "/item2");
    expect(link2).toHaveAttribute("target", "_parent");
    expect(link2).not.toHaveAttribute("rel");
  });

  it("applies correct styles for 'Nav Bold' and 'Nav Normal'", () => {
    render(<Menucategory1card data={mockData} parentMenu={mockParentMenu} />);
    const boldItem = screen.getByText("Item 1");
    const normalItem = screen.getByText("Item 2");

    expect(boldItem).toHaveClass("font-bold");
    expect(normalItem).toHaveClass("font-normal");
  });
});
