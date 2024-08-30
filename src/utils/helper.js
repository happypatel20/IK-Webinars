// Functions to format the date
const getMonthDate = (date) => {
  const options = { month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
const getDay = (date) => {
  const options = { weekday: "long" };
  return date.toLocaleDateString("en-US", options);
};

// Function to get hours, minutes, and seconds from time
const getTime = (time) => {
  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedTime = hours % 12 || 12;
  return `${formattedTime}:${minutes} ${amPm}`;
};

// Fuction to get random colors
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export { getMonthDate, getDay, getTime, getRandomColor };
