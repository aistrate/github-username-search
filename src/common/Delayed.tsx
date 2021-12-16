import { useEffect, useState } from "react";

export default Delayed;

type DelayedProps = {
  delay?: number;
  children?: React.ReactNode;
};

function Delayed({ delay = 500, children }: DelayedProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return <>{isVisible && <>{children}</>}</>;
}
