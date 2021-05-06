import { useEffect } from "react";

export { WindowTitle };

type WindowTitleProps = {
  value: string;
};

function WindowTitle({ value }: WindowTitleProps) {
  useEffect(() => {
    document.title = `${value} - ${process.env.REACT_APP_APPLICATION_NAME}`;
  }, [value]);

  return null;
}
