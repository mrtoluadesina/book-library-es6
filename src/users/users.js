var db = require('../../database/db');
var Book = require('../books/books');

function User(name, email, userType) {
  this.name = name;
  this.email = email;
  this.userType = userType || 'junior student';
  if (userType === 'teacher') this.userPriority = 3;
  if (userType === 'senior student') this.userPriority = 2;
  if (userType === 'junior student') this.userPriority = 1;
  this.isActive = true;
  // generates the UserId
  this.id = db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1; 
  db.users.push(this);
}

// User prototype created as an object literal
User.prototype = {
  constructor: User,

  // function that returns the details of a User 
  readUser: function () {
    return this;
  },

  // function to update the User
  update: function (name, email, userType) {
    this.name = name;
    this.email = email;
    this.userType = userType;
    return this;
  },

  // delete function - changes the active state to false
  delete: function () {
    this.isActive = false;
    return 'User Deleted';
  },

  // function to lookup a user by the name
  search: function (name) {
    for (var index = 0; index < db.users.length; index++) {
      if (db.users[index].name === name) {
        return db.users[index];
      }
    }
  },

  // function to search for a book - simple calls the actual function from the Book prototype
  bookLookUp: function (name) {
    return Book.prototype.search(name);
  },

  // function a user calls to find a book by it's Id
  getBookById: function (id) {
    return Book.prototype.read(id);
  },
  
  // Main function a User calls when borrowing a book
  requestBook: function (id, duration) {
    var userId = this.id;
    var userName = this.name;
    var userPriority = this.userPriority;
    return Book.prototype.bookRequest(id, duration, userId, userName, userPriority);
  },

  returnBook: function(bookId) {
    return Book.prototype.returnABook(bookId);
  }
}

module.exports = User;