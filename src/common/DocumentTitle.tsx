import { useEffect } from "react";

export default DocumentTitle;

type DocumentTitleProps = {
  value: string;
};

function DocumentTitle({ value }: DocumentTitleProps) {
  useEffect(() => {
    document.title = `${value} - ${process.env.REACT_APP_APPLICATION_NAME}`;
  }, [value]);

  return null;
}
