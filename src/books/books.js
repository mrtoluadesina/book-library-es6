var db = require('../../helper/db');
var id = 1;
function Book(name, quantity) {
  this.name = name;
  this.quantity = quantity;
  this.isActive = true;
  this.id = id;
  id++;
}

Book.prototype = {
  constructor: Book,
  create: function() {
    return new Book;
  },
  read: function(id) {
    for (var index = 0; index < db.books.length; index++) {
      if(db.books[index].id === id) { return db.books[index]; }
    } return 'No Such Book';
  },
  edit: function(name, quantity) {
    this.name = name;
    this.quantity = quantity;
    return this;
  },
  delete: function() {
    this.isActive = false;
    return 'Book Deleted';
  },
  search: function(name) {
    for (var index = 0; index < db.books.length; index++) {
      if (db.books[index].name === name && db.books[index].isActive === true) return db.books[index];
    } return 'Book not found!'
  },
  bookRequest: function(id, duration) {
    var bookName = Book.prototype.read(id).name;
    db.bookRequestLog.push({
      bookName, duration
    });
    return 'Request is being processed';
  }
}

module.exports = Book;