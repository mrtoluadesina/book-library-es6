import * as db from '../../database/db';
let User = require('../../src/users/users');
let Librarian = require('../../src/users/librarian');

describe('User Constructor Tests', () => {
  it('checks the id autoincrement if it works properly', () => {
    let jon = new User('snow', 'jon@winterfell.com');
    expect(jon.id).toBe(1);
  });

  it('checks if a user is created from the constructor', () => {
    let snow = new User('jon', 'jon@winterfell.com');
    expect(snow instanceof User).toBeTruthy();
  });

  it('checks if a user can read his details', () => {
    let arya = new User('stark', 'stark@winterfell');
    let expected = {'name': expect.stringMatching(/^[a-z]+$/i)};
    expect(arya.readUser()).toEqual(expect.objectContaining({'name': 'stark'}));
    expect(arya.readUser()).toEqual(expect.objectContaining(expected));
  });

  it('checks if the users details gets updated', () => {
    let arya = new User('stark', 'stark@winterfell.com');
    expect(arya.update('tyron', 'stark@winterfell.com', 'senior student')).toEqual(expect.objectContaining({'name': expect.stringMatching(/^tyron$/)}));
  });

  it('checks if the user gets deleted', () => {
    let cersei = new User('lannister', 'cersei@winterfell.com', 'senior student');
    expect(cersei.delete()).toBe('User Deleted');
  });

  it('checks that a user is searched and found', () => {
    let ser = new User('brienne', 'serb@winterfell.com', 'senior student');
    expect(ser.search('brienne')).toEqual(expect.objectContaining({'name': expect.stringMatching(/^brienne$/), 'userType': 'senior student'}));
  });
});

describe('Teacher Role Tests', () => {
  it('checks if a teacher can read his details', () => {
    let sansa = new User('sansa', 'sansa@winterfell.com', 'teacher');
    let expected = {'name': expect.stringMatching(/^[a-z]+$/i)};
    expect(sansa.readUser()).toEqual(expect.objectContaining({'name': 'sansa'}));
    expect(sansa.readUser()).toEqual(expect.objectContaining(expected));
  });
});

describe('Librarian Constructor Tests', () => {
  it('checks for an instance of the librarian class', () => {
    let admin = new Librarian('Samwell', 'tarly@winterfell.com');
    expect(admin instanceof Librarian).toBeTruthy();
  });
  
  it('checks that a librarian can add a book', () => {
    let admin = new Librarian('Tarly', 'samwell@winterfell.com');
    let length = db.books.length;
    expect(admin.addBook('A Dance with Dragons', '1')).toBe('Book Created');
    expect(db.books.length).toEqual(length + 1);
    expect(admin.addBook('A Storm of Swords', '2')).toBe('Book Created');
    expect(db.books.length).toEqual(length + 2);
    expect(admin.addBook('A Clash of Kings', '1')).toBe('Book Created');
    expect(db.books.length).toEqual(length + 3);
  });
  
  it('checks that a librarian is able to update a book', () => {
    let admin = new Librarian('Tarly', 'samwell@winterfell.com');
    expect(admin.addBook('A Clash of Thrones', 1)).toBe('Book Created');
    expect(admin.updateBook(4, 'A Clash of Thrones', 4)).toBe('Book Updated');
  });
});

describe('Library Method Tests', () => {
  it('checks that a book searched by a user is found if Active', () => {
    let edaard = new User('Edaard', 'edaard@winterfell.com', 'teacher');
    expect(edaard.bookLookUp('A Dance with Dragons')).toHaveProperty('isActive', true);
    expect(edaard.bookLookUp('A Dance with Dragons')).toHaveProperty('quantity', '1');
    expect(edaard.bookLookUp()).toMatch('Book not ');
  });
  
  it('checks that a book can be read by its ID', () => {
    let admin = new Librarian('Tarly', 'samwell@winterfell.com');
    expect(admin.getBookById()).toBe('No Such Book');
    expect(admin.getBookById(1)).toEqual(expect.objectContaining({name: 'A Dance with Dragons'}));
  });
  
  it('checks that a book is added to the book request table when requested', () => {
    let bobby = new User('Bobby', 'bobby@winterfell.com', 'junior student');
    let edaard = new User('Edaard', 'edaard@winterfell.com', 'teacher');
    let uche = new User('Uche', 'uche@winterfell.com', 'junior student');
    let rukky = new User('Rukky', 'edaard@winterfell.com', 'teacher');
    expect(rukky.requestBook(3, 2)).toBe('Your order is processing!');
    expect(bobby.requestBook(2, 5)).toMatch('Your or');
    expect(edaard.requestBook(1, 5)).toMatch('Your or');
    expect(uche.requestBook(2, 5)).toMatch('Your or');
    expect(rukky.requestBook(1, 5)).toBe('Your order is processing!');
  });

  it('checks that all books in the queue is processed', () => {
    let admin = new Librarian('Samwell', 'samwell@housetargeryan.com');
    expect(admin.approveRequest()).toMatch('Batch Processed');
  })

  it('checks that the status of a book request becomes completed when approved and book is available', () => {
    let admin = new Librarian('Tarly', 'tarly@baratheon.com');
    let hound = new User('hound', 'hound@winterfell.com', 'senior student');
    expect(hound.requestBook(4, 5)).toMatch('Your order is processing');
    let lastEntryInDb = db.bookRequestLog[db.bookRequestLog.length - 1];
    expect(admin.approveRequest()).toMatch('Batch Process');
    expect(lastEntryInDb.requestStatus).toBe('completed');
  });

  it('checks that the status of a book is changed to book taken when available copies of a book is zero', () => {
    let admin = new Librarian('Samwell', 'tarly@kinginthenorth.com');
    let khaleesi = new User('Daenerys', 'Daenerys@motherofdragons.com');
    expect(khaleesi.requestBook(3, 3)).toMatch('Your order is processing');
    let lastEntryInDb = db.bookRequestLog[db.bookRequestLog.length - 1];
    expect(admin.approveRequest()).toMatch('Batch Process');
    expect(lastEntryInDb.requestStatus).toBe('Book Taken');
  });
  
  it('checks that a book is returned when a user is done with it and that the quantity updates', () => {
    let khaleesi = new User('Daenerys', 'Daenerys@motherofdragons.com');
    let quantityOfBook = db.books[2].quantity;
    expect(khaleesi.returnBook(3)).toMatch('Book Ret');
    expect(db.books[2].quantity).toBe(quantityOfBook + 1);
  });
});