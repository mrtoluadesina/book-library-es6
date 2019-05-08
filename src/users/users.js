var db = require('../../db');

function User(name) {
  this.name = name;
  this.id = db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1;
  db.users.push(this);
}

User.prototype = {
  constructor: User,
  readUser: function() {
    return this;
  }
}

module.exports = User;