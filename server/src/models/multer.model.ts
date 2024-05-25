export type DestinationCallback = (
	error: Error | null,
	destination: string
) => void;
export type FilenameCallback = (error: Error | null, filename: string) => void;
