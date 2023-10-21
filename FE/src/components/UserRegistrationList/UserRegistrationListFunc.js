export function formatDateToCustomFormat(inputDate, customFormat) {
  // Create a Date object from the input string
  let date = new Date(inputDate);

  // Get the individual components (day, month, year, hours, minutes, seconds)
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based, so add 1
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Add leading zeros to single-digit values
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // Replace placeholders in the custom format with date components
  let formattedDate = customFormat
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", year)
    .replace("hh", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);

  return formattedDate;
}
