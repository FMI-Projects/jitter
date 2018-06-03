class Users {
  constructor() {
    this.users = [];
  }

  addUser(userId, socketId) {
    const user = { userId, socketId };
    this.users.push(user);
  }

  removeUser(socketId) {
    const userId = this.getUserUserId(socketId);
    if (userId) {
      this.users = this.users.filter(u => u.socketId !== socketId);
    }
    return userId;
  }

  getUserSocketIds(userId) {
    const users = this.users.filter(u => u.userId === userId);
    if (users.length) {
      return users.map(u => u.socketId);
    }
    return null;
  }

  getUserUserId(socketId) {
    const user = this.users.find(u => u.socketId === socketId);
    if (user) {
      return user.userId;
    }
    return null;
  }
}

module.exports = Users;
