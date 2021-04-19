import { Link as RouterLink } from "react-router-dom";

export default Pagination;

type PaginationProps = {
  username: string;
  page: number;
};

function Pagination({ username, page }: PaginationProps) {
  return (
    <div className="Pagination">
      <RouterLink
        className="Link"
        to={`/search?q=${username}&page=${page - 1}`}
      >
        {"< Previous"}
      </RouterLink>

      <RouterLink
        className="Pagination__next Link"
        to={`/search?q=${username}&page=${page + 1}`}
      >
        {"Next >"}
      </RouterLink>
    </div>
  );
}
