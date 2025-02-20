import React, { useState } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import GradeCounterButton from "@packages/shared-components/common-utilities/popups/ucas-calculator/grade-counter-button";
import {
  updateUserEntryPointForDecrement,
  updateUserEntryPointForIncrement,
} from "@packages/lib/utlils/ucas-functions";
jest.mock("@packages/lib/utlils/ucas-functions", () => ({
  updateUserEntryPointForIncrement: jest
    .fn()
    .mockImplementation((entryPoint) => entryPoint + "_incremented"),
  updateUserEntryPointForDecrement: jest
    .fn()
    .mockImplementation((entryPoint) => entryPoint + "_decremented"),
}));
describe("GradeCounterButton Component", () => {
  const setup = (customProps = {}) => {
    const initialQual = [
      {
        maxPoint: 5,
        getmaxTotalPoint: 0,
        maxTotalPoint: 10,
        podSpecificPoints: 0,
        gradeArray: [{ key: "A" }, { key: "B" }],
        userEntryPoint: "",
      },
    ];
    const mockSetQual = jest.fn();
    const mockSetUcasPoint = jest.fn();

    const props = {
      btnName: "Test Button",
      btnValue: 2,
      qual: initialQual,
      setQual: mockSetQual,
      indexPosition: 0,
      ucasPoint: 10,
      setUcasPoint: mockSetUcasPoint,
      populateCount: 0,
      ...customProps,
    };

    render(<GradeCounterButton {...props} />);
    return { mockSetQual, mockSetUcasPoint };
  };

  test("increments count and updates state when increment button is clicked", async () => {
    const { mockSetUcasPoint } = setup();

    const incrementButton = screen.getByRole("button", { name: "increment" });
    await act(async () => {
      fireEvent.click(incrementButton);
    });

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(mockSetUcasPoint).toHaveBeenCalledWith(12); // ucasPoint + btnValue
  });

  test("decrements count and updates state when decrement button is clicked", async () => {
    const { mockSetUcasPoint } = setup({ populateCount: 1 });

    const decrementButton = screen.getByRole("button", { name: "decrement" });
    await act(async () => {
      fireEvent.click(decrementButton);
    });

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(mockSetUcasPoint).toHaveBeenCalledWith(8); // ucasPoint - btnValue
  });

  test("calls setQual correctly on increment", async () => {
    const { mockSetQual } = setup();

    const incrementButton = screen.getByRole("button", { name: "increment" });
    await act(async () => {
      fireEvent.click(incrementButton);
    });

    expect(mockSetQual).toHaveBeenCalledTimes(1);
    expect(mockSetQual).toHaveBeenCalledWith(expect.any(Function));
  });

  test("calls setQual correctly on decrement", async () => {
    const { mockSetQual } = setup({ populateCount: 1 });

    const decrementButton = screen.getByRole("button", { name: "decrement" });
    await act(async () => {
      fireEvent.click(decrementButton);
    });
    expect(mockSetQual).toHaveBeenCalledTimes(1);
    expect(mockSetQual).toHaveBeenCalledWith(expect.any(Function));
  });
});
