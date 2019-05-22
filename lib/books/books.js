"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var db = _interopRequireWildcard(require("../../database/db"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var thisBookId = 1;

var Book =
/*#__PURE__*/
function () {
  function Book(name, quantity) {
    _classCallCheck(this, Book);

    this.name = name;
    this.quantity = quantity;
    this.isActive = true;
    this.id = thisBookId; // increments id so when a new Book is created id is  + 1

    thisBookId++;
  }

  _createClass(Book, [{
    key: "create",
    value: function create() {
      return new Book();
    }
  }, {
    key: "read",
    value: function read(id) {
      for (var index = 0; index < db.books.length; index++) {
        // checks if the id of the current item is same as the id from parameter
        if (db.books[index].id === id) return db.books[index];
      }

      return 'No Such Book';
    }
  }, {
    key: "edit",
    value: function edit(id, name, quantity) {
      var book = Book.prototype.read(id);
      book.name = name;
      book.quantity = quantity;
      return 'Book Updated';
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.isActive = false;
      return 'Book Deleted';
    }
  }, {
    key: "search",
    value: function search(name) {
      for (var index = 0; index < db.books.length; index++) {
        // checks if the name of the current item is same as the name from the parameter
        if (db.books[index].name === name && db.books[index].isActive === true) return db.books[index];
      }

      return 'Book not found!';
    }
  }, {
    key: "bookRequest",
    value: function bookRequest(bookId, duration, userId, userName, userPriority) {
      var bookName = Book.prototype.read(bookId).name;
      var time = String(new Date()).replace(/\sG.+/, '');
      var requestStatus = 'processing'; // Add the request Object to the bookRequestLog table

      db.bookRequestLog.push({
        bookId: bookId,
        bookName: bookName,
        time: time,
        duration: duration,
        userId: userId,
        userName: userName,
        userPriority: userPriority,
        requestStatus: requestStatus
      });
      return 'Your order is processing!';
    }
  }, {
    key: "processRequest",
    value: function processRequest() {
      // Sort the request table to make sure it handles the higher priority first
      db.bookRequestLog.sort(function (a, b) {
        return b.userPriority - a.userPriority;
      });

      for (var index = 0; index < db.bookRequestLog.length; index++) {
        // we first check to make sure it is still of a processing status
        if (db.bookRequestLog[index].requestStatus === 'processing') {
          var availableCopies = Number(Book.prototype.read(db.bookRequestLog[index].bookId).quantity);

          if (availableCopies > 0) {
            var borrowedBook = Book.prototype.read(db.bookRequestLog[index].bookId).name; // decrement the number of copies available by 1

            availableCopies -= 1; // call the edit method to update the details of the book with new quantity

            Book.prototype.edit(db.bookRequestLog[index].bookId, borrowedBook, availableCopies); // change status of request to completed

            db.bookRequestLog[index].requestStatus = 'completed'; // return 'Your order is now completed';
          } else {
            // change status of request to completed
            db.bookRequestLog[index].requestStatus = 'Book Taken'; // return 'Book Taken'
          }
        }
      }

      return 'Batch Processed';
    }
  }, {
    key: "returnABook",
    value: function returnABook(bookId) {
      for (var index = 0; index < db.books.length; index++) {
        if (db.books[index].id === bookId) {
          db.books[index].quantity += 1;
        }
      }

      return 'Book Returned';
    }
  }]);

  return Book;
}();

var _default = Book;
exports["default"] = _default;