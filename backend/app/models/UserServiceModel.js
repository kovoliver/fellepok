import pool from "../framework/conn.js";

class UserServiceModel {
    async createService(serviceData) {
        try {
            
        } catch (err) {
            console.log(err);

            if (err.status)
                throw err;

            throw {
                status: 500,
                message: 'Hiba történt, kérem próbálja meg később!'
            }
        }
    }

    async updateService(serviceData) {

    }

    async deleteService() {

    }
}

export default UserServiceModel;