import { useEffect } from "react";

export { WindowTitle, formatDate, formatNumber };

type WindowTitleProps = {
  value: string;
};

function WindowTitle({ value }: WindowTitleProps) {
  useEffect(() => {
    document.title = value;
  }, [value]);

  return null;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}
