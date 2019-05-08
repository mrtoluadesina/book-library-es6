var db = require('../../db');

function User(name) {
  this.name = name;
  this.isActive = true;
  this.id = db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1;
  db.users.push(this);
}

User.prototype = {
  constructor: User,
  readUser: function() {
    return this;
  },
  update: function(name) {
    this.name = name;
    return this;
  },
  delete: function() {
    this.isActive = false;
    return 'User Deleted';
  }
}

module.exports = User;