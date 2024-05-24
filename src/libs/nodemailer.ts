import nodemailer from "nodemailer";
import { user, pass } from "../config/config";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user,
		pass,
	},
});
