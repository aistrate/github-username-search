import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../app/App";

test("perform search", async () => {
  render(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "microsoft");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  const repoHeadings = await screen.findAllByRole("heading", { level: 3 });
  const repoNames = repoHeadings.map((heading) => heading.textContent);

  expect(repoNames).toHaveLength(30);
});
