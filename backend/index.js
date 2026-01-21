import ProfileController from "./app/controllers/ProfileController.js";
import TwoFactorAuthController from "./app/controllers/TwoFactorAuthController.js";
import UserHandlerController from "./app/controllers/UserHandlerController.js";

function main() {
    new UserHandlerController();
    new TwoFactorAuthController();
    new ProfileController();
}

main();