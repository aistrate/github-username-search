import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export {
  clearUsername,
  searchForUsername,
  typeUsername,
  usernameInputValue,
  waitForUserInfo,
};

function searchForUsername(username: string) {
  typeUsername(username);
  userEvent.click(searchButton());
}

function typeUsername(username: string) {
  userEvent.type(usernameInput(), username);
}

function clearUsername() {
  userEvent.clear(usernameInput());
}

function usernameInputValue() {
  return usernameInput().getAttribute("value");
}

async function waitForUserInfo() {
  await screen.findByTestId("userInfo");
}

function usernameInput() {
  return screen.getByPlaceholderText("Username");
}

function searchButton() {
  return screen.getByRole("button", { name: "Search" });
}
