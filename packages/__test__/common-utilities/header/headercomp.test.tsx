import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@packages/shared-components/layout-components/header/headercomponents";
import "@testing-library/jest-dom";

// Mock the entire next/router module
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
  }),
  usePathname: () => "/", // Added usePathname mock
}));

// Your existing mocks
jest.mock(
  "@packages/shared-components/common-utilities/topnav/megamenucomponents",
  () => {
    return jest.fn().mockImplementation(() => {
      return <div data-testid="mock-megamenu">Mocked Megamenu</div>;
    });
  }
);

jest.mock(
  "@packages/shared-components/common-utilities/header/user/user",
  () => {
    return jest.fn().mockImplementation(() => {
      return <div data-testid="mock-user">Mocked User</div>;
    });
  }
);

// Mock props
const mockTopnavData: any = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Courses", link: "/courses" },
];

const mockCourseData: any = [];
const mockUniData: any = [];

describe("Header Component", () => {
  beforeEach(() => {
    render(
      <Header
        topNavData={mockTopnavData}
        course_data={mockCourseData}
        uni_data={mockUniData}
      />
    );
  });

  it("should render the header component", () => {
    // Test for the presence of the header element
    // expect(screen.getByRole('banner')).toBeInTheDocument();

    // // Test for the home link
    // const homeLink = screen.getByRole('link', { href: '/' });
    // expect(homeLink).toBeInTheDocument();

    // Test for the mega menu
    expect(screen.getByTestId("mock-megamenu")).toBeInTheDocument();
  });
});
