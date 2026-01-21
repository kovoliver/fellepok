import Controller from "../framework/Controller.js";
import { defaultValue } from "../framework/functions.js";
import TwoFactorAuth from "../models/TwoFactorAuth.js";

class TwoFactorAuthController extends Controller {
    constructor() {
        super(null);
        this.model = new TwoFactorAuth();
        this.http.get("/two-factor-login/:key/:userID", this.twoFactorLogin.bind(this));
    }

    async twoFactorLogin(req, res) {
        try {
            const {userID, key} = req.params;

            const response = await this.model.twoFactorLogin(
                userID, key
            );

            const days = parseInt(defaultValue(process.env["JWT_REFRESH_DAYS"], 7));

            const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
            const cookieOptions = {
                expires, httpOnly:true, secure:true, sameSite:"none"
            };

            res.cookie("refreshToken", response.tokens.refreshToken, cookieOptions);
            res.set("Authorization", "Bearer " + response.tokens.accessToken);

            res.status(response.status).json({message:response.message, data:{role:response.role}});
        } catch(err) {
            res.status(err.status||500)
            .json({message:err.message||'Hiba történt, kérem próbálkozzon később!'});
        }
    }
}

export default TwoFactorAuthController;