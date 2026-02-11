import Controller from "../framework/Controller.js";
import { checkSchema } from "../framework/functions.js";
import tokenHandler from "../framework/JWToken.js";
import UserServiceModel from "../models/UserServiceModel.js";
import { userServiceSchema } from "./schemas.js";

class UserServiceController extends Controller {
    constructor() {
        super(userServiceSchema);
        this.model = new UserServiceModel();

        this.http.post("/service", 
            this.createService.bind(this), 
            tokenHandler.authenticate.bind(tokenHandler)
        );
    }

    async createService(req, res) {
        try {
            const serviceData = req.body;

            const value = checkSchema(serviceData, this.schema);

            value.userID = req.user.userID;

            const response = await this.model.createService(
                value
            );

            res.status(200).json(response);
        }  catch(err) {
            res.status(err.status||500)
            .json({message:err.message||'Hiba történt, kérem próbálkozzon később!'});
        }
    }
}

export default UserServiceController;