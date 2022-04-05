const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    use_env_variable: true,
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    protocol: 'postgres',
    benchmark: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    use_env_variable: true,
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: true,
    url: process.env.PROD_DATABASE_URL,
    protocol: 'postgres',
    dialect: 'postgres',
    logging: false,
    benchmark: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  },
};
