import { Link as RouterLink } from "react-router-dom";
import styles from "./Pagination.module.css";

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
        <div className={styles.Pagination}>
          <PaginationLink
            disabled={page <= 1}
            to={getPageUrl(clamp(page - 1, 1, pageCount))}
            onClick={handlePageChange}
          >
            &lt; Previous
          </PaginationLink>
          &nbsp;&nbsp; Page{" "}
          <span className={isLoading ? styles.grayedOutPageNumber : ""}>
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

type PaginationLinkProps = React.ComponentProps<typeof RouterLink> & {
  disabled: boolean;
};

function PaginationLink({ disabled, children, ...props }: PaginationLinkProps) {
  return disabled ? (
    <span className={styles.PaginationLinkDisabled}>{children}</span>
  ) : (
    <RouterLink className={styles.PaginationLink} {...props}>
      {children}
    </RouterLink>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}
