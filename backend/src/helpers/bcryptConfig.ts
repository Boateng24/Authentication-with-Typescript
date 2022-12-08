import bcrypt from 'bcryptjs';
export const hashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

export const compare = async (hash: string, pass: string) => {
  return bcrypt.compare(hash, pass);
};
