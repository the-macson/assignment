const blaklist = new Set();

module.exports = {
  add: (token) => {
    blaklist.add(token);
  },
  has: (token) => {
    return blaklist.has(token);
  },
};
