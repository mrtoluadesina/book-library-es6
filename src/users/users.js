var db = require('../../db');

function User() {
  this.id = db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1;
}



module.exports = User;