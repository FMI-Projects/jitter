import HttpService from "./utility/httpService";
import UserService from "./userService";
import StorageService from "./utility/storageService";
import ProfileService from "./profileService";
import PostService from "./postService";
import ImageService from "./imageService";
import TimeService from "./utility/timeService";
import CommentService from "./commentService";

const http = new HttpService();

export const timeService = new TimeService();
export const storageService = new StorageService();
export const userService = new UserService(http);
export const profileService = new ProfileService(http);
export const postService = new PostService(http);
export const imageService = new ImageService(http);
export const commentService = new CommentService(http);
