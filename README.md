# GcloudのCloud Container+Cloud Buildだけでサーバー＋クライアント環境を構築

# RUBYを使って、現在のディレクトリで操作
docker run -it -v $(pwd):/app ruby:2.3 sh
# Ruby コンテナの上で：
gem install -N travis
travis login
cd  /app
# serviceAccontを暗号化する
travis encrypt-file service-account.json -r someonesgarden/spotifire-k8s
travis encrypt-file spotifire-tokyo-9ecf8bb024b0.json -r someonesgarden/spotifire-k8s
//

spotifire-tokyo-00c040539b51.json
この結果表示される
「openssl aes-256-cbc -K $encrypted_0c35eebf403c_key -iv $encrypted_0c35eebf403c_iv -in service-account.json.enc -out service-account.json -d」
を.travis.ymlファイルにコピペする
