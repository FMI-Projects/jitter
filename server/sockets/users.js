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
    const user = this.getUserBySocketId(socketId);
    if (user) {
      this.users = this.users.filter(u => u.socketId !== socketId);
    }
    return user;
  }

  getUserBySocketId(socketId) {
    return this.users.find(u => u.socketId === socketId);
  }

  getUserByUserId(userId) {
    return this.users.find(u => u.userId === userId);
  }
}

module.exports = Users;
