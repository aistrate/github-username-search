import { useEffect } from "react";

export { WindowTitle, formatDate, formatDateTime, formatNumber };

type WindowTitleProps = {
  value: string;
};

function WindowTitle({ value }: WindowTitleProps) {
  useEffect(() => {
    document.title = value;
  }, [value]);

  return null;
}

const locale = "en-GB";
const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  ...dateOptions,
  hour: "2-digit",
  minute: "2-digit",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(locale, dateOptions);
}

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleDateString(locale, dateTimeOptions);
}

function formatNumber(n: number) {
  return n.toLocaleString(locale);
}
