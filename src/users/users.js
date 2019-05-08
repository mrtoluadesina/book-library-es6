var db = require('../../db');

function User() {
  this.id = db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1;
}

User.prototype = {
  constructor: User,
  createUser: function(name) {
    this.name = name;
    db.users.push(this);
    return 'User Created';
  },
  readUser: function() {
    return this;
  }
}

module.exports = User;