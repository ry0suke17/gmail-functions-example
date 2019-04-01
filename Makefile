PROJECT_ID=gcp-playground-235103
PUBSUB_TOPIC=gmail-example

# pubsub のトピックを作成する。
iam/policy/gmail:
	# Gmail の通知を受け取るには権限を追加する必要がある。
	# ref. https://developers.google.com/gmail/api/guides/push#grant_publish_rights_on_your_topic
	gcloud beta pubsub topics add-iam-policy-binding \
		--project $(PROJECT_ID) \
		--member serviceAccount:gmail-api-push@system.gserviceaccount.com \
		--role roles/pubsub.publisher \
		$(PUBSUB_TOPIC) 

# functions の helloPubSub 関数を削除する。PubSub のサブスクリプションも一緒に削除される（トピックは削除されない）。
functions/delete:
	firebase functions:delete helloPubSub

# pubsub のトピックとサブスクリプションを削除する。
pubsub/delete:
	gcloud pubsub topics delete --project=$(PROJECT_ID) $(PUBSUB_TOPIC)

# pubsub にメッセージをプッシュする
pubsub/test/publish:
	gcloud pubsub topics publish $(PUBSUB_TOPIC) --message="test"
