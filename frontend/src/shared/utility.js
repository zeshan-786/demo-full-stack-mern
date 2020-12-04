import * as moment from "moment";

export const updateObject = (oldObject, updateProps) => {
  return {
    ...oldObject,
    ...updateProps,
  };
};

export const formatDateTime = (date) => {
  return moment(date).format("MMM DD YYYY, h:mm:ss a");
};

export const formatDate = (date) => {
  return moment(date).format("MMM DD YYYY");
};

export const mommentFormatDate = (date, format) => {
  return moment(date).format(format);
};

export const _calculateAge = (birthday) => {
  // birthday is a date
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  const years = ageDate.getUTCFullYear() - 1970;
  const month = ageDate.getUTCMonth();
  const days = ageDate.getUTCDay();
  // const value =  (ageDifMs/31540000000).toFixed(2)
  // return Math.abs(value);
  return `Years(s) ${Math.abs(years)} & Month(s) ${month} & Day(s) ${days}`;
};

export const backendURL = "http://localhost:3000";
