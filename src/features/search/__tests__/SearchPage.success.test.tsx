import { getByText, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../app/App";
import { renderWithWrapper } from "../../../common/testUtils";

jest.setTimeout(12000);

test("perform search and page through repositories (main 'happy path' test)", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  await expectRepoNames(expectedRepoNames["reddit"].pages[1]);

  const page = screen.getByTestId("pageContainer");
  expect(page).toHaveTextContent("Location:San Francisco, CA");
  expect(page).toHaveTextContent("Repositories:88");

  const topPagination = screen.getByTestId("topPagination");
  expect(topPagination).toHaveTextContent("Page 1/3");

  userEvent.click(getByText(topPagination, /next/i));
  await expectRepoNames(expectedRepoNames["reddit"].pages[2]);
  expect(topPagination).toHaveTextContent("Page 2/3");

  userEvent.click(getByText(topPagination, /next/i));
  await expectRepoNames(expectedRepoNames["reddit"].pages[3]);
  expect(topPagination).toHaveTextContent("Page 3/3");

  userEvent.click(getByText(topPagination, /next/i));
  expect(topPagination).toHaveTextContent("Page 3/3");

  userEvent.click(getByText(topPagination, /previous/i));
  await expectRepoNames(expectedRepoNames["reddit"].pages[2]);
  expect(topPagination).toHaveTextContent("Page 2/3");

  userEvent.click(getByText(topPagination, /previous/i));
  await expectRepoNames(expectedRepoNames["reddit"].pages[1]);
  expect(topPagination).toHaveTextContent("Page 1/3");

  userEvent.click(getByText(topPagination, /previous/i));
  expect(topPagination).toHaveTextContent("Page 1/3");
});

async function expectRepoNames(expected: string[]) {
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

test("perform search by pressing Enter", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit{enter}");

  await expectRepoNames(expectedRepoNames["reddit"].pages[1]);
});

test("trim search string before searching", async () => {
  renderWithWrapper(<App />);

  const usernameInput = screen.getByPlaceholderText("Username");

  userEvent.type(usernameInput, "  reddit   ");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(usernameInput).toHaveValue("reddit");

  await expectRepoNames(expectedRepoNames["reddit"].pages[1]);
});

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
};
