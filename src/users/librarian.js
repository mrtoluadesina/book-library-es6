import * as db from '../../database/db';
import User from './users';
import Book from '../books/books'

class Librarian extends User {
  constructor(name, email) {
    super(name, email);
    this.userType = 'admin';
  }

  // function to add book to the books database
  addBook(name, quantity) {
    let book = Book.prototype.create();
    book.name = name;
    book.quantity = quantity;
    db.books.push(book);
    return 'Book Created';
  }

  // function to update a book in the books database
  updateBook(id, name, quantity) {
    return Book.prototype.edit(id, name, quantity);
  }

  // function to approve a book request
  approveRequest() {
    return Book.prototype.processRequest();
  }
}

export default Librarian;