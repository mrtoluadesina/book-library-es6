var db = require('../../database/db');
var User = require('./users');
var Book = require('../books/books');
var inherit = require('../../helper/extend');

function Librarian(name, email, userType = 'Admin') {
  User.call(this, name, email, userType);
}

inherit(Librarian, User)

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