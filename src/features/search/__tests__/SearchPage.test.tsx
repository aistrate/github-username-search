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

test("non-existing username displays 'not found' message", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "ababab1234");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(
    await screen.findByText(/username 'ababab1234' was not found./i)
  ).toBeInTheDocument();
});
