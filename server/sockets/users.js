class Users {
  constructor() {
    this.users = [];
  }

  addUser(id) {
    const user = { id };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(u => u.id !== id);
    }
    return user;
  }

  getUser(id) {
    return this.users.find(u => u.id === id);
  }
}

module.exports = Users;
