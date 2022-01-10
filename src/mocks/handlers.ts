import { rest } from "msw";
import { baseUrl } from "../app/api";
import { mockUsers } from "./mockData";

const handlers = [
  rest.get(`${baseUrl}/users/:username`, (req, res, ctx) => {
    const username = req.params["username"] as string;

    return res(ctx.json(mockUsers[username].user));
  }),

  rest.get(`${baseUrl}/users/:username/repos`, (req, res, ctx) => {
    const username = req.params["username"] as string;
    const page = parseInt(req.url.searchParams.get("page") || "1");

    return res(ctx.json(mockUsers[username].repoPages[page]));
  }),
];

export default handlers;
