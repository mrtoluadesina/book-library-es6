function inherit(child, parent) {
  child.prototype = Object.create(parent.prototype);
}

module.exports = inherit;