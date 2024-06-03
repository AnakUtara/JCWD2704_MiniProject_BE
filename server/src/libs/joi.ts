import { Category, Gender, Status_event, Venue_type } from "@prisma/client";
import Joi from "joi";
import { Discount } from "../models/event.model";

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
	username: Joi.string().alphanum().lowercase().min(3).max(30).trim(),
	fullname: Joi.string().trim().lowercase(),
	email: Joi.string()
		.trim()
		.lowercase()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		}),
	gender: Joi.string().trim().valid(Gender.male, Gender.female),
	phone_no: Joi.string().trim().alphanum().length(13),
	date_of_birth: Joi.date(),
	bank_acc_no: Joi.string()
		.alphanum()
		.trim()
		.pattern(new RegExp("^[0-9]+$"))
		.min(8)
		.max(12),
	address: Joi.string().trim().max(200),
});

export const eventSchema = Joi.object({
	title: Joi.string().trim().min(4).max(200).required(),
	location: Joi.string().trim().min(1).max(500),
	city: Joi.string().trim().min(4).max(50).required(),
	zip_code: Joi.number().min(5).required(),
	venue_type: Joi.valid(Venue_type.indoor, Venue_type.outdoor),
	details: Joi.string().trim().min(1).max(2000).required(),
	roster: Joi.string().trim().required(),
	scheduled_at: Joi.date().required(),
	start_time: Joi.date().required(),
	end_time: Joi.date().required(),
	status: Joi.string()
		.trim()
		.valid(Status_event.finished, Status_event.published)
		.required(),
	discount_amount: Joi.number().valid(
		Discount.d10,
		Discount.d15,
		Discount.d20,
		Discount.d25,
		Discount.d30,
		Discount.d35,
		Discount.d40,
		Discount.d5,
		Discount.d50,
		Discount.d60,
		Discount.d70,
		Discount.d80
	),
	ticket_price: Joi.number().required(),
	ticket_amount: Joi.number().required(),
	discount_price: Joi.number(),
	assigned_pic: Joi.string().allow(""),
	pic_phone_no: Joi.string().allow(""),
	category: Joi.string()
		.valid(
			Category.Acoustic,
			Category.Electronic,
			Category.Experimental,
			Category.Metal,
			Category.Pop,
			Category.Punk,
			Category.Rock
		)
		.required(),
});
