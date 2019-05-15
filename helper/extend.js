// This is the file to implement inheritance - created as a function to be called when needed.
function inherit(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

module.exports = inherit;