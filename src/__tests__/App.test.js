import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";


import "@testing-library/jest-dom";

test("checkbox is initially unchecked", () => {
 render(<App />);
 const checkbox = screen.getByRole("checkbox");
 expect(checkbox).not.toBeChecked();
});

test("checkbox appears as checked when user clicks it", () => {
 render(<App />);
 const checkbox = screen.getByRole("checkbox");
 userEvent.click(checkbox);
 expect(checkbox).toBeChecked();
});

test("checkbox appears as unchecked when user clicks a second time", () => {
 render(<App />);
 const checkbox = screen.getByRole("checkbox");
 userEvent.click(checkbox);
 userEvent.click(checkbox);
 expect(checkbox).not.toBeChecked();
});

test("size select element initially displays 'Small'", () => {
 render(<App />);
 const select = screen.getByLabelText(/select size/i);
 expect(select).toHaveDisplayValue("Small");
});

test("select Size dropdown displays the user's selected value", () => {
 render(<App />);
 const select = screen.getByLabelText(/select size/i);
 userEvent.selectOptions(select, "medium");
 expect(select).toHaveDisplayValue("Medium");
});

test('"Your Selection" text updates based on size and topping', () => {
  render(<App />);
  const select = screen.getByLabelText(/select size/i);
  userEvent.selectOptions(select, "medium");

  const addPepperoni = screen.getByLabelText(/add pepperoni/i);
  userEvent.click(addPepperoni);

  const matchingElements = screen.getAllByText((content, element) => {
    const textContent = element?.textContent?.toLowerCase() || "";
    return (
      textContent.includes("your selection:") &&
      textContent.includes("medium") &&
      textContent.includes("pepperoni")
    );
  });
  expect(matchingElements.length).toBeGreaterThan(0);

  // Uncheck pepperoni
  userEvent.click(addPepperoni);

  const unselectedElements = screen.getAllByText((content, element) => {
    const textContent = element?.textContent?.toLowerCase() || "";
    return (
      textContent.includes("your selection:") &&
      textContent.includes("medium") &&
      !textContent.includes("pepperoni")
    );
  });
  expect(unselectedElements.length).toBeGreaterThan(0);
});

test("contact info textbox updates when user types", () => {
 render(<App />);
 const input = screen.getByLabelText(/enter your email address/i);
 userEvent.type(input, "test@example.com");
 expect(input).toHaveValue("test@example.com");
});

test("submit order button is in the document", () => {
 render(<App />);
 const button = screen.getByRole("button", { name: /submit order/i });
 expect(button).toBeInTheDocument();
});



