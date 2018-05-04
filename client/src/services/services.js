import HttpService from "./utility/httpService";
import UserService from "./userService";
import StorageService from "./utility/storageService";
import ProfileService from "./profileService";

const http = new HttpService();

export const storageService = new StorageService();
export const userService = new UserService(http);
export const profileService = new ProfileService(http);

