import {createFormAction} from "redux-form-saga";

export const login = createFormAction("LOGIN");
export const register = createFormAction("REGISTER");
export const userProfilePatch = createFormAction("USER_PROFILE_PATCH");
export const userProfilePicture = createFormAction("USER_PROFILE_PICTURE");
export const postCreate = createFormAction("POST_CREATE");
export const postUpdate = createFormAction("POST_UPDATE");
