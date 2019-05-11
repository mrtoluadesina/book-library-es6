var db = require('../../database/db');
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
    // Sort the request table to make sure it handles the higher priority first
    db.bookRequestLog.sort(function(a, b) {
      return b.userPriority - a.userPriority;
    });
    return 'Your order is processing!';
  },
  // function to process request in the request log table
  processRequest: function(id) {
    for (var index = 0; index < db.bookRequestLog.length; index++) {
      // since there was no auto incrementing id for book requests, the indexof each object is used to find the request.
      // we first check to know if the request has been completed previously
      if ((db.bookRequestLog.indexOf(db.bookRequestLog[index]) + 1) === id && db.bookRequestLog[index].requestStatus === 'completed') {
        return 'Order completed previously';
      }
      // we also check to make sure it is still of a processing status
      if ((db.bookRequestLog.indexOf(db.bookRequestLog[index]) + 1) === id && db.bookRequestLog[index].requestStatus === 'processing') {
        var availableCopies = Book.prototype.read(db.bookRequestLog[index].bookId).quantity;
        if (availableCopies > 0) {
          var borrowedBook = Book.prototype.search(db.bookRequestLog[index].bookName)
          availableCopies -= 1; // decrement the number of copies available by 1
          Book.prototype.edit(borrowedBook, availableCopies); // call the edit method to update the details of the book with new quantity
          db.bookRequestLog[index].requestStatus = 'completed'; // change status of request to completed
          return 'Your order is now completed';
        } else {
          db.bookRequestLog[index].requestStatus = 'completed'; // change status of request to completed
          return 'Book Taken'
        } 
      }
    } 
  }
}
module.exports = Book;