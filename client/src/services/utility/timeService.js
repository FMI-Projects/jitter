import moment from "moment";

export default class TimeService {
  getUtcDate(date) {
    return moment.utc(date, "MM/DD/YYYY");
  }
}
