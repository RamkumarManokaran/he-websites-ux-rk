import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Megamenucomponents from "@packages/shared-components/layout-components/topnav/megamenucomponents";

// Mock the child components
jest.mock(
  "@packages/shared-components/common-utilities/megamenu/menucategory1card",
  jest.fn(() => <div data-testid="menucategory1card" />)
);
jest.mock(
  "@packages/shared-components/common-utilities/megamenu/menucategory2card",
  jest.fn(() => <div data-testid="menucategory2card" />)
);
jest.mock(
  "@packages/shared-components/common-utilities/megamenu/menucategory3card",
  jest.fn(() => <div data-testid="menucategory3card" />)
);
jest.mock(
  "@packages/shared-components/common-utilities/megamenu/menucategory4card",
  jest.fn(() => <div data-testid="menucategory4card" />)
);
jest.mock(
  "@packages/shared-components/common-utilities/megamenu/menucategory5card",
  jest.fn(() => <div data-testid="menucategory5card" />)
);

describe("Megamenucomponents", () => {
  const mockData = {
    data: {
      contentData: {
        items: [
          {
            headerMainMenuCollection: {
              items: [
                {
                  navTitle: "Menu 1",
                  navIcon: { url: "/icon1.png" },
                  navChildC1Collection: {
                    items: [{}, {}], // Mock children data
                  },
                  navChildC2Collection: {
                    items: [],
                  },
                  navChildC3Collection: {
                    items: [],
                  },
                  navChildC4Collection: {
                    items: [],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  };

  it("renders the component with initial data", () => {
    render(<Megamenucomponents data={mockData} />);
    expect(screen.getByText("Menu 1")).toBeInTheDocument();
  });

  it("toggles menu on mobile view", () => {
    render(<Megamenucomponents data={mockData} />);

    // Simulate mobile view
    global.innerWidth = 400;
    fireEvent.resize(window);

    const menuItem = screen.getByText("Menu 1");
    fireEvent.click(menuItem);

    // Check if menu opens
    expect(screen.getByText("Menu 1").parentElement).toHaveClass(
      "translate-x-0"
    );
  });

  // it("opens and closes menu on hover (desktop)", () => {
  //   render(<Megamenucomponents data={mockData} />);

  //   // Simulate desktop view
  //   global.innerWidth = 1200;
  //   fireEvent.resize(window);

  //   const menuItem = screen.getByText("Menu 1");

  //   // Simulate mouse enter
  //   fireEvent.mouseEnter(menuItem);
  //   expect(screen.getByTestId("menucategory1card")).toBeInTheDocument();

  //   // Simulate mouse leave
  //   fireEvent.mouseLeave(menuItem);
  //   expect(screen.queryByTestId("menucategory1card")).not.toBeInTheDocument();
  // });

  // it("renders correct menu options based on data", () => {
  //   render(<Megamenucomponents data={mockData} />);
  //   expect(screen.getByTestId("menucategory1card")).toBeInTheDocument();
  // });

  it("updates body class when menu opens and closes", () => {
    render(<Megamenucomponents data={mockData} />);

    const menuItem = screen.getByText("Menu 1");

    // Simulate mobile view
    global.innerWidth = 500;
    fireEvent.resize(window);

    fireEvent.click(menuItem);
    expect(document.body).toHaveClass("overflow-y-hidden");

    fireEvent.click(menuItem);
    expect(document.body).not.toHaveClass("overflow-y-hidden");
  });

  it("handles window resize to update isMobile state", () => {
    render(<Megamenucomponents data={mockData} />);

    // Desktop view
    global.innerWidth = 1200;
    fireEvent.resize(window);
    expect(screen.queryByText("Menu 1")).not.toHaveClass("translate-x-0");

    // Mobile view
    global.innerWidth = 500;
    fireEvent.resize(window);
    expect(screen.queryByText("Menu 1")).not.toBeNull();
  });
});
