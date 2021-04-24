import { useEffect } from "react";

export default WindowTitle;

type WindowTitleProps = {
  value: string;
};

function WindowTitle({ value }: WindowTitleProps) {
  useEffect(() => {
    document.title = `${value} - ${process.env.REACT_APP_APPLICATION_NAME}`;
  }, [value]);

  return null;
}
