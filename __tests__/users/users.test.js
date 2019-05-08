var db = require('../../db');
var User = require('../../src/users/users');

describe('User Constructor Tests', function() {
  it('checks the id autoincrement if it works properly', function() {
    var jon = new User();
    jon.createUser('snow');
    expect(jon.id).toBe(1);
  });

  it('checks for an instance of the constructor', function() {
    var jon = new User();
    expect(jon instanceof User).toBeTruthy();
  });

  it('checks if a user is created', function() {
    var snow = new User();
    expect(snow.createUser('jon')).toMatch('User Created');
  });
});