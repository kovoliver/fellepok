import * as crypto from 'crypto';
import { fileURLToPath } from "url";
import { dirname, resolve } from 'path';

export const defaultValue = (value, defValue)=> {
    if(value === undefined || value === null)
        return defValue;
    return value;
};

export const isNullOrUndefined = (value)=> {
    return value === null || value === undefined;
};

export const isNumeric = (value)=> {
    return !isNaN(parseInt(value));
};

export const passHash = (pass)=> {
    return crypto.createHash("sha512")
    .update(pass).digest('hex');
};

export const toNumber = (value, defValue = -1)=> {
    return isNumeric(value) ? parseFloat(value) : defValue; 
};

export const randomString = (length)=> {
    const bytes = Math.ceil(length/2);
    return crypto.randomBytes(bytes).toString('hex').slice(0, length);
};

export function getDirName(meta = null) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const baseDir = resolve(__dirname, '..', '..');
    return baseDir;
}

export const __dirname = getDirName();