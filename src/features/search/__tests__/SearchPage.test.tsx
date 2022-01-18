import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../app/App";
import { renderWithWrapper } from "../../../common/testUtils";

test("perform search", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  const repoHeadings = await screen.findAllByRole("heading", { level: 3 });
  const repoNames = repoHeadings.map((heading) => heading.textContent);

  const expected = [
    "baseplate.go",
    "android-interview",
    "rules_apple",
    "baseplate.py",
    "baseplate.py-upgrader",
    "xctestrunner",
    "cqlmapper",
    "error-pages",
    "edgecontext",
    "reddit-gtm-template",
    "fernet-go",
    "baseplate-celery",
    "node-api-client",
    "snudown",
    "drone-kaniko",
    "AlienBlue",
    "rpan-studio",
    "IndicatorFastScroll",
    "thrift-compiler",
    "docker-bazelisk",
    "backup-utils",
    "rollingpin",
    "experiments.py",
    "iOS-interview",
    "dind-drone-plugin",
    "dispatch",
    "thrift-python",
    "zap",
    "reddit-coredns-plugins",
    "obs-browser-plugin",
  ];
  expect(repoNames).toEqual(expected);
});

test("perform search by pressing Enter", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit{enter}");

  const repoHeadings = await screen.findAllByRole("heading", { level: 3 });
  expect(repoHeadings.length).toEqual(30);
});

test("trim search string before searching", async () => {
  renderWithWrapper(<App />);

  const usernameInput = screen.getByPlaceholderText("Username");

  userEvent.type(usernameInput, "  reddit   ");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(usernameInput).toHaveValue("reddit");

  const repoHeadings = await screen.findAllByRole("heading", { level: 3 });
  expect(repoHeadings.length).toEqual(30);
});

test("non-existing username displays 'not found' message", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "ababab1234");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(
    await screen.findByText(/username 'ababab1234' was not found./i)
  ).toBeInTheDocument();
});

test("hyphens not allowed at beginning or end of search string", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit-");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(
    screen.queryByText(
      /username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen./i
    )
  ).toBeInTheDocument();
});
