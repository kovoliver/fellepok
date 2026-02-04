import pool from "../framework/conn.js";

class UserServiceModel {
    async createService(serviceData) {
        try {
            const response = await pool.query(`
                INSERT INTO user_services 
                (userID, serviceType, title, 
                description, webpage, facebook, 
                tiktok, youtube, instagram, 
                x_twitter, linkedin)
                VALUES(?,?,?,?,?,?,?,?,?,?,?)
            `, [
                serviceData.userID, serviceData.serviceType,
                serviceData.title, serviceData.description,
                serviceData.webpage, serviceData.facebook,
                serviceData.tiktok, serviceData.youtube,
                serviceData.instagram, serviceData.x_twitter,
                serviceData.linkedin
            ]);

            if(response[0].affectedRows === 0) {
                throw {
                    status:503,
                    message:"A szolgáltatás nem érhető el. Kérem próbálja később!"
                }
            }

            return {
                status:200,
                message:"Sikeres mentés!",
                insertID:response[0].insertId
            }
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