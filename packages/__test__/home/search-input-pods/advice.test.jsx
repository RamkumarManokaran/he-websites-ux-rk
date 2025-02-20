import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import "@testing-library/react";
import AdviceTab from "@packages/shared-components/common-utilities/searchBar/search-input-pods/advicetab";
// import { Navigation } from 'swiper/modules';

// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(),
// }));
// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(() => ({
//     push: jest.fn(),
//     pathname: "/something",
//     asPath: "/something", // Simulate the current pathname
//   })),
// }));
jest.mock("next/router");
describe("AdviceTab", () => {
  beforeEach(() => {
    //
    render(
      <AdviceTab
        searchFormHandle={{ advice: "" }}
        setsearchFormHandle={() => {}}
      />
    );
  });

  test("renders input field and submit button", () => {
    // render(<AdviceTab searchFormHandle={{ advice: "" }} setsearchFormHandle={() => {}} />);

    expect(screen.getByPlaceholderText("Enter keyword")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  //   test("calls handleSubmit when form is submitted", () => {
  //     const mockSearchFormHandle = { advice: "test" };
  //     const mockSetSearchFormHandle = jest.fn();
  //     render(<AdviceTab searchFormHandle={mockSearchFormHandle} setsearchFormHandle={mockSetSearchFormHandle} />);

  //     fireEvent.submit(screen.getByRole("form"));

  //     expect(mockSetSearchFormHandle).toHaveBeenCalledWith({
  //       ...mockSearchFormHandle,
  //       advice: mockSearchFormHandle.advice.trim().replace(/\s{2,}/g, " ").trimStart(),
  //     });
  //     expect(useRouter().push).toHaveBeenCalledWith(`/article-search/?keyword=test`);
  //   });

  //   test("displays error message when advice is empty", () => {
  //     const mockSearchFormHandle = { advice: "" };
  //     const mockSetSearchFormHandle = jest.fn();
  //     render(<AdviceTab searchFormHandle={mockSearchFormHandle} setsearchFormHandle={mockSetSearchFormHandle} />);

  //     fireEvent.submit(screen.getByRole("form"));

  //     expect(screen.getByText("Please enter valid keyword")).toBeInTheDocument();
  //   });
});
