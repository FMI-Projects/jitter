import HttpService from "./httpService";
import PlaceholderService from "./placeholderService";

const baseUrl = "placeholderBaseUrl";

const http = new HttpService(baseUrl);

export default {
  placeholderService: new PlaceholderService(http)
};
