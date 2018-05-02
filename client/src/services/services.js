import HttpService from "./utility/httpService";
import UserService from "./userService";
import StorageService from "./utility/storageService";

const http = new HttpService();

export const storageService = new StorageService();
export const userService = new UserService(http);
