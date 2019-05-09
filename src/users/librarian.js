var db = require('../../helper/db');
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

module.exports = Librarian;