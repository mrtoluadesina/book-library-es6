var Book = require('../../src/books/books');

describe('Book Constructor Tests', function() {
  it('checks the id autoincrement if it works properly', function() {
    var got = new Book('A Clash of Kings', 5);
    expect(got.id).toBe(1);
  });

  it('checks that a book is created', function() {
    var got = new Book('A Game of Thrones', 20);
    expect(got).toEqual(expect.objectContaining({name: expect.stringMatching(/^[A-Za-z\s]+$/)}))
  });
  
  it('checks that a book is updated', function() {
    var got = new Book('A Feast of Crows', 3);
    expect(got.edit('A Feast of Crows', 1)).toEqual(expect.objectContaining({quantity: 1}));
  });
  
  it('checks that a book is deleted', function() {
    var got = new Book('A Feast of Crows', 3);
    expect(got.delete()).toBe('Book Deleted');
  });
});