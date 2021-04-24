import { Link as RouterLink } from "react-router-dom";

export default Pagination;

type PaginationProps = {
  page: number;
  pageCount: number;
  getPageUrl: (page: number) => string;
  isLoading?: boolean;
  scrollTo?: React.MutableRefObject<HTMLElement>;
};

function Pagination({
  page,
  pageCount,
  getPageUrl,
  isLoading = false,
  scrollTo,
}: PaginationProps) {
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
        to={getPageUrl(clamp(page - 1, 1, pageCount))}
        onClick={handlePageChange}
      >
        &lt; Previous
      </RouterLink>
      &nbsp;&nbsp; Page{" "}
      <span className={isLoading ? "Pagination__page-number--grayed-out" : ""}>
        {page}
      </span>
      /{pageCount} &nbsp;&nbsp;
      <RouterLink
        className={`Link Pagination__link ${
          page >= pageCount ? "Pagination__link--disabled" : ""
        }`}
        to={getPageUrl(clamp(page + 1, 1, pageCount))}
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
