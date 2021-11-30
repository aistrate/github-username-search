import styled, { css } from "styled-components/macro";

export { LargeHeading, SmallHeading };

const LargeHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.83em 0;
`;

type SmallHeadingProps = {
  largeMarginTop?: boolean;
};

const SmallHeading = styled.h3<SmallHeadingProps>`
  font-size: 1.17rem;
  font-weight: 700;
  margin: 0.83em 0;

  ${({ largeMarginTop = false }) =>
    largeMarginTop &&
    css`
      margin-top: 1.67em;
    `}
`;
