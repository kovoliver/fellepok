import pool from "../framework/conn.js";
import EmailSender from "../framework/EmailSender.js";
import { passHash, randomString } from "../framework/functions.js";
import TwoFactorAuth from "./TwoFactorAuth.js";

class UserHandlerModel {
    constructor() {
        this.emailSender = new EmailSender();
        this.twoFactorAuth = new TwoFactorAuth();
    }

    async register(user) {
        try {
            const aString = randomString(12);

            const response = await pool.query(`
                INSERT INTO users
                (email, pass, role, activationString)
                VALUES(?,?,?,?)
            `, [user.email, passHash(user.pass), user.role, aString]);

            if (response[0].affectedRows === 0) {
                throw {
                    status: 503,
                    message: "A szolgáltatás ideigelenesen nem érhető el!"
                }
            }

            const userID = parseInt(response[0].insertId);

            const html = `
                <h3>Kedves Felhasználó!</h3>
                Ezt az üzenetet azért kapod, mert regisztráltál az oldalunkra.
                Kattints az alábbi linkre, hogy megerősítsd a regisztrációt: <br>
                <a href="${process.env.FRONTENDRUL}/confirm-registration/${aString}/${userID}">Klikk!</a>
            `;

            this.emailSender.sendMail({
                from:process.env.SMTP_USER,
                to:user.email,
                subject:"Regisztráció a fellepok.com oldalra",
                html:html
            });

            return {
                status: 201,
                message: 'Sikeres regisztráció!'
            }
        } catch (err) {
            console.log(err);
            
            return {
                status: 500,
                message: 'Hiba történt, kérem próbálja meg később!'
            }
        }
    }

    async activateRegistration(userID, aString) {
        try {
            const response = await pool.query(`
                UPDATE users 
                SET activated = ?, activationString = ?
                WHERE userID = ? AND activationString = ?
            `, [1, null, userID, aString]);

            if(response[0].affectedRows === 0) {
                return {
                    status:401,
                    message:"A megadott aktivációs karakterlánc helytelen!"
                }
            }

            return {
                status:200,
                message:"Sikeres aktiváció!"
            }
        } catch (err) {
            console.log(err);
            //logolás
            
            return {
                status: 500,
                message: 'Hiba történt, kérem próbálja meg később!'
            }
        }
    }

    async login(email, pass) {
        try {
            const response = await pool.query(`
                SELECT userID, role
                FROM users
                WHERE email = ? AND pass = ?
            `, [email, passHash(pass)]);

            if(response[0].length === 0) {
                throw {
                    status:403,
                    message:"A megadott felhasználónév/jelszó páros hibás!"
                }
            }

            const userID = response[0][0].userID;

            const key = await this.twoFactorAuth.createTwoFactorKey(
                userID
            );

            const html = `
                <h3>Kedves Felhasználó!</h3>
                Ezt az üzenetet azért kapod, mert bejelentkeztél az oldalunkra.
                Kattints az alábbi linkre, hogy megerősítsd a bejelentkezést: <br>
                <a href="${process.env.FRONTENDRUL}/two-factor-auth/${key}/${userID}">Klikk!</a>
            `;

            const emailSent = await this.emailSender.sendMail({
                from:process.env.SMTP_USER,
                to:email,
                subject:"Regisztráció a fellepok.com oldalra",
                html:html
            });

            if(!emailSent) {
                throw {
                    status:503,
                    message:"Sajnos nem sikerült elküldeni a két faktoros azonosításra szolgáló emailt!"
                }
            }

            return {
                status:200,
                message:"Nézd meg az emailjeidet!"
            }
        } catch(err) {
            console.log("UserHandlerModel.login: ", err);
            throw err;
        }
    }
}

export default UserHandlerModel;