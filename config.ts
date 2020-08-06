import env from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  env.config();
}

let PORT = process.env.REACT_APP_HTTP_PORT;

if (process.env.NODE_ENV === 'production') {
  PORT = process.env.PORT;
}

module.exports = {
  PORT
};
