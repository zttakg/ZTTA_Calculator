const types = {
  enum: (values = []) => value => values.includes(value)
};

export default types;
