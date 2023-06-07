const validateProductName = (name) => {
  if (name.length < 5) return false;
  return true;
};

module.exports = validateProductName;
