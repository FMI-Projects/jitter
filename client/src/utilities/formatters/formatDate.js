import moment from "moment";

export const getFullDate = date =>
  moment(date).format("MMMM Do YYYY, h:mm:ss a");

export const getUtcDate = date => moment.utc(date).format("MM/DD/YYYY");
