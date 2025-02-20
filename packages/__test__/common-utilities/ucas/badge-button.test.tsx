import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GradeBadgeButton from "@packages/shared-components/common-utilities/popups/ucas-calculator/grade-badge-button";
import "@testing-library/jest-dom";
describe("GradeBadgeButton Component", () => {
  const mockSetQual = jest.fn();
  const mockSetUcasPoint = jest.fn();

  const mockProps = {
    btnName: "A",
    btnValue: 10,
    indexPosition: 0,
    qual: [
      { podSpecificPoints: 8, userEntryPoint: "" },
      { podSpecificPoints: 12, userEntryPoint: "" },
    ],
    setQual: mockSetQual,
    ucasPoint: 20,
    setUcasPoint: mockSetUcasPoint,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the button with correct name and styles", () => {
    render(<GradeBadgeButton {...mockProps} />);

    const button = screen.getByRole("button", { name: "A" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("A");
    expect(button).toHaveClass("border-primary-400");
    expect(button).toHaveClass("bg-white"); // Default background when not selected
  });

  test("applies selected styles when podSpecificPoints matches btnValue", () => {
    const updatedProps = {
      ...mockProps,
      qual: [{ podSpecificPoints: 10, userEntryPoint: "" }], // podSpecificPoints matches btnValue
    };

    render(<GradeBadgeButton {...updatedProps} />);

    const button = screen.getByRole("button", { name: "A" });
    expect(button).toHaveClass("bg-primary-400");
    expect(button).toHaveClass("text-white");
  });

  test("calls setQual and setUcasPoint correctly when clicked", () => {
    render(<GradeBadgeButton {...mockProps} />);

    const button = screen.getByRole("button", { name: "A" });
    fireEvent.click(button);

    // Check if setUcasPoint is called with correct value
    expect(mockSetUcasPoint).toHaveBeenCalledWith(22); // 20 + 10 - 8

    // Check if setQual is called to update the correct index
    expect(mockSetQual).toHaveBeenCalledWith(expect.any(Function));

    // Simulate the callback function for setQual
    const setQualCallback = mockSetQual.mock.calls[0][0];
    const updatedQual = setQualCallback(mockProps.qual);
    expect(updatedQual).toEqual([
      {
        podSpecificPoints: 10,
        userEntryPoint: "A",
      },
      { podSpecificPoints: 12, userEntryPoint: "" },
    ]);
  });

  test("does not call setUcasPoint or setQual if podSpecificPoints matches btnValue", () => {
    const updatedProps = {
      ...mockProps,
      qual: [{ podSpecificPoints: 10, userEntryPoint: "" }], // Matching btnValue
    };

    render(<GradeBadgeButton {...updatedProps} />);

    const button = screen.getByRole("button", { name: "A" });
    fireEvent.click(button);

    expect(mockSetUcasPoint).not.toHaveBeenCalled();
    expect(mockSetQual).not.toHaveBeenCalled();
  });
});
