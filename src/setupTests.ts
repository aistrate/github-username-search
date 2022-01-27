import "@testing-library/jest-dom";
import "jest-styled-components";
import { setLocale } from "./common/formatting";
import { server } from "./mocks/server";

beforeAll(() => {
  server.listen();

  // the operating system this was developed on (Windows 7) cannot install Node.js versions greater than v12;
  // v13 is the first version to fully implement locales; v12 only knows "en-US";
  // we're setting the locale to "en-US" so that snapshot tests will still work on versions 13 and greater
  setLocale("en-US");
});

afterEach(() => {
  server.resetHandlers();
  window.localStorage.clear();
});

afterAll(() => server.close());
