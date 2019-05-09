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
  edit: function(name, quantity) {
    this.name = name;
    this.quantity = quantity;
    return this;
  }
}

module.exports = Book;