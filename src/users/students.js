var db = require('../../helper/db');
var inherit = require('../../helper/extend');
var User = require('../users/users');

function Student(name, level) {
  User.call(this, name);
  this.level = level | 'junior';
}

inherit(Student, User);

module.exports = Student;