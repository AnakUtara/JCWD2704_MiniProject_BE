import { compare, genSalt, hash } from "bcrypt";

export const hashPassword = async (password: string) => {
	const salt = await genSalt(10);
	return await hash(password, salt);
};

export const comparePassword = async (hashPass: string, password: string) => {
	return await compare(password, hashPass);
};
