var db = require('../../helper/db');
var Book = require('../../src/books/books');

describe('Book Constructor Tests', function() {
  it('checks the id autoincrement if it works properly', function() {
    var got = new Book('A Clash of Kings', 5);
    expect(got.id).toBe(1);
  });

  it('checks that a book is created', function() {
    var dbLength = db.books.length;
    console.log(dbLength);
    var got = new Book('A Game of Thrones', '20');
    console.log(db.books);
    expect(db.books.length).toBe(dbLength + 1);
  });
});