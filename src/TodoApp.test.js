import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "./TodoApp";

test("add and remove todo", () => {
  render(<TodoApp />);
  const input = screen.getByPlaceholderText(/things to be done/i);
  fireEvent.change(input, { target: { value: "Test Todo" } });
  const addButton = screen.getByRole("button", { name: /add/i });
  fireEvent.click(addButton);
  expect(screen.getByText("Test Todo")).toBeInTheDocument();
  fireEvent.click(screen.getByText("X"));
  expect(screen.queryByText("Test Todo")).not.toBeInTheDocument();
});

test("complete todo", () => {
  render(<TodoApp />);
  const input = screen.getByPlaceholderText(/things to be done/i);
  fireEvent.change(input, { target: { value: "Complete Me" } });
  fireEvent.click(screen.getByRole("button", { name: /add/i }));
  const todoText = screen.getByText("Complete Me");
  const todoItem = todoText.closest("li");
  expect(todoItem).not.toHaveClass("completed");
  fireEvent.click(todoText);
  expect(todoItem).toHaveClass("completed");
});
