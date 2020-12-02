export const updateObject = ( oldObject, updateProps  ) => {
    return {
        ...oldObject,
        ...updateProps
    }
}

export const formatDateTime = (date) => {
    return Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: 'numeric', minute: 'numeric', second: 'numeric', 
      timeZone: 'America/Los_Angeles',
    }).format(new Date(date));
};

export const formatDate = (date) => {
    return Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date(date));
};

export const formatDateNumeric = (date) => {
    return Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date(date));
};

export const _calculateAge = (birthday) => { // birthday is a date
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  const years = ageDate.getUTCFullYear() - 1970
  const month = ageDate.getUTCMonth()
  const days = ageDate.getUTCDay()
  // const value =  (ageDifMs/31540000000).toFixed(2)
  // return Math.abs(value);
  return `Years(s) ${Math.abs(years)} & Month(s) ${month} & Day(s) ${days}`
}

export const backendURL = 'http://localhost:3000'