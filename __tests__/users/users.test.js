var User = require('../../src/users/users');

describe('User Constructor Tests', function() {
  it('checks for an instance of the constructor', function() {
    var jon = new User();
    expect(jon instanceof User).toBeTruthy();
  });
});