var db = require('../../helper/db');

function Book(name, quantity) {
  this.name = name;
  this.quantity = quantity;
  this.isActive = true;
  this.id = db.books.length > 0 ? db.books[db.books.length - 1].id + 1 : 1;
  db.books.push(this);
}

module.exports = Book;