const formatDate = (
  date: Date | undefined,
  year: "numeric" | "2-digit" | undefined = "2-digit"
) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short", // Short month name (e.g., Aug)
    day: "numeric", // Numeric day of the month (e.g., 4)
    hour: "numeric", // Numeric hour (e.g., 1)
    minute: "numeric", // Numeric minute (e.g., 30)
    second: undefined,
    hour12: true, // 12-hour clock format (e.g., am/pm)
    year,
  }).format(date);

  return formattedDate;
};

export default formatDate;
