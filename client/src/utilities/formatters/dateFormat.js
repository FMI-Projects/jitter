import moment from "moment";

export const formatDate = date =>
  moment(date).format("MMMM Do YYYY, h:mm:ss a");
