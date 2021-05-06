import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components/macro";

export { Spinner };

function Spinner() {
  const delay = 500;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <>{isVisible && <StyledSpinner />}</>;
}

const spinning = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
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
