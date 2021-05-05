import styled from "styled-components/macro";

export { TextInput };

const TextInput = styled.input.attrs(() => ({
  type: "text",
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "none",
  spellCheck: false,
}))`
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  color: #0e1e25;
  border: 1px solid #a2a9b1;
  border-radius: 6px;
  outline: none;
  width: 12em;
  height: 1.5em;
  padding: 7px 14px;

  :hover {
    border-color: #72777d;
  }

  :focus {
    border-color: #3366cc;
    box-shadow: inset 0 0 0 1px #3366cc;
  }

  @media (max-width: 40em) {
    & {
      width: 10em;
    }
  }
`;
