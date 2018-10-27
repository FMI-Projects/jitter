import moment from "moment";

export default class TimeService {
  convertToUtcDate(date, format) {
    return moment.utc(date, format);
  }
}
