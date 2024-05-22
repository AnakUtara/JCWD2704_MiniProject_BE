import multer, { FileFilterCallback } from "multer";
import { join } from "path";
import { Request } from "express";
import { DestinationCallback, FilenameCallback } from "../models/multer.model";

const maxSize = 1048576;

const multerConfig: multer.Options = {
	fileFilter: (
		req: Request,
		file: Express.Multer.File,
		cb: FileFilterCallback
	) => {
		if (file.mimetype.split("/")[0] !== "image") {
			return cb(new Error("file type isn't image"));
		}
		const fileSize = parseInt(req.headers["content-length"] || "");
		if (fileSize > maxSize) {
			return cb(new Error("max size 1mb"));
		}
		return cb(null, true);
	},
	limits: {
		fileSize: maxSize,
	},
};

export function uploader(filePrefix: string, folderName?: string) {
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
			const newFileName = filePrefix + Date.now() + "." + fileExtension;
			cb(null, newFileName);
		},
	});
	return multer({ storage, ...multerConfig });
}

export function blobUploader() {
	return multer({ ...multerConfig });
}
