var db = require('../../db');
var User = require('../users/users');

function Teacher(name) {
  User.call(this, name);
  
}

module.exports = Teacher;