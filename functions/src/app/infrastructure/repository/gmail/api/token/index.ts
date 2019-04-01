import fs from 'fs';
import { Credentials } from 'google-auth-library';
import { google } from 'googleapis';
import readline from 'readline';

/**
 * generateToken はトークンを生成する。
 * 以下のチュートリアルを参考にする。
 * ref. https://developers.google.com/gmail/api/quickstart/nodejs
 * @param credentials クレデンシャルを表す。
 * @param tokenPath トークンファイルの保存先を表す。
 * @param scope 権限スコープを表す。
 */
export function generateToken(
  credentials: any,
  scope: string[],
): Promise<Credentials> {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  // 認証の URL を生成して表示する {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  // }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    // Oauth 認証画面を表示して許可した後にコードが発行される。
    // そのコードの入力を待ちトークンを生成する。 {
    rl.question('Enter the code from that page here: ', code => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          reject(`Error retrieving access token', ${err}`);
        }
        if (!token) {
          reject(`Error can't generate token`);
        } else {
          resolve(token);
        }
      });
    });
    // }
  });
}
