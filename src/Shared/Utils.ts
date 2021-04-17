import { useEffect } from "react";

export { WindowTitle, formatDateTime, formatNumber };

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

const weekdayDateTimeOptions: Intl.DateTimeFormatOptions = {
  ...dateTimeOptions,
  weekday: "short",
};

type DateTimeFormat = "date" | "date-time" | "weekday-date-time";

function formatDateTime(value: string | number, format: DateTimeFormat) {
  return new Date(value).toLocaleDateString(locale, getDateTimeOptions(format));
}

function getDateTimeOptions(format: DateTimeFormat) {
  switch (format) {
    case "date":
      return dateOptions;

    case "date-time":
      return dateTimeOptions;

    case "weekday-date-time":
      return weekdayDateTimeOptions;

    default:
      const _never: never = format;
      return _never;
  }
}

function formatNumber(value: number) {
  return value.toLocaleString(locale);
}
