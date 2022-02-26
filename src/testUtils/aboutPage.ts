import { screen } from "@testing-library/react";

export function isAboutPage() {
  return screen.queryByText("How to search") !== null;
}
