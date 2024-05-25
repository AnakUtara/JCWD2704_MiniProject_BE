import { Request } from "express";
import voucherCodes from "voucher-code-generator";
export function referralCode(req: Request) {
	return voucherCodes.generate({
		prefix: req?.user.username,
		count: 1,
		length: 6,
	})[0];
}
