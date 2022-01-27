export { formatDateTime, formatNumber, formatUrl, setLocale };

let locale = "en-GB";

function setLocale(value: string) {
  locale = value;
}

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

const urlWithProtocol = /^https?:\/\//i;

function formatUrl(url: string) {
  return url.match(urlWithProtocol) ? url : `http://${url}`;
}
