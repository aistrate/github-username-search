import styled, { css } from "styled-components/macro";
import { InternalLink } from "./styled/Links";

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
        <Container>
          <PaginationLink
            disabled={page <= 1}
            to={getPageUrl(clamp(page - 1, 1, pageCount))}
            onClick={handlePageChange}
          >
            &lt; Previous
          </PaginationLink>
          &nbsp;&nbsp; Page <Span grayedOut={isLoading}>{page}</Span>/
          {pageCount} &nbsp;&nbsp;
          <PaginationLink
            disabled={page >= pageCount}
            to={getPageUrl(clamp(page + 1, 1, pageCount))}
            onClick={handlePageChange}
          >
            Next &gt;
          </PaginationLink>
        </Container>
      )}
    </>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

type PaginationLinkProps = React.ComponentProps<
  typeof EnabledPaginationLink
> & {
  disabled: boolean;
};

function PaginationLink({ disabled, children, ...props }: PaginationLinkProps) {
  return disabled ? (
    <DisabledPaginationLink>{children}</DisabledPaginationLink>
  ) : (
    <EnabledPaginationLink {...props}>{children}</EnabledPaginationLink>
  );
}

const paginationLinkStyle = css`
  font-weight: 600;
  user-select: none;
`;

const DisabledPaginationLink = styled.span`
  ${paginationLinkStyle}

  color: black;
  opacity: 0.33;
`;

const EnabledPaginationLink = styled(InternalLink)`
  ${paginationLinkStyle}

  :hover {
    text-decoration: none;
    color: #024ca0;
  }
`;

const Container = styled.div`
  font-size: 1.17rem;
  font-weight: 400;
  white-space: nowrap;
`;

type SpanProps = {
  grayedOut: boolean;
};

const Span = styled.span<SpanProps>(
  ({ grayedOut }) =>
    grayedOut &&
    css`
      opacity: 0.5;
    `
);
