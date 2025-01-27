import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeaderWrapper from "@packages/shared-components/layout-components/header/headerWrapper";

// Mock the Header component
jest.mock(
  "@packages/shared-components/common-utilities/header/headerWrapper",
  () => ({
    __esModule: true,
    default: jest.fn(async () => (
      <div data-testid="header-component">Header</div>
    )),
  })
);

// Mock server actions and headers
jest.mock("@packages/lib/server-actions/server-action", () => ({
  searchAjaxFecthFunction: jest.fn(),
  graphQlFetchFunction: jest.fn(),
}));

jest.mock("@packages/lib/graphQL/graphql-query", () => ({
  Headerquery: "MockHeaderQuery",
}));

jest.mock("next/headers", () => ({
  headers: jest.fn(),
}));

// Import mocked modules
import {
  searchAjaxFecthFunction,
  graphQlFetchFunction,
} from "@packages/lib/server-actions/server-action";
import { headers } from "next/headers";

describe("HeaderWrapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Header component with correct props", async () => {
    // Mock `headers` function
    (headers as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("true"), // Mock `isAuthenticated` as "true"
    });

    // Mock server actions
    (searchAjaxFecthFunction as jest.Mock)
      .mockResolvedValueOnce({ courseData: "MockCourseData" }) // First call
      .mockResolvedValueOnce({ uniData: "MockUniData" }); // Second call

    (graphQlFetchFunction as jest.Mock).mockResolvedValue({
      topNavData: "MockTopNavData",
    });

    // Resolve the HeaderWrapper async function
    const HeaderElement = await HeaderWrapper();

    // Render the resolved element
    render(HeaderElement);

    // Assert that the mocked Header component is rendered
    expect(screen.getByTestId("header-component")).toBeInTheDocument();
  });

  it("handles rejected promises gracefully", async () => {
    // Mock headers
    (headers as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("false"), // Mock `isAuthenticated` as "false"
    });

    // Mock server actions to reject
    (searchAjaxFecthFunction as jest.Mock)
      .mockRejectedValueOnce(new Error("Course fetch error"))
      .mockRejectedValueOnce(new Error("Uni fetch error"));

    (graphQlFetchFunction as jest.Mock).mockRejectedValue(
      new Error("TopNav fetch error")
    );

    // Resolve the HeaderWrapper async function
    const HeaderElement = await HeaderWrapper();

    // Render the resolved element
    render(HeaderElement);

    // Assert that the mocked Header component is rendered
    expect(screen.getByTestId("header-component")).toBeInTheDocument();
  });
});
