const mysql = require('mysql2');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'chat_db'
});

db.connect((error) => {
    if (error) throw new error;
    console.log("Connected to database!");
});

module.exports = db;