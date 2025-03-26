import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const isLocal = process.env.NODE_ENV === "development";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: isLocal ? false : { rejectUnauthorized: false }, 
});

pool.connect((err, client, release) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log(" Database connected successfully!");
        release();
    }
});

export default pool;





