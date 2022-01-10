export const baseUrl = "https://api.github.com";

export const reposPerPage = 30;

export function userUrl(username: string) {
  return `${baseUrl}/users/${username}`;
}

export function reposUrl(username: string, page: number) {
  return `${baseUrl}/users/${username}/repos?page=${page}&per_page=${reposPerPage}&sort=pushed`;
}
