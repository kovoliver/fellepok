import jwt from "jsonwebtoken";
import {defaultValue} from "./functions.js";

class JWToken {
    createToken(user, key) {
        const dayOrMinute = key === "JWT_ACCESS" ? "m" : "d";
        const expressKey = key === "JWT_ACCESS" ? "JWT_ACCESS_MINS" : "JWT_REFRESH_DAYS";
        const expiresIn = defaultValue(process.env[expressKey], process.env[expressKey]) + dayOrMinute;

        return jwt.sign(user, process.env[key], { expiresIn });
    }

    verifyToken(token, key) {
        try {
            return jwt.verify(token, process.env[key]);
        } catch(err) {
            return null;
        }
    }

    authenticate(req, res, next) {
        const authHeader = req.headers['authorization'];
        
        if(!authHeader) {
            return res.status(401).json({message:'A rendszer nem tudott azonosítani!'});
        }
        //Authorization élaksjdfélkasjdfékljasélkfj.aélélkasfélasjéfljasélkfjasélkjfélaksjdf
        const headerSplit = authHeader.split(" ");

        const token = headerSplit[1] ? headerSplit[1].trim() :  null;
        let newToken = null;

        if(!token) return res.json({message:'A rendszer nem tudott azonosítani!'});

        let decoded = this.verifyToken(token, "JWT_ACCESS");

        if(!decoded) {
            decoded = this.verifyToken(req.cookies.refreshToken, "JWT_REFRESH");

            if(!decoded) {
                return res.status(401).json({message:'A rendszer nem tudott azonosítani!'});
            }

            delete decoded.exp;

            newToken = this.createToken(decoded, "JWT_ACCESS");
        }

        if(newToken) {
            req.user = decoded;
            res.setHeader('Authorization', `Bearer ${newToken}`);
        }

        req.user = decoded;
        
        next();
    }
}

const tokenHandler = new JWToken();
export default tokenHandler;