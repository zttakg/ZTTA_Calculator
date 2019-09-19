import generate from "nanoid/generate";

const alphabet =
  "_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default () => generate(alphabet, 21);
