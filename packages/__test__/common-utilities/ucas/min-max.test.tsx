import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MaxMinInputBox from "../../../shared-components/common-utilities/popups/ucas-calculator/max-min-input";
describe("MaxMinInputBox Component", () => {
  test("renders Minimum and Maximum input fields with correct initial values", () => {
    const qual = [{ min: 10, max: 20 }];
    const mockSetQual = jest.fn();
    const mockSetUcasPoint = jest.fn();

    render(
      <MaxMinInputBox
        indexPosition={0}
        setQual={mockSetQual}
        setUcasPoint={mockSetUcasPoint}
        qual={qual}
      />
    );

    const minInput = screen.getByLabelText(
      /Minimum points/i
    ) as HTMLInputElement;
    const maxInput = screen.getByLabelText(
      /Maximum points/i
    ) as HTMLInputElement;

    expect(minInput).toBeInTheDocument();
    expect(minInput.value).toBe("10");

    expect(maxInput).toBeInTheDocument();
    expect(maxInput.value).toBe("20");
  });

  test("calls setQual when Minimum points input changes", () => {
    const initialQual = [{ min: 10, max: 20 }];
    const TestComponent = () => {
      const [qual, setQual] = useState(initialQual);

      return (
        <MaxMinInputBox
          indexPosition={0}
          setQual={setQual}
          setUcasPoint={jest.fn()}
          qual={qual}
        />
      );
    };

    render(<TestComponent />);

    const minInput = screen.getByLabelText(
      /Minimum points/i
    ) as HTMLInputElement;
    fireEvent.change(minInput, { target: { value: "30" } });

    expect(minInput.value).toBe("30");
  });

  test("calls setQual and setUcasPoint when Maximum points input changes", () => {
    const initialQual = [{ min: 10, max: 20 }];
    const mockSetUcasPoint = jest.fn();

    const TestComponent = () => {
      const [qual, setQual] = useState(initialQual);

      return (
        <MaxMinInputBox
          indexPosition={0}
          setQual={setQual}
          setUcasPoint={mockSetUcasPoint}
          qual={qual}
        />
      );
    };

    render(<TestComponent />);

    const maxInput = screen.getByLabelText(
      /Maximum points/i
    ) as HTMLInputElement;
    fireEvent.change(maxInput, { target: { value: "50" } });

    expect(maxInput.value).toBe("50");
    expect(mockSetUcasPoint).toHaveBeenCalledWith(50);
  });

  test("handles empty inputs correctly", () => {
    const qual = [{ min: "", max: "" }];
    const mockSetQual = jest.fn();
    const mockSetUcasPoint = jest.fn();

    render(
      <MaxMinInputBox
        indexPosition={0}
        setQual={mockSetQual}
        setUcasPoint={mockSetUcasPoint}
        qual={qual}
      />
    );

    const minInput = screen.getByLabelText(
      /Minimum points/i
    ) as HTMLInputElement;
    const maxInput = screen.getByLabelText(
      /Maximum points/i
    ) as HTMLInputElement;

    expect(minInput.value).toBe("");
    expect(maxInput.value).toBe("");
  });
});
