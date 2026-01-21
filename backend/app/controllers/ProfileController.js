import Controller from "../framework/Controller.js";
import { profileSchema } from "./schemas.js";
import ProfileModel from "../models/ProfileModel.js";
import tokenHandler from "../framework/JWToken.js";

class ProfileController extends Controller {
    constructor() {
        super(profileSchema);

        this.model = new ProfileModel();
        this.http.get(
            "/profile", this.getProfileByID.bind(this), 
            tokenHandler.authenticate.bind(tokenHandler)
        );

        this.http.put(
            "/profile", this.saveProfile.bind(this),
            tokenHandler.authenticate.bind(tokenHandler)
        );

        this.http.patch(
            "/change-pass", this.changePass.bind(this),
            tokenHandler.authenticate.bind(tokenHandler)
        );
    }

    async getProfileByID(req, res) {
        try {
            const response = await this.model.getProfileByID(
                req.user.userID
            );

            res.json({data:response});
        } catch(err) {
            res.status(err.status||500)
            .json({message:err.message||'Hiba történt, kérem próbálkozzon később!'});
        }
    }

    async saveProfile(req, res) {
        try {
            const { error, value } = this.schema.validate(req.body, {abortEarly:false});

            if(error) {
                return res.status(400)
                .json({
                    message:error.details.map(e=>e.message)
                });
            }

            const response = await this.model.saveProfile(
                value, req.user.userID
            );

            res.status(response.status).json({message:response.message});
        } catch(err) {
            res.status(err.status||500)
            .json({message:err.message||'Hiba történt, kérem próbálkozzon később!'});
        }
    }

    async changePass(req, res) {
        try {
            const response = await this.model.changePass(
                req.user.userID, 
                req.body.currentPass,
                req.body.newPass
            );

            res.status(response.status).json({message:response.message});
        } catch(err) {
            res.status(err.status||500)
            .json({message:err.message||'Hiba történt, kérem próbálkozzon később!'});
        }
    }
}

export default ProfileController;