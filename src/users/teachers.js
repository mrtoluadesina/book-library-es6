var db = require('../../db');
var inherit = require('../extend');
var User = require('../users/users');

function Teacher(name) {
  User.call(this, name);
  this.role = 'teacher';
}

inherit(Teacher, User);

module.exports = Teacher;