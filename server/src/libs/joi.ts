import { Gender } from "@prisma/client";
import Joi from "joi";

export const registerSchema = Joi.object({
	username: Joi.string()
		.alphanum()
		.lowercase()
		.min(3)
		.max(30)
		.trim()
		.required(),
	fullname: Joi.string().trim().lowercase().required(),
	password: Joi.string().trim().min(8).max(20).required(),
	email: Joi.string()
		.trim()
		.lowercase()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.required(),
	phone_no: Joi.string()
		.trim()
		.pattern(new RegExp("^[0-9]+$"))
		.length(13)
		.required(),
	id_card: Joi.string()
		.trim()
		.pattern(new RegExp("^[0-9]+$"))
		.length(16)
		.required(),
	reference_code: Joi.string().allow(""),
	bank_acc_no: Joi.string()
		.alphanum()
		.trim()
		.pattern(new RegExp("^[0-9]+$"))
		.min(8)
		.max(12),
});

export const updateSchema = Joi.object({
	username: Joi.string()
		.alphanum()
		.lowercase()
		.min(3)
		.max(30)
		.trim()
		.required(),
	fullname: Joi.string().trim().lowercase().required(),
	password: Joi.string().trim().min(8).max(20).required(),
	email: Joi.string()
		.trim()
		.lowercase()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.required(),
	gender: Joi.string().trim().valid(Gender.male, Gender.female),
	phone_no: Joi.string().trim().alphanum().length(13).required(),
	id_card: Joi.string().trim().alphanum().length(16).required(),
	bank_acc_no: Joi.number().integer().min(8).max(12),
	address: Joi.string().trim().max(200),
	avatar: Joi.binary(),
});
