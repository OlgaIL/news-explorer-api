require('dotenv').config();

const {
  PORT = 3000, NODE_ENV = 'dev', JWT_SECRET = 'dev-secret', BD_HOST_NAME = 'mongodb://localhost:27017/newsdb',
} = process.env;

const SALT_ROUND = 10;

module.exports = {
  SALT_ROUND,
  JWT_SECRET,
  NODE_ENV,
  BD_HOST_NAME,
  PORT,
};
