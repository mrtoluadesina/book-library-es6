var db = require('../../helper/db');
var Book = require('../../src/books/books');
var User = require('../../src/users/users');
var Librarian = require('../../src/users/librarian');

describe('User Constructor Tests', function() {
  it('checks the id autoincrement if it works properly', function() {
    var jon = new User('snow', 'jon@winterfell.com');
    expect(jon.id).toBe(1);
  });

  it('checks if a user is created from the constructor', function() {
    var snow = new User('jon', 'jon@winterfell.com');
    expect(snow instanceof User).toBeTruthy();
  });

  it('checks if a user can read his details', function() {
    var arya = new User('stark', 'stark@winterfell');
    var expected = {'name': expect.stringMatching(/^[a-z]+$/i)};
    expect(arya.readUser()).toEqual(expect.objectContaining({'name': 'stark'}));
    expect(arya.readUser()).toEqual(expect.objectContaining(expected));
  });

  it('checks if the users details gets updated', function() {
    var arya = new User('stark', 'stark@winterfell.com');
    expect(arya.update('tyron', 'stark@winterfell.com', 'senior student')).toEqual(expect.objectContaining({'name': expect.stringMatching(/^tyron$/)}));
  });

  it('checks if the user gets deleted', function() {
    var cersei = new User('lannister', 'cersei@winterfell.com', 'senior student');
    expect(cersei.delete()).toBe('User Deleted');
  });

  it('checks that a user is searched and found', function() {
    var ser = new User('brienne', 'serb@winterfell.com', 'senior student');
    expect(ser.search('brienne')).toEqual(expect.objectContaining({'name': expect.stringMatching(/^brienne$/), 'userType': 'senior student'}));
  });
});

describe('Student Role Tests', function() {
  
})

describe('Teacher Role Tests', function() {
  it('checks if a teacher can read his details', function() {
    var sansa = new User('sansa', 'sansa@winterfell.com', 'teacher');
    var expected = {'name': expect.stringMatching(/^[a-z]+$/i)};
    expect(sansa.readUser()).toEqual(expect.objectContaining({'name': 'sansa'}));
    expect(sansa.readUser()).toEqual(expect.objectContaining(expected));
  });
});

describe('Librarian Constructor Tests', function() {
  it('checks for an instance of the librarian class', function() {
    var admin = new Librarian('Samwell', 'tarly@winterfell.com');
    expect(admin instanceof Librarian).toBeTruthy();
  });
  
  it('checks that a librarian can add a book', function() {
    var admin = new Librarian('Tarly', 'samwell@winterfell.com');
    var length = db.books.length;
    expect(admin.addBook('A Dance with Dragons', '3')).toBe('Book Created');
    expect(db.books.length).toEqual(length + 1);
  });
});

describe('Library Method Tests', function() {
  it('checks that a book searched by a user is found if Active', function() {
    var edaard = new User('Edaard', 'edaard@winterfell.com', 'teacher');
    expect(edaard.bookLookUp('A Dance with Dragons')).toHaveProperty('isActive', true);
    expect(edaard.bookLookUp('A Dance with Dragons')).toHaveProperty('quantity', '3');
    expect(edaard.bookLookUp()).toMatch('Book not ');
  });
});