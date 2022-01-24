import { getByText, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { baseUrl } from "../../app/api";
import App from "../../app/App";
import { renderWithWrapper } from "../../common/testUtils";
import { mockUsers } from "../../mocks/mockData";
import { server } from "../../mocks/server";

test("perform search and page through repositories ('happy path')", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);

  const userView = screen.getByTestId("userView");
  expect(userView).toHaveTextContent("Location:San Francisco, CA");
  expect(userView).toHaveTextContent("Repositories:88");

  const topPagination = screen.getByTestId("topPagination");
  expect(topPagination).toHaveTextContent("Page 1/3");

  userEvent.click(getByText(topPagination, /next/i));
  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[2]);
  expect(topPagination).toHaveTextContent("Page 2/3");

  userEvent.click(getByText(topPagination, /next/i));
  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[3]);
  expect(topPagination).toHaveTextContent("Page 3/3");

  userEvent.click(getByText(topPagination, /next/i));
  expect(topPagination).toHaveTextContent("Page 3/3");

  userEvent.click(getByText(topPagination, /previous/i));
  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[2]);
  expect(topPagination).toHaveTextContent("Page 2/3");

  userEvent.click(getByText(topPagination, /previous/i));
  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);
  expect(topPagination).toHaveTextContent("Page 1/3");

  userEvent.click(getByText(topPagination, /previous/i));
  expect(topPagination).toHaveTextContent("Page 1/3");
}, 15000);

test("perform search for user with single page of repositories", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "graphql");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  await expectRepoNamesToEqual(expectedRepoNames["graphql"].pages[1]);

  expect(screen.getByTestId("userView")).toHaveTextContent("Repositories:25");

  expect(screen.getByTestId("topPagination")).toBeEmptyDOMElement();
});

test("perform search for user with zero repositories", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "zerorepos");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  await screen.findByText("Repositories");
  await screen.findByText("(none)");

  expect(screen.getByTestId("userView")).toHaveTextContent("Repositories:0");

  expect(screen.getByTestId("topPagination")).toBeEmptyDOMElement();
});

test("perform search by pressing Enter", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit{enter}");

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);
});

test("trim search string before searching", async () => {
  renderWithWrapper(<App />);

  const usernameInput = screen.getByPlaceholderText("Username");

  userEvent.type(usernameInput, "  reddit   ");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(usernameInput).toHaveValue("reddit");

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);
});

test("show spinner if User data fetching takes more than 500 ms", async () => {
  renderWithWrapper(<App />);

  server.use(
    rest.get(`${baseUrl}/users/reddit`, (_req, res, ctx) => {
      return res(ctx.json(mockUsers["reddit"].user), ctx.delay(500));
    })
  );

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(await screen.findByTestId("userSpinner")).toBeInTheDocument();

  expect(await screen.findByText("San Francisco, CA")).toBeInTheDocument();

  expect(screen.queryByTestId("userSpinner")).not.toBeInTheDocument();
});

test("show spinner if Repos data fetching takes more than 500 ms", async () => {
  renderWithWrapper(<App />);

  server.use(
    rest.get(`${baseUrl}/users/reddit`, (_req, res, ctx) => {
      return res(ctx.json(mockUsers["reddit"].user), ctx.delay(0));
    }),
    rest.get(`${baseUrl}/users/reddit/repos`, (_req, res, ctx) => {
      return res(ctx.json(mockUsers["reddit"].repoPages[1]), ctx.delay(800));
    })
  );

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(await screen.findByTestId("reposSpinner")).toBeInTheDocument();

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);

  expect(screen.queryByTestId("reposSpinner")).not.toBeInTheDocument();

  server.use(
    rest.get(`${baseUrl}/users/reddit/repos`, (_req, res, ctx) => {
      return res(ctx.json(mockUsers["reddit"].repoPages[2]), ctx.delay(500));
    })
  );

  userEvent.click(getByText(screen.getByTestId("topPagination"), /next/i));

  expect(await screen.findByTestId("reposSpinner")).toBeInTheDocument();

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[2]);

  expect(screen.queryByTestId("reposSpinner")).not.toBeInTheDocument();
});

test("Username input receives focus when needed", async () => {
  renderWithWrapper(<App />);

  expect(screen.getByPlaceholderText("Username")).toHaveFocus();

  const menu = screen.getByRole("navigation");

  userEvent.click(getByText(menu, "About"));
  expect(screen.queryByText("How to search")).toBeInTheDocument();

  userEvent.click(getByText(menu, "Search"));
  expect(screen.getByPlaceholderText("Username")).toHaveFocus();

  let usernameInput = screen.getByPlaceholderText("Username");

  userEvent.type(usernameInput, "graphql");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(usernameInput).not.toHaveFocus();

  await expectRepoNamesToEqual(expectedRepoNames["graphql"].pages[1]);
  expect(usernameInput).not.toHaveFocus();

  userEvent.click(getByText(menu, "History"));
  expect(screen.queryByText("History (1)")).toBeInTheDocument();

  userEvent.click(screen.getByText("graphql"));

  usernameInput = screen.getByPlaceholderText("Username");

  expect(usernameInput).toHaveValue("graphql");
  expect(usernameInput).not.toHaveFocus();
});

test("perform search through URL parameter 'username'", async () => {
  renderWithWrapper(<App />, "/search?username=reddit");

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);
  expect(screen.getByTestId("topPagination")).toHaveTextContent("Page 1/3");
});

test("perform search through URL parameters 'username' and 'page'", async () => {
  renderWithWrapper(<App />, "/search?username=reddit&page=2");

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[2]);
  expect(screen.getByTestId("topPagination")).toHaveTextContent("Page 2/3");
});

async function expectRepoNamesToEqual(expected: string[]) {
  await waitFor(
    () => {
      const repoHeadings = screen.queryAllByRole("heading", { level: 3 });
      const repoNames = repoHeadings.map(
        (heading) => heading.textContent || ""
      );
      expect(repoNames).toEqual(expected);
    },
    { timeout: 3000 }
  );
}

type RepoNames = {
  [username: string]: {
    pages: {
      [page: number]: string[];
    };
  };
};

const expectedRepoNames: RepoNames = {
  reddit: {
    pages: {
      1: [
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
      ],
      2: [
        "jwt-go",
        "ruby-zookeeper",
        "spinnakerpb",
        "event-tracker",
        "go-statsd-influxdb",
        "pywebpush",
        "puppet-fluentd",
        "puppetlabs-apt",
        "SegmentedControl",
        "thrift",
        "checkpoints",
        "puppetlabs-vcsrepo",
        "synapse",
        "react-popper",
        "nerve",
        "jsapi-example-consumer",
        "fluent-plugin-logdna",
        "aws-mfa",
        "statsite",
        "gockle",
        "fbthrift",
        "mcsauna",
        "wal-e",
        "node-private",
        "node-widgets",
        "node-build",
        "hvac",
        "secor",
        "dualcache",
        "cassandra-reaper",
      ],
      3: [
        "diamond-memcached-slab-collector",
        "cabot-alert-pagerduty",
        "node-platform",
        "node-middleware",
        "etcd",
        "snooboots",
        "mcrouter",
        "node-flags",
        "ruby-zk",
        "node-horse-react",
        "node-horse",
        "einhorn",
        "node-rest-cache",
        "puppet-marathon",
        "puppet-mesos",
        "monitors",
        "folly",
        "gevent",
        "cabot-alert-slack",
        "cabot",
        "django-underpants",
        "node-text-js",
        "thebutton-data",
        "snuownd",
        "reddit-client-lib",
        "memkeys",
        "JMSlider",
        "JMTabView",
      ],
    },
  },
  graphql: {
    pages: {
      1: [
        "graphql.github.io",
        "graphql-wg",
        "graphql-js",
        "graphql-landscape",
        "vscode-graphql",
        "graphql-spec",
        "graphiql",
        "graphql-playground",
        "graphql-js-wg",
        "libgraphqlparser",
        "graphql-relay-js",
        "express-graphql",
        "graphql-directory",
        "dataloader",
        "swapi-graphql",
        "graphql-over-http",
        "EasyCLA",
        "foundation",
        "prettier",
        ".github",
        "faq",
        "graphql-scalars",
        "marketing",
        "codemirror-graphql",
        "graphql-language-service",
      ],
    },
  },
  zerorepos: {
    pages: {
      1: [],
    },
  },
};
