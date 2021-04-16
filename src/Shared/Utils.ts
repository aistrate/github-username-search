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

function formatDate(value: string | number) {
  return new Date(value).toLocaleDateString(locale, dateOptions);
}

function formatDateTime(value: string | number) {
  return new Date(value).toLocaleDateString(locale, dateTimeOptions);
}

function formatNumber(value: number) {
  return value.toLocaleString(locale);
}
