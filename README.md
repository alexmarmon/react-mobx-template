react-mobx-template
=====================

An application that combines:

* [MobX](https://mobxjs.github.io/mobx) Version: ^3.1.9
* [React](https://facebook.github.io/react) Version: ^15.5.4
* [React Router 4](https://github.com/ReactTraining/react-router) Version ^4.1.1
* [React Hot Loader 3](https://github.com/gaearon/react-hot-boilerplate/pull/61) Version: ^3.0.0-beta.6
* [Webpack 2](https://github.com/webpack/webpack.js.org) Version: ^2.4.1
* [Enzyme](https://github.com/airbnb/enzyme) Version: ^2.8.2
* [Airbnb's ESLint](https://github.com/airbnb/javascript) Version: ^14.1.0
* [Express](https://expressjs.com/) Version: ^4.15.2
* [Mysql](https://github.com/mysqljs/mysql) Version: ^2.11.1
* [Yarn](https://yarnpkg.com/en/) Version: 0.23.2

### Run It
```
create creds.json
{
  "host": "localhost",
	"user": "mysql user",
	"password": "mysql password",
	"database": "template"
}
```

```
npm install
mysql -u [user] -p template < /path/to/this/repo/template.sql
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
```


### Credits

* [mobxjs](https://github.com/mobxjs/mobx-react-boilerplate) with the original boilerplate.
