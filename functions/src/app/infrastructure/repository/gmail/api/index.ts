import { Credentials, OAuth2Client } from 'google-auth-library';
import { gmail_v1, google } from 'googleapis';

export default class GmailAPIClient {
  private apiClient: gmail_v1.Gmail;

  constructor(
    private readonly credentials: any,
    private readonly token: Credentials,
  ) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );

    oAuth2Client.setCredentials(token);

    this.apiClient = google.gmail({
      version: 'v1',
      auth: oAuth2Client,
    });
  }

  /**
   * watch は Gmail のメール受信を監視する。
   * @param topicName Publish する PubSub のトピック名を表す。
   */
  public watch(topicName: string): Promise<gmail_v1.Schema$WatchResponse> {
    return new Promise((resolve, reject) => {
      this.apiClient.users.watch(
        {
          userId: 'me',
          requestBody: {
            topicName,
          },
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          if (!res) {
            reject(`failed gmail watch. can't get response.`);
          } else {
            resolve(res.data);
          }
        },
      );
    });
  }

  /**
   * stop は Gmail のメール受信の監視を止める。
   */
  public stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiClient.users.stop(
        {
          userId: 'me',
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          if (!res) {
            reject(`failed gmail stop. can't get response.`);
          } else {
            resolve(res.data);
          }
        },
      );
    });
  }

  /**
   * histories は履歴の一覧を取得する。
   * @param historyID 取得開始の履歴の ID を表す。
   */
  public histories(
    historyID: string,
  ): Promise<gmail_v1.Schema$ListHistoryResponse> {
    return new Promise((resolve, reject) => {
      this.apiClient.users.history.list(
        {
          userId: 'me',
          startHistoryId: historyID,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          if (!res) {
            reject(`failed gmail get histories. can't get response.`);
          } else {
            resolve(res.data);
          }
        },
      );
    });
  }

  /**
   * message メッセージを取得する.
   * @param messageID メッセージの ID を表す。
   */
  public message(messageID: string) {
    return new Promise((resolve, reject) => {
      this.apiClient.users.messages.get(
        {
          userId: 'me',
          id: messageID,
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          if (!res) {
            reject(`failed gmail get message. can't get response.`);
          } else {
            resolve(res.data);
          }
        },
      );
    });
  }
}
