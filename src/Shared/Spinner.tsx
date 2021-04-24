import { useState, useEffect } from "react";

export default Spinner;

function Spinner() {
  const delay = 500;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <>{isVisible && <div className="Spinner" />}</>;
}
