import Controller from "../framework/Controller.js";
import UserServiceTypesModel from "../models/UserServiceTypesModel.js";

class UserServiceTypesController extends Controller {
    constructor() {
        super();
        this.model = new UserServiceTypesModel();

        this.http.get("/service_types", this.getServices.bind(this));
    }

    async getServices(req, res) {
        try {
            const response = await this.model.getServices();

            res.json({data:response});
        } catch(err) {
            res.status(err.status||500)
            .json({message:err.message||'Hiba történt, kérem próbálkozzon később!'});
        }
    }
}

export default UserServiceTypesController;