import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { baseUrl } from "../../app/api";
import App from "../../app/App";
import { mockUsers } from "../../mocks/mockData";
import { server } from "../../mocks/server";
import * as historyPage from "../../testUtils/historyPage";
import * as nav from "../../testUtils/nav";
import * as searchPage from "../../testUtils/searchPage";
import { renderWithWrapper } from "../../testUtils/utils";

test("perform search and page through the repositories (happy path)", async () => {
  renderWithWrapper(<App />);

  searchPage.searchUsername("reddit");

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);

  expect(searchPage.userInfoText()).toMatch("Location:San Francisco, CA");
  expect(searchPage.userInfoText()).toMatch("Repositories:88");

  expect(searchPage.paginationText()).toMatch("Page 1/3");

  searchPage.goToNextRepoPage();
  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[2]);
  expect(searchPage.paginationText()).toMatch("Page 2/3");

  searchPage.goToNextRepoPage();
  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[3]);
  expect(searchPage.paginationText()).toMatch("Page 3/3");

  searchPage.goToNextRepoPage();
  expect(searchPage.paginationText()).toMatch("Page 3/3");

  searchPage.goToPreviousRepoPage();
  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[2]);
  expect(searchPage.paginationText()).toMatch("Page 2/3");

  searchPage.goToPreviousRepoPage();
  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);
  expect(searchPage.paginationText()).toMatch("Page 1/3");

  searchPage.goToPreviousRepoPage();
  expect(searchPage.paginationText()).toMatch("Page 1/3");
}, 15000);

test("perform search for user with single page of repositories", async () => {
  renderWithWrapper(<App />);

  searchPage.searchUsername("graphql");

  await expectRepoNamesToEqual(expectedRepoNames["graphql"].pages[1]);

  expect(searchPage.userInfoText()).toMatch("Repositories:25");

  expect(searchPage.paginationText()).toBe("");
});

test("perform search for user with zero repositories", async () => {
  renderWithWrapper(<App />);

  searchPage.searchUsername("zerorepos");

  await screen.findByText("Repositories");
  await screen.findByText("(none)");

  expect(searchPage.userInfoText()).toMatch("Repositories:0");

  expect(searchPage.paginationText()).toBe("");
});

test("perform search through URL parameter 'username'", async () => {
  renderWithWrapper(<App />, "/search?username=reddit");

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);
  expect(searchPage.paginationText()).toMatch("Page 1/3");
});

test("perform search through URL parameters 'username' and 'page'", async () => {
  renderWithWrapper(<App />, "/search?username=reddit&page=2");

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[2]);
  expect(searchPage.paginationText()).toMatch("Page 2/3");
});

test("perform search by pressing Enter", async () => {
  renderWithWrapper(<App />);

  searchPage.typeUsername("reddit{enter}");

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);
});

test("trim search string and convert it to lowercase before searching", async () => {
  renderWithWrapper(<App />);

  searchPage.searchUsername("  REDDIT   ");

  expect(searchPage.usernameInputValue()).toBe("reddit");

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);
});

test("show spinner if User data fetching takes more than 500 ms", async () => {
  renderWithWrapper(<App />);

  server.use(
    rest.get(`${baseUrl}/users/reddit`, (_req, res, ctx) => {
      return res(ctx.json(mockUsers["reddit"].user), ctx.delay(500));
    })
  );

  searchPage.searchUsername("reddit");

  expect(await screen.findByTestId("userSpinner")).toBeInTheDocument();

  await searchPage.waitForUserInfo();

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

  searchPage.searchUsername("reddit");

  expect(await screen.findByTestId("reposSpinner")).toBeInTheDocument();

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);

  expect(screen.queryByTestId("reposSpinner")).not.toBeInTheDocument();

  server.use(
    rest.get(`${baseUrl}/users/reddit/repos`, (_req, res, ctx) => {
      return res(ctx.json(mockUsers["reddit"].repoPages[2]), ctx.delay(500));
    })
  );

  searchPage.goToNextRepoPage();

  expect(await screen.findByTestId("reposSpinner")).toBeInTheDocument();

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[2]);

  expect(screen.queryByTestId("reposSpinner")).not.toBeInTheDocument();
});

test("give focus to the Username input when needed", async () => {
  renderWithWrapper(<App />);

  expect(screen.getByPlaceholderText("Username")).toHaveFocus();

  nav.goToAboutPage();
  expect(screen.queryByText("How to search")).toBeInTheDocument();

  nav.goToSearchPage();
  expect(screen.getByPlaceholderText("Username")).toHaveFocus();

  searchPage.searchUsername("graphql");

  expect(screen.getByPlaceholderText("Username")).not.toHaveFocus();

  await expectRepoNamesToEqual(expectedRepoNames["graphql"].pages[1]);
  expect(screen.getByPlaceholderText("Username")).not.toHaveFocus();

  nav.goToHistoryPage();
  expect(screen.queryByText("History (1)")).toBeInTheDocument();

  historyPage.followUsernameLink("graphql");

  expect(searchPage.usernameInputValue()).toBe("graphql");
  expect(screen.getByPlaceholderText("Username")).not.toHaveFocus();
});

test("render the Search page with User and Repos data (snapshot test)", async () => {
  const { container } = renderWithWrapper(<App />, "/search?username=reddit");

  await expectRepoNamesToEqual(expectedRepoNames["reddit"].pages[1]);

  expect(container.firstChild).toMatchSnapshot();
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
