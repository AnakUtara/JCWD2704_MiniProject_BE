export const validator = (cond: boolean, errMessage: string) => {
	if (cond) throw new Error(errMessage);
};

export function throwError(error: unknown) {
	if (error instanceof Error) throw new Error(error.message);
}
