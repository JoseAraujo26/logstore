export class UseDatabase {
  static async query(query: string, datas?: any[]) {
    const mysql = require('mysql2');
    const pool = mysql.createPool({host:process.env.HOST, user: process.env.USER, database: process.env.DATABASE, password: process.env.PASSWORD});
    const promisePool = pool.promise();
    const search = query && datas ? [query, datas] : [query];
    const [rows, fields] = await promisePool.query(...search);
    return rows
  }
}