import nodemailer from "nodemailer";
import { user, pass } from "../config/config";
import fs from "fs";
import { join } from "path";
import { render } from "mustache";
import { string } from "joi";

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

export async function sendPaymentNotice({
	email_to,
	username,
	template_dir,
	bank_acc_no,
	subject,
	tickets,
	event_title,
	total_price,
}: {
	email_to: string;
	username: string;
	template_dir: string;
	bank_acc_no: string;
	subject: string;
	tickets: string;
	event_title: string;
	total_price: string;
}) {
	const template = fs.readFileSync(join(__dirname, template_dir)).toString();
	if (template) {
		const html = render(template, {
			username,
			bank_acc_no,
			event_title,
			tickets,
			total_price,
		});
		await transporter.sendMail({
			to: email_to,
			subject,
			html,
		});
	}
}

export async function sendTicket({
	email_to,
	username,
	template_dir,
	title,
	tickets,
	location,
	date,
	time,
	subject,
}: {
	email_to: string;
	username: string;
	template_dir: string;
	title: string;
	tickets: string;
	location: string;
	date: string;
	time: string;
	subject: string;
}) {
	const template = fs.readFileSync(join(__dirname, template_dir)).toString();
	if (template) {
		const html = render(template, {
			username,
			title,
			tickets,
			location,
			date,
			time,
		});
		await transporter.sendMail({
			to: email_to,
			subject,
			html,
		});
	}
}
