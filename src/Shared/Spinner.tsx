import { useState, useEffect } from "react";
import styles from "./Spinner.module.css";

export default Spinner;

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

  return <>{isVisible && <div className={styles.Spinner} />}</>;
}
