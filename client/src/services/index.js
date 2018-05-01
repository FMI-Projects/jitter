import axios from "axios";

import HttpService from "./httpService";
import PlaceholderService from "./placeholderService";

const baseUrl = "placeholderBaseUrl";

const http = new HttpService(axios, baseUrl);

export default {
  placeholderService: new PlaceholderService(http)
};
