import pool from "../framework/conn.js";

class UserServiceTypesModel {
    async getServices() {
        try {
            const response = await pool.query(`SELECT * FROM user_service_types`);

            return response[0];
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
}

export default UserServiceTypesModel;