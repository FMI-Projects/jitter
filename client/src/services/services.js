import HttpService from "./utility/httpService";
import UserService from "./userService";
import StorageService from "./utility/storageService";
import ProfileService from "./profileService";
import PostsService from "./postsService";

const http = new HttpService();

export const storageService = new StorageService();
export const userService = new UserService(http);
export const profileService = new ProfileService(http);
export const postsService = new PostsService(http);
