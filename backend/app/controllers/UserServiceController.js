import Controller from "../framework/Controller.js";
import tokenHandler from "../framework/JWToken.js";
import UserServiceModel from "../models/UserServiceModel.js";

class UserServiceController extends Controller {
    constructor() {
        super();
        this.model = new UserServiceModel();

        this.http.post("/service", 
            this.createService.bind(this), 
            tokenHandler.authenticate.bind(tokenHandler)
        );
    }

    async createService(req, res) {
        try {
            const serviceData = req.body;
            serviceData.userID = req.user.userID;

            const response = await this.model.createService(
                serviceData
            );
        }  catch(err) {
            res.status(err.status||500)
            .json({message:err.message||'Hiba történt, kérem próbálkozzon később!'});
        }
    }
}

export default UserServiceController;