react-mobx-template
=====================

An application that combines:

* [MobX](https://mobxjs.github.io/mobx) Version: ^3.1.9
* [React](https://facebook.github.io/react) Version: ^15.5.4
* [React Router 4](https://github.com/ReactTraining/react-router) Version ^4.1.1
* [React Hot Loader 3](https://github.com/gaearon/react-hot-boilerplate/pull/61) Version: ^3.0.0-beta.7
* [Webpack 3](https://github.com/webpack/webpack.js.org) Version: ^3.0.0
* [Enzyme](https://github.com/airbnb/enzyme) Version: ^2.8.2
* [Airbnb's ESLint](https://github.com/airbnb/javascript) Version: ^15.0.1
* [Express](https://expressjs.com/) Version: ^4.15.2
* [Mysql](https://github.com/mysqljs/mysql) Version: ^2.11.1

### Run It

```
yarn install

npm run dev
open http://localhost:3000
```

### Run Lint
```
npm run lint
```

### Run Tests
```
npm run test
```

### Build Production and Run
```
npm run build

// final build size should be ~148KB
```

### Get API Calls working
```
vim creds.json
{
	"host": "localhost",
	"user": "mysql user",
	"password": "mysql password",
	"database": "template"
}

// in mysql
create database template;

mysql -u [user] -p template < /path/to/this/repo/template.sql

// uncomment fetchData function in src/pages/about/About.jsx and src/pages/main/Main.jsx

```
