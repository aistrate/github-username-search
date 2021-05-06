import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components/macro";
import { linkStyle } from "../Styled/Link";

export { InternalLink };

const InternalLink = styled(RouterLink)`
  ${linkStyle}
`;
