import * as db from '../../database/db';
var thisBookId = 1;

class Book {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
    this.isActive = true;
    this.id = thisBookId;
    // increments id so when a new Book is created id is  + 1
    thisBookId++;
  }

  create() {
    return new Book;
  }

  read(id) {
    for (let index = 0; index < db.books.length; index++) {
      // checks if the id of the current item is same as the id from parameter
      if (db.books[index].id === id) return db.books[index];  
    } return 'No Such Book';
  }

  edit(id, name, quantity) {
    let book = Book.prototype.read(id);
    book.name = name;
    book.quantity = quantity;
    return 'Book Updated';
  }

  delete() {
    this.isActive = false;
    return 'Book Deleted';
  }

  search(name) {
    for (var index = 0; index < db.books.length; index++) {
      // checks if the name of the current item is same as the name from the parameter
      if (db.books[index].name === name && db.books[index].isActive === true) return db.books[index]; 
    } return 'Book not found!'
  }

  bookRequest(bookId, duration, userId, userName, userPriority) {
    let bookName = Book.prototype.read(bookId).name;
    let time = String(new Date()).replace(/\sG.+/, '');
    let requestStatus = 'processing';
    // Add the request Object to the bookRequestLog table
    db.bookRequestLog.push({
      bookId, bookName, time, duration, userId, userName, userPriority, requestStatus
    }); 
    return 'Your order is processing!';
  }

  processRequest() {
    // Sort the request table to make sure it handles the higher priority first
    db.bookRequestLog.sort(function(a, b) {
      return b.userPriority - a.userPriority;
    });

    for (let index = 0; index < db.bookRequestLog.length; index++) {
      // we first check to make sure it is still of a processing status
      if (db.bookRequestLog[index].requestStatus === 'processing') {
        let availableCopies = Number(Book.prototype.read(db.bookRequestLog[index].bookId).quantity);
        if (availableCopies > 0) {
          let borrowedBook = Book.prototype.read(db.bookRequestLog[index].bookId).name;
          // decrement the number of copies available by 1
          availableCopies -= 1; 
          // call the edit method to update the details of the book with new quantity
          Book.prototype.edit(db.bookRequestLog[index].bookId, borrowedBook, availableCopies); 
          // change status of request to completed
          db.bookRequestLog[index].requestStatus = 'completed'; 
          // return 'Your order is now completed';
        } else {
          // change status of request to completed
          db.bookRequestLog[index].requestStatus = 'Book Taken'; 
          // return 'Book Taken'
        } 
      } 
    } 
    return 'Batch Processed';
  }

  returnABook(bookId) {
    for (let index = 0; index < db.books.length; index++) {
      if (db.books[index].id === bookId) {
        db.books[index].quantity += 1;
      }
    } return 'Book Returned';
  }
}

export default Book;