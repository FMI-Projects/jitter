class Users {
  constructor() {
    this.users = [];
  }

  addUser(userId, socketId) {
    const user = { userId, socketId };
    this.users.push(user);
    return user;
  }

  removeUser(socketId) {
    const userId = this.getUserUserId(socketId);
    if (userId) {
      this.users = this.users.filter(u => u.socketId !== socketId);
    }
    return userId;
  }

  getUserSocketId(userId) {
    const user = this.users.find(u => u.userId === userId);
    if (user) {
      return user.socketId;
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
