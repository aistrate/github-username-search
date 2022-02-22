import { act, render, screen } from "@testing-library/react";
import Delayed from "./Delayed";

test("<Delayed> shows its content with a delay", () => {
  jest.useFakeTimers();

  render(<Delayed delay={1000}>Delayed content</Delayed>);

  expect(screen.queryByText("Delayed content")).not.toBeInTheDocument();

  jest.advanceTimersByTime(900);
  expect(screen.queryByText("Delayed content")).not.toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(screen.queryByText("Delayed content")).toBeInTheDocument();

  jest.useRealTimers();
});
