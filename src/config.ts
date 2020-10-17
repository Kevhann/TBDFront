import * as env from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  env.config();
}

let HOST = process.env.REACT_APP_URL;

if (process.env.NODE_ENV === 'production') {
  HOST = process.env.PORT;
}

export { HOST };
