import { sign } from "jsonwebtoken";

export const createToken = (payload: any, key: string, expiresIn: string) => {
	return sign(payload, key, {
		expiresIn: expiresIn,
	});
};
