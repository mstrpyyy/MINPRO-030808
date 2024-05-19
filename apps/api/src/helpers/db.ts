import mysql from 'mysql2'

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'arya13',
    database: 'min_pro'
})

export default db