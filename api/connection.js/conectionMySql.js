const mysql = require('mysql2');

class MySQLConnection {
  constructor() {
    this.host = process.env.MYSQL_HOST;
    this.user = process.env.MYSQL_USER;
    this.password = process.env.MYSQL_PASSWORD;
    this.database = process.env.MYSQL_DB;

    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
    });
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Failed to connect to MySQL', err);
        process.exit(1);
      } else {
        console.log('Connected to MySQL');
      }
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

const mysqlConnection = new MySQLConnection();
mysqlConnection.connect();

module.exports = mysqlConnection;