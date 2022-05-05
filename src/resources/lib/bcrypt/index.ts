import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const passwordHash = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password, saltOrRounds);
};

export const compare = (toCompare: string, hash: string): boolean => {
  return bcrypt.compareSync(toCompare, hash);
};
