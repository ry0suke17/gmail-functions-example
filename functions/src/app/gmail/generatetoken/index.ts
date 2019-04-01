import { generateToken } from '@infrastructure/repository/gmail/api/token';
import fs from 'fs';
import credentials from '../../../../keys/credentials.json';

const tokenPath = 'keys/token.json';
const scope = ['https://www.googleapis.com/auth/gmail.readonly'];

generateToken(credentials, scope)
  .then(token => {
    fs.writeFile(tokenPath, JSON.stringify(token), err => {
      if (err) {
        return console.error(err);
      }
      console.log('Token stored to', tokenPath);
    });
  })
  .catch(console.error);
