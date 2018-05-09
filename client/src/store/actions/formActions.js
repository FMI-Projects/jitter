import { createFormAction } from "redux-form-saga";

export const login = createFormAction("LOGIN");
export const register = createFormAction("REGISTER");
export const profilePatch = createFormAction("PROFILE_PATCH");
export const profilePicture = createFormAction("PROFILE_PICTURE");
