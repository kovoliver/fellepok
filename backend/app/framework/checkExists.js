import pool from "./conn.js";

export default async function checkExists(table, field, value) {
    try {
        const response = await pool.query(`
            SELECT COUNT(*) as numberOf FROM ${table}
            WHERE ${field} = ? 
        `, [value]);

        return response[0].length > 0 && response[0][0].numberOf > 0;
    } catch(err) {
        console.log(err);
        throw {
            status:503,
            message:"A szolgáltatás ideiglenesen nem érhető el!"
        }
    }
}