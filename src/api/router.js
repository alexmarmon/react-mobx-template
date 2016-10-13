module.exports = (express) => {
  const fs = require('fs'); // eslint-disable-line global-require
  const mysql = require('mysql'); // eslint-disable-line global-require

  const creds = JSON.parse(fs.readFileSync('./creds.json'));
  const connection = mysql.createPool({
    host: creds.host,
    user: creds.user,
    password: creds.password,
    database: creds.database,
    conrnectionLimit: 50,
  });
  const router = express.Router(); // eslint-disable-line new-cap

  function errHandler(err, res) {
    res.status(500).send(err);
  }

  router.route('/users').get((req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
      if (err) { errHandler(err); }
      const which = Math.floor((Math.random() * 9) + 0);
      res.header('Content-Type', 'application/json').status(200).send(rows[which]);
    });
  });

  return router;
};
