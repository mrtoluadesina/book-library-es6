var db = require('../../db');
var User = require('../../src/users/users');

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
});