import { CorsOptions } from "cors";
import "dotenv/config";

export const PORT = process.env.PORT || 8000;

export const ACC_SECRET_KEY = process.env.ACC_SECRET_KEY || "";
export const REFR_SECRET_KEY = process.env.REFR_SECRET_KEY || "";
export const FP_SECRET_KEY = process.env.FP_SECRET_KEY || "";
export const VERIF_SECRET_KEY = process.env.VERIF_SECRET_KEY || "";

export const corsOptions: CorsOptions = {
	origin: [`${process.env.FE_URL}`],
	credentials: true,
};

export const user = process.env.nodemailer_email;
export const pass = process.env.nodemailer_pass;
