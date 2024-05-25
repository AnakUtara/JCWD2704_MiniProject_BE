import nodemailer from "nodemailer";
import { user, pass } from "../config/config";
import fs from "fs";
import { join } from "path";
import { render } from "mustache";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user,
		pass,
	},
});

export async function sendEmail({
	email_to,
	template_dir,
	href,
	subject,
}: {
	email_to: string;
	template_dir: string;
	href: string;
	subject: string;
}) {
	const template = fs.readFileSync(join(__dirname, template_dir)).toString();
	if (template) {
		const html = render(template, {
			email: email_to,
			href,
		});
		await transporter.sendMail({
			to: email_to,
			subject,
			html,
		});
	}
}
