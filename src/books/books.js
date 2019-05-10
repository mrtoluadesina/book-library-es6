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
  bookRequest: function(id, duration, userId, userName, userPriority) {
    var bookName = Book.prototype.read(id).name;
    var time = String(new Date()).replace(/\sG.+/, '');
    var requestStatus = 'processing';
    db.bookRequestLog.push({
      bookName, time, duration, userId, userName, userPriority, requestStatus
    }); 
    return 'Your order is processing!';
  },
  processRequest: function(){
    var availableCopies = Book.prototype.read(id).quantity;
    for (var index = 0; index < db.bookRequestLog.length; index++) {
      if (db.bookRequestLog[index].availableCopies > 0) {
        db.bookRequestLog[index].availableCopies -= 1;
        db.bookRequestLog[index].requestStatus = 'processed';
        return 'Thanks for getting a book from us, we are expecting it back in ' + db.bookRequestLog[index].duration + ' days';
      } else {
        return 'Book Taken'
      } 
    }
  }
}

module.exports = Book;