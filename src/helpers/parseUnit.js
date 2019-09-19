const parseUnit = str => {
  const captures = /^(-)?(\d+\.\d+|\d+|\.\d+)(%|[a-zA-Z]+)?[ \t]*/.exec(str);
  let value = 0;
  let unit;

  if (captures) {
    value = parseFloat(captures[2]);

    // eslint-disable-next-line prefer-destructuring
    unit = captures[3];

    if (captures[1] === "-") {
      value = -value;
    }
  }

  return { value, unit };
};

export default parseUnit;
