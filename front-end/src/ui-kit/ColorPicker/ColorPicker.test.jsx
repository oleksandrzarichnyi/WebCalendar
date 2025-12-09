jest.mock('../icons/color-icon.svg?react', () => () => 'ColorIcon');
jest.mock('../icons/icons.jsx', () => ({
  downIcon: 'down.svg'
}));

import { render, fireEvent, screen } from '@testing-library/react'
import ColorPicker from './ColorPicker.jsx'

describe("ColorPicker", () => {
  test("renders ColorPicker", () => {
    render(<ColorPicker />)
    expect(screen.getByTestId("color-picker")).toBeInTheDocument();
  });
  
  test("renders all colors", () => {
    render(<ColorPicker />);
    expect(screen.getAllByRole("radio")).toHaveLength(12);
  });

  test("color is not selected on render", () => {
    render(<ColorPicker />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("renders color selection", () => {
    render(<ColorPicker />);
    const radios = screen.getAllByRole("radio");
    const label = radios[3].closest("label");
    fireEvent.click(radios[3]);
    expect(label.querySelector("img")).toBeInTheDocument();
  });
});