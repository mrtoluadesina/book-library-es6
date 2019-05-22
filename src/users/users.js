// var db = require('../../database/db');
import * as db from '../../database/db';
import Book from '../books/books';
// var Book = require('../books/books');

class User {
  constructor (name, email, userType) {
    this.name = name;
    this.email = email;
    this.userType = userType || 'junior student';
    if (userType === 'teacher') this.userPriority = 3;
    if (userType === 'senior student') this.userPriority = 2;
    if (userType === 'junior student') this.userPriority = 1;
    this.isActive = true;
    // generates the UserId
    this.id = db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1; 
    db.users.push(this);
  }

  // function that returns the details of a User 
  readUser() {
    return this;
  }

  // function to update the User
  update(name, email, userType) {
    this.name = name;
    this.email = email;
    this.userType = userType;
    return this;
  }

  // delete function - changes the active state to false
  delete() {
    this.isActive = false;
    return 'User Deleted';
  }

  // function to lookup a user by the name
  search(name) {
    for (let index = 0; index < db.users.length; index++) {
      if (db.users[index].name === name) {
        return db.users[index];
      }
    }
  }

  // function to search for a book - simple calls the actual function from the Book prototype
  bookLookUp(name) {
    return Book.prototype.search(name);
  }

  // function a user calls to find a book by it's Id
  getBookById(id) {
    return Book.prototype.read(id);
  }

  // Main function a User calls when borrowing a book
  requestBook(id, duration) {
    let userId = this.id;
    let userName = this.name;
    let userPriority = this.userPriority;
    return Book.prototype.bookRequest(id, duration, userId, userName, userPriority);
  }

  // function to return a borrowed book
  returnBook(bookId) {
    return Book.prototype.returnABook(bookId);
  }

}

export default User;