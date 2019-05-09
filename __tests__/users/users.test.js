var db = require('../../helper/db');
var Book = require('../../src/books/books');
var User = require('../../src/users/users');
var Student = require('../../src/users/students');
var Teacher = require('../../src/users/teachers');
var Librarian = require('../../src/users/librarian');

describe('User Constructor Tests', function() {
  it('checks the id autoincrement if it works properly', function() {
    var jon = new User('snow');
    expect(jon.id).toBe(1);
  });

  it('checks if a user is created from the constructor', function() {
    var snow = new User('jon');
    expect(snow instanceof User).toBeTruthy();
  });

  it('checks if a user can read his details', function() {
    var arya = new User('stark');
    var expected = {'name': expect.stringMatching(/^[a-z]+$/i)};
    expect(arya.readUser()).toEqual(expect.objectContaining({'name': 'stark'}));
    expect(arya.readUser()).toEqual(expect.objectContaining(expected));
  });

  it('checks if the users details gets updated', function() {
    var arya = new User('stark');
    expect(arya.update('tyron')).toEqual(expect.objectContaining({'name': expect.stringMatching(/^tyron$/)}));
  });

  it('checks if the user gets deleted', function() {
    var cersei = new User('lannister');
    expect(cersei.delete()).toBe('User Deleted');
  });

  it('checks that a user is searched and found', function() {
    var ser = new User('brienne');
    expect(ser.search('brienne')).toEqual(expect.objectContaining({'name': expect.stringMatching(/^brienne$/)}));
  });
});

describe('Student Constructor Tests', function() {
  it('checks for an instance of the class', function() {
    var littleFinger = new Student('little finger');
    expect(littleFinger instanceof Student).toBeTruthy();
  })
})

describe('Teacher Constructor Tests', function() {
  it('checks for an instance of class', function() {
    var jamie = new Teacher('Jamie');
    expect(jamie instanceof Teacher).toBeTruthy();
  });

  it('checks if a teacher can read his details', function() {
    var sansa = new Teacher('stark');
    var expected = {'name': expect.stringMatching(/^[a-z]+$/i)};
    expect(sansa.readUser()).toEqual(expect.objectContaining({'name': 'stark'}));
    expect(sansa.readUser()).toEqual(expect.objectContaining(expected));
  });
});

describe('Librarian Constructor Tests', function() {
  it('checks for an instance of the librarian class', function() {
    var admin = new Librarian('Samwell');
    expect(admin instanceof Librarian).toBeTruthy();
  });
  
  it('checks that a librarian can add a book', function() {
    var admin = new Librarian('Tarly');
    var length = db.books.length;
    expect(admin.addBook('A Dance with Dragons', '3')).toBe('Book Created');
    expect(db.books.length).toEqual(length + 1)
    console.log(db.books)
  });
});