var db = require('../../database/db');
var User = require('./users');
var Book = require('../books/books');
var inherit = require('../../helper/extend');

function Librarian(name, email, userType = 'Admin') {
  User.call(this, name, email, userType); // calls the constructor from the User Class to create the properties needed here
}

inherit(Librarian, User) // inherits from User Constructor so we can access the methods from User

Librarian.prototype.addBook = function(name, quantity) {
  var book = Book.prototype.create();
  book.name = name;
  book.quantity = quantity;
  db.books.push(book);
  return 'Book Created';
}

Librarian.prototype.updateBook = function(id, name, quantity) {
  return Book.prototype.edit(id, name, quantity)
}

Librarian.prototype.approveRequest = function(id) {
  return Book.prototype.processRequest(id)
}

module.exports = Librarian;