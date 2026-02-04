import ProfileController from "./app/controllers/ProfileController.js";
import TwoFactorAuthController from "./app/controllers/TwoFactorAuthController.js";
import UserHandlerController from "./app/controllers/UserHandlerController.js";
import UserServiceController from "./app/controllers/UserServiceController.js";
import UserServiceTypesController from "./app/controllers/UserServiceTypesController.js";

function main() {
    new UserHandlerController();
    new TwoFactorAuthController();
    new ProfileController();
    new UserServiceTypesController();
    new UserServiceController();
}

main();