import multer, { FileFilterCallback } from "multer";
import { join } from "path";
import { Request } from "express";
import { DestinationCallback, FilenameCallback } from "../models/multer.model";
import dayjs from "dayjs";

const mB = 1072864;
export const maxAvatarSize = 1.5 * mB;
export const maxEventSize = 10 * mB;

const multerConfig: multer.Options = {
	fileFilter: (
		req: Request,
		file: Express.Multer.File,
		cb: FileFilterCallback
	) => {
		if (file.mimetype.split("/")[0] !== "image") {
			return cb(new Error("file type isn't image"));
		}
		// const fileSize = parseInt(req.headers["content-length"] || "");
		if (file.size > maxAvatarSize || file.size > maxEventSize) {
			return cb(new Error("max size 1.5mb"));
		}
		return cb(null, true);
	},
};

export function uploader(
	filePrefix: string,
	fileSize: number,
	folderName?: string
) {
	const defaultDir = join(__dirname, "../public/images/");
	const storage = multer.diskStorage({
		destination: (
			req: Request,
			file: Express.Multer.File,
			cb: DestinationCallback
		) => {
			const destination = folderName ? defaultDir + folderName : defaultDir;
			cb(null, destination);
		},
		filename: (
			req: Request,
			file: Express.Multer.File,
			cb: FilenameCallback
		) => {
			const originalNameParts = file.originalname.split(".");
			const fileExtension = originalNameParts[originalNameParts.length - 1];
			const newFileName = `${filePrefix}-${req.user.id}-${dayjs().format(
				"YYYYMMDD-HHmmss"
			)}.${fileExtension}`;
			cb(null, newFileName);
		},
	});
	return multer({ storage, ...multerConfig, limits: { fileSize } });
}

export function blobUploader() {
	return multer({ ...multerConfig });
}
