import checkExists from "../framework/checkExists.js";
import Controller from "../framework/Controller.js";
import {isNullOrUndefined} from "../framework/functions.js";
import { emailRegex } from "../framework/regexes.js";
import UserHandlerModel from "../models/UserHandlerModel.js";
import { regSchema } from "./schemas.js";

class UserHandlerController extends Controller {
    constructor() {
        super(regSchema);
        this.model = new UserHandlerModel();

        this.http.post("/register", this.register.bind(this));
        this.http.get("/activate-user/:userID/:activationString", this.activateRegistration.bind(this));
        this.http.post("/login", this.login.bind(this));
        this.http.post("/logout", this.logout.bind(this));
    }

    async checkRegisterData(user) {
        const errors = [];

        if(isNullOrUndefined(user.email) || !emailRegex.test(user.email)) {
            errors.push("Az email cím nem megfelelő formátumú!");
        }

        if(isNullOrUndefined(user.pass) || user.pass.length < 6) {
            errors.push("A jelszónak legalább 6 karakteresnek kell lennie!");
        }

        const emailExists = await checkExists("users", "email", user.email);

        if(emailExists) {
            errors.push("A következő email címmel már regisztráltak az adatbázisba: " + user.email);
        }

        if(errors.length > 0) {
            throw {
                status:400,
                message:errors
            }
        }
    }

    async register(req, res) {
        try {
            const { error, value } = this.schema.validate(req.body, {abortEarly:false});

            if(error) {
                return res.status(400)
                .json({
                    message:error.details.map(e=>e.message)
                });
            }

            const response = await this.model.register(
                value
            );

            res.status(response.status).json({message:response.message});
        } catch(err) {
            res.status(err.status||500)
            .json({message:err.message||'Hiba történt, kérem próbálkozzon később!'});
        }
    }

    async activateRegistration(req, res) {
        try {
            const {userID, activationString} = req.params;

            const response = await this.model.activateRegistration(
                userID, activationString
            );

            res.status(response.status).json({message:response.message});
        } catch(err) {
            res.status(err.status||500)
            .json({message:err.message||'Hiba történt, kérem próbálkozzon később!'});
        }
    }

    async login(req, res) {
        try {
            const {email, pass} = req.body;

            const response = await this.model.login(
                email, pass
            );

            res.status(response.status).json({message:response.message});
        } catch(err) {
            res.status(err.status||500)
            .json({message:err.message||'Hiba történt, kérem próbálkozzon később!'});
        }
    }

    async logout(req, res) {
        try {
            const cookieOptions = {
                expires:Date.now(), httpOnly:true, 
                secure:true, sameSite:"none"
            };

            res.clearCookie("refreshToken", null, cookieOptions);
            res.status(200).json({logout:true});
        }  catch(err) {
            res.status(err.status||500)
            .json({message:err.message||'Hiba történt, kérem próbálkozzon később!'});
        }
    }
}

export default UserHandlerController;