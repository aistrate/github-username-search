import { Link as RouterLink } from "react-router-dom";

export default Pagination;

type PaginationProps = {
  username: string;
  page: number;
  pageCount: number;
};

function Pagination({ username, page, pageCount }: PaginationProps) {
  return pageCount >= 2 ? (
    <div className="Pagination">
      <RouterLink
        className="Link Pagination__link"
        to={`/search?q=${username}&page=${clamp(page - 1, 1, pageCount)}`}
      >
        &lt; Previous
      </RouterLink>
      &nbsp;&nbsp; Page {page}/{pageCount} &nbsp;&nbsp;
      <RouterLink
        className="Link Pagination__link"
        to={`/search?q=${username}&page=${clamp(page + 1, 1, pageCount)}`}
      >
        Next &gt;
      </RouterLink>
    </div>
  ) : (
    <></>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}
