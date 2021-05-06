import styled, { css } from "styled-components/macro";

export { ExternalLink };

type LinkProps = {
  nowrap?: boolean;
};

const Link = styled.a<LinkProps>`
  color: #0366d6;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

  ${({ nowrap = false }) =>
    nowrap &&
    css`
      white-space: nowrap;
    `}
`;

const ExternalLink = styled(Link).attrs(() => ({
  target: "_blank",
  rel: "noreferrer",
}))``;
