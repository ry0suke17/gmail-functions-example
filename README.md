# gmail-functions-example

[![CircleCI](https://circleci.com/gh/yneee/gmail-functions-example.svg?style=svg&circle-token=8e4a23059fddd88c1709e46902cbdb1754579609)](https://circleci.com/gh/yneee/gmail-functions-example)

gmail-functions-example is example that receive Gmail Push notification by Cloud Pub/Sub. The following document is referred to.

- [Push Notifications](https://developers.google.com/gmail/api/guides/push)

Flow of receiving a message:

`Gmail` -> `Cloud PubSub` -> `Cloud Functions`

## Setup

Flow of setup:

- Download OAuth Client Scecret
- Deploy Cloud Functions
- Add role to PubSub's topic by IAM
- Generate API token
- Request API for Gmail watch

### Download OAuth Client Scecret

Download Client Scecret for use Gmail API. The following document is referred to.

- [Downloading credentials for api access](https://cloud.google.com/genomics/downloading-credentials-for-api-access)

Make sure to save the file to `functions/keys/credentials.json`.

### Deploy Cloud Functions

```bash
cd functions
npm run deploy
```

### Add role to PubSub's topic by IAM

```bash
make iam/policy/gmail
```

### Generate API token

```bash
cd functions
npm run gmail-generate-token
```

Token file is saved to `functions/keys/token.json`.

### Request API for Gmail watch

```bash
npm run gmail-watch
```

## Development

Prerequisites:

- `node` 10.15.2
- `npm` 6.4.1
