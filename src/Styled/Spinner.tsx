import styled, { keyframes } from "styled-components/macro";

export { Spinner };

const spinning = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  :before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 50%;
    width: 50px;
    height: 50px;
    margin-top: 0;
    margin-left: -25px;
    border-radius: 50%;
    border: 6px solid #ccc;
    border-top-color: #024ca0;
    animation: ${spinning} 0.6s linear infinite;
  }
`;
