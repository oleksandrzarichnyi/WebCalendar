jest.mock("../icons/icons.jsx", () => ({
  arrowLeftIcon: "left.svg",
  arrowRightIcon: "right.svg",
}));

import { render, screen, fireEvent } from '@testing-library/react'
import CustomButton from '../Buttons/CustomButton.jsx'

describe('CustomButton', () => {
  test("renders button text", () => {
    render(<CustomButton text="Click" />)
    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<CustomButton onClick={handleClick} />)
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders correct class", () => {
    render(<CustomButton variant="primary" />)
    const button = screen.getByRole("button");
    expect(button.className).toContain('primary');
  });

  test("renders active class when isActive", () => {
    render(<CustomButton variant="primary" isActive={true} />)
    const button = screen.getByRole("button")
    expect(button.className).toContain("primary--active");
  });

  test("renders icons", () => {
    render(<CustomButton variant="primary" icon="arrowLeftIcon" iconRight="arrowRightIcon" />)
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(2);
  });

  test("renders selected", () => {
    render(<CustomButton variant="primary" selected="selected" text="text" />);
    expect(screen.getByText("selected")).toBeInTheDocument();
  });
});