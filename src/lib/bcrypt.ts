import { compare, genSalt, hash } from "bcrypt";

export const hashPass = async (password: string) => {
	const salt = await genSalt(10);
	return await hash(password, salt);
};

export const comparePass = async (hashPass: string, password: string) => {
	return await compare(password, hashPass);
};
