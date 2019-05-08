var db = require('../../db');
var User = require('../../src/users/users');

describe('User Constructor Tests', function() {
  it('checks the id autoincrement if it works properly', function() {
    var jon = new User();
    jon.createUser('snow');
    expect(jon.id).toBe(1);
  });

  it('checks for an instance of the constructor', function() {
    var snow = new User();
    expect(snow instanceof User).toBeTruthy();
  });

  it('checks if a user is created', function() {
    var jon = new User();
    expect(jon.createUser('jon')).toMatch('User Created');
  });

  it('checks if a user can read his details', function() {
    var arya = new User();
    var expected = {'name': expect.stringMatching(/^[a-z]+$/i)};
    arya.createUser('stark');
    expect(arya.readUser()).toEqual(expect.objectContaining({'name': 'stark'}));
    expect(arya.readUser()).toEqual(expect.objectContaining(expected));
  });

  it('checks if the users details gets updated', function() {
    
  })
});