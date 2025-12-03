import { render, screen, fireEvent } from '@testing-library/react'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  test("renders checkbox", () => {
    render(<Checkbox text="text1" textLeft="text2" />);
    expect(screen.getByText("text1")).toBeInTheDocument();
    expect(screen.getByText("text2")).toBeInTheDocument();
  });

  test("renders isChecked", () => {
    render(<Checkbox isChecked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).toBe(true);
  });

  test("renders checked state", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    const initialState = checkbox.checked;
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(!initialState);
  });

  test("calls onChange when clicked", () => {
    const handleClick = jest.fn();
    render(<Checkbox onChange={handleClick} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});