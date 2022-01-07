import { act, render, screen } from "@testing-library/react";
import Delayed from "../Delayed";

test("should render content with delay", () => {
  jest.useFakeTimers();

  render(<Delayed delay={1000}>Delayed content</Delayed>);

  expect(screen.queryByText(/delayed content/i)).not.toBeInTheDocument();

  jest.advanceTimersByTime(900);
  expect(screen.queryByText(/delayed content/i)).not.toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(screen.queryByText(/delayed content/i)).toBeInTheDocument();
});
