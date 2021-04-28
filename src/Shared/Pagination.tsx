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

  return (
    <>
      {pageCount >= 2 && (
        <div className="Pagination">
          <PaginationLink
            disabled={page <= 1}
            to={getPageUrl(clamp(page - 1, 1, pageCount))}
            onClick={handlePageChange}
          >
            &lt; Previous
          </PaginationLink>
          &nbsp;&nbsp; Page{" "}
          <span
            className={isLoading ? "Pagination__page-number--grayed-out" : ""}
          >
            {page}
          </span>
          /{pageCount} &nbsp;&nbsp;
          <PaginationLink
            disabled={page >= pageCount}
            to={getPageUrl(clamp(page + 1, 1, pageCount))}
            onClick={handlePageChange}
          >
            Next &gt;
          </PaginationLink>
        </div>
      )}
    </>
  );
}

type PaginationLinkProps = {
  disabled: boolean;
  to: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

function PaginationLink({
  disabled,
  to,
  onClick,
  children,
}: PaginationLinkProps) {
  return (
    <RouterLink
      className={`Link Pagination__link ${
        disabled ? "Pagination__link--disabled" : ""
      }`}
      to={to}
      onClick={onClick}
    >
      {children}
    </RouterLink>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}
