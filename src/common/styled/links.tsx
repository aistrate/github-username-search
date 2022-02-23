import { Link as RouterLink } from "react-router-dom";
import styled, { css } from "styled-components/macro";

export { InternalLink, ExternalLink };

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

const InternalLink = styled(RouterLink)`
  ${linkStyle}
`;

const ExternalLink = styled.a.attrs(() => ({
  target: "_blank",
  rel: "noreferrer",
}))`
  ${linkStyle}
`;
