import styled, { css } from "styled-components/macro";

export { linkStyle, ExternalLink };

type LinkProps = {
  nowrap?: boolean;
};

const linkStyle = css<LinkProps>`
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

const ExternalLink = styled.a.attrs(() => ({
  target: "_blank",
  rel: "noreferrer",
}))`
  ${linkStyle}
`;
