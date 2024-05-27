import { CorsOptions } from "cors";
import "dotenv/config";

export const PORT = process.env.PORT || 8000;

export const SECRET_KEY = process.env.SECRET_KEY || "";

export const corsOptions: CorsOptions = {
	origin: [`${process.env.BASE_URL}${process.env.FE_PORT}`],
	credentials: true,
};

export const user = process.env.nodemailer_email;
export const pass = process.env.nodemailer_pass;
