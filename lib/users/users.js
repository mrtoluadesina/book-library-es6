"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var db = _interopRequireWildcard(require("../../database/db"));

var _books = _interopRequireDefault(require("../books/books"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User(name, email, userType) {
    _classCallCheck(this, User);

    this.name = name;
    this.email = email;
    this.userType = userType || 'junior student';
    if (userType === 'teacher') this.userPriority = 3;
    if (userType === 'senior student') this.userPriority = 2;
    if (userType === 'junior student') this.userPriority = 1;
    this.isActive = true; // generates the UserId

    this.id = db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1;
    db.users.push(this);
  } // function that returns the details of a User 


  _createClass(User, [{
    key: "readUser",
    value: function readUser() {
      return this;
    } // function to update the User

  }, {
    key: "update",
    value: function update(name, email, userType) {
      this.name = name;
      this.email = email;
      this.userType = userType;
      return this;
    } // delete function - changes the active state to false

  }, {
    key: "delete",
    value: function _delete() {
      this.isActive = false;
      return 'User Deleted';
    } // function to lookup a user by the name

  }, {
    key: "search",
    value: function search(name) {
      for (var index = 0; index < db.users.length; index++) {
        if (db.users[index].name === name) {
          return db.users[index];
        }
      }
    } // function to search for a book - simple calls the actual function from the Book prototype

  }, {
    key: "bookLookUp",
    value: function bookLookUp(name) {
      return _books["default"].prototype.search(name);
    } // function a user calls to find a book by it's Id

  }, {
    key: "getBookById",
    value: function getBookById(id) {
      return _books["default"].prototype.read(id);
    } // Main function a User calls when borrowing a book

  }, {
    key: "requestBook",
    value: function requestBook(id, duration) {
      var userId = this.id;
      var userName = this.name;
      var userPriority = this.userPriority;
      return _books["default"].prototype.bookRequest(id, duration, userId, userName, userPriority);
    } // function to return a borrowed book

  }, {
    key: "returnBook",
    value: function returnBook(bookId) {
      return _books["default"].prototype.returnABook(bookId);
    }
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;