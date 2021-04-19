import { Link as RouterLink } from "react-router-dom";

export default Pagination;

type PaginationProps = {
  username: string;
  page: number;
};

function Pagination({ username, page }: PaginationProps) {
  const pageCount = 10;

  return (
    <div className="Pagination">
      <RouterLink
        className="Link Pagination__link"
        to={`/search?q=${username}&page=${page - 1}`}
      >
        &lt; Previous
      </RouterLink>
      &nbsp;&nbsp; Page {page}/{pageCount} &nbsp;&nbsp;
      <RouterLink
        className="Link Pagination__link"
        to={`/search?q=${username}&page=${page + 1}`}
      >
        Next &gt;
      </RouterLink>
    </div>
  );
}
