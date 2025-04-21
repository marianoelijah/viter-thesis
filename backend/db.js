import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // or your MySQL password
  database: 'worldpeas_v2', // make sure this matches your DB
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
