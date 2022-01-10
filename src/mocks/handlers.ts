import { rest } from "msw";
import { baseUrl } from "../app/api";
import { mockUsers } from "./mockData";

const handlers = [
  rest.get(`${baseUrl}/users/:username`, (req, res, ctx) => {
    const username = req.params["username"] as string;

    const mockUser = mockUsers[username];
    if (!mockUser) {
      return res(ctx.status(404), ctx.json({ message: "Not Found" }));
    }

    return res(ctx.json(mockUser.user));
  }),

  rest.get(`${baseUrl}/users/:username/repos`, (req, res, ctx) => {
    const username = req.params["username"] as string;

    let page = parseInt(req.url.searchParams.get("page") || "1");
    page = Math.max(1, page);

    const mockUser = mockUsers[username];
    if (!mockUser) {
      return res(ctx.status(404), ctx.json({ message: "Not Found" }));
    }

    const repoPage = mockUser.repoPages[page] || [];

    return res(ctx.json(repoPage));
  }),
];

export default handlers;
