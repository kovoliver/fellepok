import pool from "../framework/conn.js";
import { passHash } from "../framework/functions.js";

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
            if(err.status) 
                throw err;
            
            throw {
                status: 500,
                message: 'Hiba történt, kérem próbálja meg később!'
            }
        }
    }

    async saveProfile(user, userID) {
        try {
            const response = await pool.query(`
                UPDATE users SET
                title = ?, firstName = ?,
                lastName = ?, firmType = ?, firmName = ?,
                taxNumber= ?, zip = ?, settlement = ?,
                street = ?, houseNumber = ?, 
                floorNumber = ?, doorNumber = ?
                WHERE userID = ?    
            `, [
                user.title, user.firstName,
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
            if(err.status) 
                throw err;
            
            throw {
                status: 500,
                message: 'Hiba történt, kérem próbálja meg később!'
            }
        }
    }

    async changePass(userID, pass, newPass) {
        try {
            const response = await pool.query(`
                SELECT userID FROM users
                WHERE userID = ? AND pass =?
            `, [userID, passHash(pass)]);

            if(response[0].length === 0) {
                throw {
                    status:403,
                    message:"Helytelen jelszót adtál meg!"
                }
            }

            const updateReq = await pool.query(`
                UPDATE users SET pass = ?
                WHERE userID = ?
            `, [passHash(newPass), userID]);

            if(updateReq[0].affectedRows === 0) {
                throw {
                    status:500,
                    message:"A kért műveletet nem sikerült végrehajtani!"
                }
            }

            return {
                status:200,
                message:"Sikeres módosítás!"
            }
        } catch(err) {
            console.log(err);

            if(err.status) 
                throw err;
            
            throw {
                status: 500,
                message: 'Hiba történt, kérem próbálja meg később!'
            }
        }
    }
}

export default ProfileModel;