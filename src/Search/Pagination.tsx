import { Link as RouterLink } from "react-router-dom";

export default Pagination;

type PaginationProps = {
  username: string;
  page: number;
  pageCount: number;
  scrollTo?: React.MutableRefObject<HTMLElement>;
};

function Pagination({ username, page, pageCount, scrollTo }: PaginationProps) {
  function handlePageChange() {
    if (scrollTo) {
      scrollTo.current.scrollIntoView();
    }
  }

  return pageCount >= 2 ? (
    <div className="Pagination">
      <RouterLink
        className={`Link Pagination__link ${
          page <= 1 ? "Pagination__link--disabled" : ""
        }`}
        to={`/search?q=${username}&page=${clamp(page - 1, 1, pageCount)}`}
        onClick={handlePageChange}
      >
        &lt; Previous
      </RouterLink>
      &nbsp;&nbsp; Page {page}/{pageCount} &nbsp;&nbsp;
      <RouterLink
        className={`Link Pagination__link ${
          page >= pageCount ? "Pagination__link--disabled" : ""
        }`}
        to={`/search?q=${username}&page=${clamp(page + 1, 1, pageCount)}`}
        onClick={handlePageChange}
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
