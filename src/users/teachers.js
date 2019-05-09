var db = require('../../helper/db');
var User = require('./users');
var inherit = require('../../helper/extend');


function Teacher(name) {
  User.call(this, name);
  this.role = 'teacher';
}

inherit(Teacher, User);


module.exports = Teacher;