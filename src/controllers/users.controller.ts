import { IService } from "../models/service.model";
import { EntityController } from "./entity.controller";

class UsersController extends EntityController {
	constructor(service: IService) {
		super(service);
	}
}

export default new UsersController();
