var db = require('../../helper/db');
var User = require('./users');
var Book = require('../books/books');
var inherit = require('../../helper/extend');

function Librarian(name) {
  User.call(this, name);
  this.role = 'Admin';
}

inherit(Librarian, User)

Librarian.prototype.addBook = function() {
  
}

module.exports = Librarian;