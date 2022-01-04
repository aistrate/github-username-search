import { act, render, screen } from "@testing-library/react";
import Delayed from "../Delayed";

test("should render content with delay", () => {
  jest.useFakeTimers();

  render(<Delayed delay={1000}>Delayed content</Delayed>);
  expect(screen.queryByText("Delayed content")).toBeNull();

  jest.advanceTimersByTime(900);
  expect(screen.queryByText("Delayed content")).toBeNull();

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(screen.queryByText("Delayed content")).not.toBeNull();
});
