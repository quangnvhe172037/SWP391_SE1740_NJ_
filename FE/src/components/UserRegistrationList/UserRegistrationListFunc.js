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

export function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function convertToYYYYMMDD(inputDate) {
  // Split the input date string into date and time parts
  const [datePart, timePart] = inputDate.split(" ");

  // Split the date part into day, month, and year
  const [day, month, year] = datePart.split("/");

  // Reformat the date part to "yyyy-mm-dd"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
