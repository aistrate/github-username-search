import { useEffect, useState } from "react";
import Spinner from "./styled/Spinner";

export default DelayedSpinner;

type DelayedSpinnerProps = {
  delay?: number;
};

function DelayedSpinner({ delay = 500 }: DelayedSpinnerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return <>{isVisible && <Spinner />}</>;
}
