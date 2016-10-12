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

  router.route('/test').get((req, res) => {
    connection.query('SELECT * FROM deals', (err, rows) => {
      if (err) { errHandler(err); }
      const which = Math.floor((Math.random() * 26) + 1)
      res.send(rows[which]);
    });
  });

  return router;
};
