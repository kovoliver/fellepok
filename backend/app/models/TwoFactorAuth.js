import pool from "../framework/conn.js";
import { randomString } from "../framework/functions.js";
import tokenHandler from "../framework/JWToken.js";

class TwoFactorAuth {
    async createTwoFactorKey(userID) {
        try {
            const key = randomString(12);

            const response = await pool.query(`
                INSERT INTO two_factor_keys
                (userID, twoFactorKey)
                VALUES(?,?)    
            `, [userID, key]);

            if(response.affectedRows === 0) {
                throw {
                    status:503,
                    message:"A szolgáltatás ideiglenesen nem érhető el!"
                }
            }

            return key;
        } catch(err) {
            console.log(err);
        }
    }

    async twoFactorLogin(userID, key) {
        try {
            const response = await pool.query(`
                SELECT two_factor_keys.*, users.role 
                FROM two_factor_keys
                INNER JOIN users
                ON users.userID = two_factor_keys.userID
                WHERE users.userID = ? AND twoFactorKey = ?
                AND used != ?
            `, [userID, key, 1]);

            if(response[0].length === 0) {
                throw {
                    status:401,
                    message:"Hibás a bejelentkezéshez megadott kulcs."
                }
            }

            const response2 = await pool.query(`
                UPDATE two_factor_keys
                SET used = ? WHERE keyID = ? 
            `, [1, response[0][0].keyID]);

            if(response2[0].affectedRows === 0) {
                throw {
                    status:503,
                    message:"A szolgáltatás ideiglenesen nem érhető el!"
                }
            }

            const user = {
                userID:parseInt(userID),
                role:response[0][0].role,
                email:response[0][0].email
            };

            const accessToken = tokenHandler.createToken(
                user, "JWT_ACCESS"
            );

            const refreshToken = tokenHandler.createToken(
                user, "JWT_REFRESH"
            );

            return {
                status:200,
                tokens:{accessToken, refreshToken},
                role:user.role
            }
        } catch(err) {
            console.log("TwoFactorAuth.twoFactorLogin: ", err);

            throw err;
        }
    }
}

export default TwoFactorAuth;