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