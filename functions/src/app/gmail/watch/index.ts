import GmailAPIClient from '@infrastructure/repository/gmail/api';
import credentials from '../../../../keys/credentials.json';
import token from '../../../../keys/token.json';

const apiClient = new GmailAPIClient(credentials, token);

const topicName = 'projects/gcp-playground-235103/topics/gmail-example';

apiClient
  .stop()
  .then(() => {
    return apiClient.watch(topicName);
  })
  .then(res => {
    console.log(res);
  })
  .catch(console.error);
