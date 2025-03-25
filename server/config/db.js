import pkg from "pg";
import dotenv from "dotenv"

dotenv.config()
const {Pool} = pkg ;

const pool = new Pool({
    user:process.env.USER,
    host:process.env.HOST,
    datapase:process.env.DB_DATABASE,
    password:process.env.PASSWORD,
    port:process.env.DBPORT,
});

console.log(process.env.DB_DATABASE)

pool.connect(()=>{
    console.log("Connection pool established with Database")
})

export default pool;