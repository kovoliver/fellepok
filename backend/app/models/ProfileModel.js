import pool from "../framework/conn.js";

class ProfileModel {
    async getProfileByID(userID) {
        try {
            const response = await pool.query(`
                SELECT 
                email, title, firstName,
                lastName, firmType, firmName,
                taxNumber, zip, settlement,
                street, houseNumber, 
                floorNumber, doorNumber
                FROM users WHERE userID = ?
            `, [userID]);

            if(response[0].length === 0) {
                throw {
                    status:404,
                    message:"Nem létezik ilyen felhasználó!"
                }
            }

            return response[0][0];
        } catch(err) {
            console.log(err);
            
            return {
                status: 500,
                message: 'Hiba történt, kérem próbálja meg később!'
            }
        }
    }

    async saveProfile(user, userID) {
        try {
            const response = await pool.query(`
                UPDATE users 
                SET email = ?, title = ?, firstName = ?,
                lastName = ?, firmType = ?, firmName = ?,
                taxNumber= ?, zip = ?, settlement = ?,
                street = ?, houseNumber = ?, 
                floorNumber = ?, doorNumber = ?
                WHERE userID = ?    
            `, [
                user.email, user.title, user.firstName,
                user.lastName, user.firmType, user.firmName,
                user.taxNumber, user.zip, user.settlement,
                user.street, user.houseNumber, 
                user.floorNumber, user.doorNumber, userID
            ]);

            if(response[0].length === 0) {
                throw {
                    status:404,
                    message:"Nem található a felhasználó!"
                }
            }

            return {
                status:200,
                message:"Sikeres mentés!"
            }
        } catch(err) {
            console.log(err);
            
            return {
                status: 500,
                message: 'Hiba történt, kérem próbálja meg később!'
            }
        }
    }
}

export default ProfileModel;