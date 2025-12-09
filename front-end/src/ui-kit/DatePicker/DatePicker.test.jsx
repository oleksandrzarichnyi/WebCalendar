jest.mock('../icons/icons.jsx', () => ({
  downIcon: 'downIcon.svg',
  arrowLeftIcon: 'arrowLeft',
  arrowRightIcon: 'arrowRight',
}));

import { render, fireEvent, screen } from '@testing-library/react'
import DatePicker from './DatePicker.jsx'

describe("DatePicker", () => {
  test("renders DatePicker", () => {
    render(<DatePicker />);
    expect(screen.getByText("November 2025")).toBeInTheDocument();
  });

  test("renders all days", () => {
    render(<DatePicker />);
    const lables = document.querySelectorAll("label");
    expect(lables).toHaveLength(42);
  });

  test("renders day selection", () => {
    render(<DatePicker />);
    const lables = document.querySelectorAll("label");
    fireEvent.click(lables[3]);
    expect(lables[3].className).toContain("number--active");
  });

  test("renders next month and year on button click", () => {
    render(<DatePicker initialMonthIndex={11} />);
    const button = screen.getByTestId("rightButton");
    fireEvent.click(button);
    expect(screen.getByText("January 2026")).toBeInTheDocument();
  });

  test("renders previous month and year on button click", () => {
    render(<DatePicker initialMonthIndex={0} />);
    const button = screen.getByTestId("leftButton");
    fireEvent.click(button);
    expect(screen.getByText("December 2024")).toBeInTheDocument();
  });

  test("renders prev and next month/year on day click", () => {
    render(<DatePicker initialMonthIndex={11} />);

    const lables = document.querySelectorAll("label");
    fireEvent.click(lables[40]);
    expect(screen.getByText("January 2026")).toBeInTheDocument();

    const updatedLables = document.querySelectorAll("label");
    fireEvent.click(updatedLables[0]);
    expect(screen.getByText("December 2025")).toBeInTheDocument();
  });
});