import { Request } from "express";
import { TReview } from "../models/review.model";
import { prisma } from "../libs/prisma";
import { user } from "../config/config";
import { TUser } from "../models/user.model";

class ReviewServices {
	async create(req: Request) {
		const { id } = req.params;
		const { review, rating } = req.body;
		const data = await prisma.review.create({
			data: {
				user: { connect: { id: req.user.id } },
				event: { connect: { id: id } },
				review: review,
				rating: Number(rating),
			},
		});
		return data;
	}

	async getAll(req: Request) {
		const data: TReview[] = await prisma.review.findMany();
		return data;
	}

	async getByEvent(req: Request) {
		const { id } = req.params;
		const data: TReview[] = await prisma.review.findMany({
			where: { event_id: id },
			include: { user: { select: { username: true, avatar: true } } },
		});
		return data;
	}

	async delete(req: Request) {
		const { id } = req.params;
		const data = await prisma.review.delete({
			where: {
				user_id_event_id: { user_id: req.user.id as string, event_id: id },
			},
		});
	}

	async update(req: Request) {
		const { id } = req.params;
		const { review, rating } = req.body;
		const data = await prisma.review.update({
			where: {
				user_id_event_id: { user_id: req.user.id as string, event_id: id },
			},
			data: { review: review, rating: rating },
		});
	}
}

export default new ReviewServices();
