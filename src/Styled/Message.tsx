import styled, { css } from "styled-components";

export { Message };

type MessageProps = {
  type: "info" | "error";
};

const Message = styled.div<MessageProps>`
  font-weight: 600;

  ${({ type }) =>
    type === "error" &&
    css`
      color: red;
    `}
`;
