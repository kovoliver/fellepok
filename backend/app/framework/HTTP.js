import express from "express";
import dotenv from "dotenv";
import { defaultValue } from "./functions.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import https from "https";
import path from "path";
import fs from "fs";
import { __dirname } from "./functions.js";
dotenv.config();

class HTTP {
    constructor() {
        //a konstruktor lefut automatikusan
        this.app = express();
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.port = defaultValue(process.env.PORT, 3001);

        /*
            credentials:true
            A cookie-kat és egyéb fejléceket enged közlekedni
            a két url között.
        */

        this.app.use(cors({
            origin: defaultValue(process.env.FRONTENDRUL, "https://localhost:5173"),
            credentials: true,
            allowedHeaders: ["Content-type", "Authorization"],
            exposedHeaders: ["Authorization"]
        }));

        // this.app.use((req, res, next) => {
        //     res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        //     next();
        // });

        this.listen();
    }

    listen() {
        if (process.env.NODE_ENV === "development") {
            const certPath = path.resolve(__dirname, "../certificates");
            const key = fs.readFileSync(path.join(certPath, "key.pem"));
            const cert = fs.readFileSync(path.join(certPath, "cert.pem"));

            https.createServer({ key, cert }, this.app)
                .listen(this.port, () => {
                    console.log(`🚀 Dev HTTPS server listening on port ${this.port}`);
                });
        } else {
            http.createServer(this.app)
                .listen(this.port, () => {
                    console.log(`🚀 HTTP server listening on port ${this.port}`);
                });
        }
    }

    get(path, cb, middle = null) {
        if (middle)
            this.app.get("/api" + path, middle, cb);
        else
            this.app.get("/api" + path, cb);
    }

    post(path, cb, middle = null) {
        if (middle)
            this.app.post("/api" + path, middle, cb);
        else
            this.app.post("/api" + path, cb);
    }

    put(path, cb, middle = null) {
        if (middle)
            this.app.put("/api" + path, middle, cb);
        else
            this.app.put("/api" + path, cb);
    }

    patch(path, cb, middle = null) {
        if (middle)
            this.app.patch("/api" + path, middle, cb);
        else
            this.app.patch("/api" + path, cb);
    }

    delete(path, cb, middle = null) {
        if (middle)
            this.app.delete("/api" + path, middle, cb);
        else
            this.app.delete("/api" + path, cb);
    }
}

const httpServer = new HTTP();
export default httpServer;