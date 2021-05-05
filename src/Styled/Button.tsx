import styled from "styled-components/macro";

export { Button };

const Button = styled.button`
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  margin-left: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  background-color: #3078ca;
  color: white;
  outline: none;

  :not(:disabled) {
    cursor: pointer;
  }

  :hover:not(:disabled) {
    background-color: #22548e;
  }

  :disabled {
    opacity: 0.65;
  }

  :focus {
    box-shadow: 0 0 0 2px white, 0 0 0 4px #3078ca;
  }
`;
