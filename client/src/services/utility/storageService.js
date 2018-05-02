const tokenKey = "token";
const userIdKey = "userId";

export default class StorageService {
  storeUser(token, userId) {
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(userIdKey, userId);
  }

  removeUser() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userIdKey);
  }

  getUser() {
    const token = localStorage.getItem(tokenKey);
    const userId = localStorage.getItem(userIdKey);

    return {
      token,
      userId
    };
  }
}
