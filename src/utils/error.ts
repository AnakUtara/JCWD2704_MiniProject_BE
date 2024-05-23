export function throwErrorMessageIf(condition: boolean, errMessage: string) {
	if (condition) throw new Error(errMessage);
}

export function catchError(error: unknown) {
	if (error instanceof Error) throw new Error(error.message);
}
