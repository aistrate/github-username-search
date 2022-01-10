import { rest } from "msw";
import { baseUrl } from "../app/api";
import { mockUsers } from "./mockData";

const handlers = [
  rest.get(`${baseUrl}/users/:username`, (req, res, ctx) => {
    const username = req.params["username"] as string;

    const user = mockUsers[username].user;

    return res(ctx.json(user));
  }),

  rest.get(`${baseUrl}/users/:username/repos`, (req, res, ctx) => {
    const username = req.params["username"] as string;

    let page = parseInt(req.url.searchParams.get("page") || "1");
    page = Math.max(1, page);

    const repoPage = mockUsers[username].repoPages[page] || [];

    return res(ctx.json(repoPage));
  }),
];

export default handlers;
