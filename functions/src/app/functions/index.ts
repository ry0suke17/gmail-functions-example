import GmailAPIClient from '@infrastructure/repository/gmail/api';
import * as functions from 'firebase-functions';
import credentials from '../../../keys/credentials.json';
import token from '../../../keys/token.json';

const apiClient = new GmailAPIClient(credentials, token);

// 以下のチュートリアルを参考にした。firebase deploy すると PubSub の Topic, Subscribe が自動で作成される。
// ref. https://firebase.google.com/docs/functions/pubsub-events?hl=ja
exports.helloPubSub = functions.pubsub
  .topic('gmail-example')
  .onPublish((message, context) => {
    const messageBody = message.data
      ? Buffer.from(message.data, 'base64').toString()
      : null;

    if (!messageBody) {
      console.error('failed get message body.');
      // 以下の警告が出るので 0 を返す。
      // Function returned undefined, expected Promise or value.
      // tslint:disable-next-line: max-line-length
      // ref. https://stackoverflow.com/questions/47128440/google-firebase-errorfunction-returned-undefined-expected-promise-or-value?rq=1
      return 0;
    }

    const messageObj = JSON.parse(messageBody);
    const historyID = messageObj.historyId;

    if (!historyID) {
      console.error('failed get hisotyID.');
      return 0;
    }

    return apiClient
      .histories(historyID)
      .then(res => {
        console.log(`get response. response is ${res}`);
      })
      .catch(err => {
        console.error(`failed histories. err: ${err}`);
      });
  });
