import 'dotenv/config.js';
import 'convict';
import convict from 'convict';
import convictFormatWithValidator from 'convict-format-with-validator';

convict.addFormats(convictFormatWithValidator);

const config = convict({
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'IP_VALID_ADDRESS'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  salt: {
    doc: 'Salt string for hash.',
    format: String,
    default: '',
    env: 'SALT'
  },
  dbUrl: {
    doc: 'Connect to DB',
    format: String,
    default: 'mongodb://localhost:27017',
    env: 'DB_URL'
  },
  baseUserImg: {
    doc: 'User img',
    format: String,
    default: 'https://www.svgrepo.com/show/532363/user-alt-1.svg',
    env: 'DB_URL'
  },
  uploadDirectory: {
    doc: 'Directory for files',
    format: String,
    default: '',
    env: 'UPLOAD_DIRECTORY'
  }
});

export const env = {
  PORT: config.get('port'),
  IP_VALID_ADDRESS: config.get('ip'),
  SALT: config.get('salt'),
  DB_URL: config.get('dbUrl'),
  BASE_USER_IMG: config.get('baseUserImg'),
  UPLOAD_DIRECTORY: config.get('uploadDirectory')
};
