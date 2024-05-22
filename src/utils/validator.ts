export function throwErrorMessageIf(cond: boolean, errMessage: string) {
	if (!cond) throw new Error(errMessage);
}

export function catchError(error: unknown) {
	if (error instanceof Error) throw new Error(error.message);
}
