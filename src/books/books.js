var db = require('../../helper/db');
var id = 1;

function Book(name, quantity) {
  this.name = name;
  this.quantity = quantity;
  this.isActive = true;
  this.id = id;
  id++; // increments id so when a new Book is created id is  + 1
}

Book.prototype = {
  constructor: Book,
  create: function() {
    return new Book;
  },
  read: function(id) {
    for (var index = 0; index < db.books.length; index++) {
      if(db.books[index].id === id) return db.books[index];  // checks if the id of the current item is same as the id from parameter
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
      if (db.books[index].name === name && db.books[index].isActive === true) return db.books[index]; // checks if the name of the current item is same as the name from the parameter
    } return 'Book not found!'
  },
  // function for requesting a book
  bookRequest: function(bookId, duration, userId, userName, userPriority) {
    var bookName = Book.prototype.read(bookId).name;
    var time = String(new Date()).replace(/\sG.+/, '');
    var requestStatus = 'processing';
    // Add the request Object to the bookRequestLog table
    db.bookRequestLog.push({
      bookId, bookName, time, duration, userId, userName, userPriority, requestStatus
    }); 

    db.bookRequestLog.sort(function(a, b) {
      return b.userPriority - a.userPriority;
    });
    return 'Your order is processing!';
  },
  processRequest: function(id) {
    for (var index = 0; index < db.bookRequestLog.length; index++) {
      if ((db.bookRequestLog.indexOf(db.bookRequestLog[index]) + 1) === id) {
        var availableCopies = Book.prototype.read(db.bookRequestLog[index].bookId).quantity;
        if (availableCopies > 0) {
          var borrowedBook = Book.prototype.search(db.bookRequestLog[index].bookName)
          availableCopies -= 1;
          Book.prototype.edit(borrowedBook, availableCopies);
          db.bookRequestLog[index].requestStatus = 'processed';
          return 'Thanks for getting a book from us, we are expecting it back in ' + db.bookRequestLog[index].duration + ' days';
        } else {
          return 'Book Taken'
        } 
      }
    }
  }
}
module.exports = Book;