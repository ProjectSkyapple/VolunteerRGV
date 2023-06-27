export const toADMonthDayDateString = (isoDate: string) => {
  let dateObject = new Date(isoDate);
  return dateObject
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase();
};

export const toADHourMinuteTimeString = (isoDate: string) => {
  let dateObject = new Date(isoDate);
  return dateObject
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })
    .toUpperCase();
};

export const requireImageBackground = (imageBackground: string) => {
  switch (imageBackground) {
    case "1":
      return require("../../assets/1.jpg");
    case "2":
      return require("../../assets/2.jpg");
    case "3":
      return require("../../assets/3.jpg");
    case "4":
      return require("../../assets/4.jpg");
    case "5":
      return require("../../assets/5.jpg");
  }
};
