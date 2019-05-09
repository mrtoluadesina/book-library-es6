var db = require('../../helper/db');
var Book = require('../books/books');

function User(name) {
  this.name = name;
  this.role = 'student';
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
  },
  search: function(name) {
    for (var index = 0; index < db.users.length; index++) {
      if (db.users[index].name === name) {
        return db.users[index];
      }
    }
  },
  bookLookUp: function(name) {
    return Book.prototype.search(name);
  }
}

module.exports = User;