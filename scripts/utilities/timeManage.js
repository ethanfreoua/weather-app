const daysArray = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let options = { weekday: "long" };
let today = new Date().toLocaleDateString("en-En", options);
let orderDay = daysArray
  .slice(daysArray.indexOf(today))
  .concat(daysArray.slice(0, daysArray.indexOf(today)));


export default orderDay;