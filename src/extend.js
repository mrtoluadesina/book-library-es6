function extend(child, parent) {
  child.prototype = Object.create(parent.prototype);
}

module.exports = extend;