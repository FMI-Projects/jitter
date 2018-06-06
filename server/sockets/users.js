class Users {
  constructor() {
    this.userBySocket = {};
    this.socketsByUser = {};
  }

  addUser(userId, socketId) {
    this.userBySocket[socketId] = userId;

    const userSockets = this.socketsByUser[userId];
    if (!userSockets) {
      this.socketsByUser[userId] = new Set([socketId]);
    } else {
      this.socketsByUser[userId].add(socketId);
    }
  }

  removeUser(socketId) {
    const userId = this.userBySocket[socketId];

    if (userId) {
      delete this.userBySocket[socketId];
      this.socketsByUser[userId].delete(socketId);
    }

    return userId;
  }

  isUserOnline(userId) {
    return this.socketsByUser[userId] && this.socketsByUser[userId].length > 0;
  }

  getUserSocketIds(userId) {
    return this.socketsByUser[userId]
      ? this.socketsByUser[userId].values()
      : [];
  }

  getUserUserId(socketId) {
    return this.userBySocket[socketId];
  }
}

module.exports = Users;
