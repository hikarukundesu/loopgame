# Loopgame VPS セットアップ手順

対象: Xserver VPS + Ubuntu + PostgreSQL + Node.js + Stripe

## このガイドでやること

- VPS にログインする
- Node.js / PostgreSQL / Nginx を入れる
- GitHub からゲームを取得する
- アプリを起動する
- 保存データと Stripe の準備を進める

## 1. 事前に用意するもの

- Xserver VPS の契約済みサーバー
- VPS の IP アドレス
- `root` パスワードまたは SSH キー
- GitHub リポジトリ: `https://github.com/hikarukundesu/loopgame.git`
- 将来的に Stripe アカウント

## 2. VPS に接続する

自分の PC のターミナルで、次のように接続します。

```bash
ssh root@あなたのVPSのIPアドレス
```

例:

```bash
ssh root@123.45.67.89
```

初回は `yes` と入力して Enter、次に root パスワードを入力します。

## 3. Ubuntu を更新する

```bash
apt update
apt upgrade -y
```

## 4. 必要なソフトを入れる

```bash
apt install -y curl git nginx postgresql postgresql-contrib
```

## 5. Node.js を入れる

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

node -v
npm -v
```

## 6. GitHub からコードを取得する

```bash
cd /root
git clone https://github.com/hikarukundesu/loopgame.git
cd loopgame
npm install
```

## 7. PostgreSQL を作る

```bash
sudo -u postgres psql
```

中で次を実行します。

```sql
CREATE DATABASE loopgame;
CREATE USER loopgame_user WITH ENCRYPTED PASSWORD '強いパスワード';
GRANT ALL PRIVILEGES ON DATABASE loopgame TO loopgame_user;
\q
```

## 8. 環境変数ファイルを作る

```bash
nano /root/loopgame/.env
```

中身の例:

```env
DATABASE_URL=postgresql://loopgame_user:強いパスワード@localhost:5432/loopgame
JWT_SECRET=長くてランダムな秘密文字列
PORT=3000
```

## 9. アプリを起動する

```bash
cd /root/loopgame
npm start
```

正常なら `Loopgame server listening on 3000` のような表示が出ます。

## 10. Nginx で外部公開する

```bash
nano /etc/nginx/sites-available/loopgame
```

中身の例:

```nginx
server {
    listen 80;
    server_name あなたのIPまたはドメイン;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

有効化して再起動します。

```bash
ln -s /etc/nginx/sites-available/loopgame /etc/nginx/sites-enabled/loopgame
nginx -t
systemctl restart nginx
```

## 11. 本番では PM2 などで常駐化する

```bash
npm install -g pm2
cd /root/loopgame
pm2 start server.js --name loopgame
pm2 save
pm2 startup
```

## 12. Stripe はどうつなぐか

- 決済処理は Stripe Checkout を使う
- 決済成功は Stripe webhook で受ける
- 保存データは PostgreSQL に保存する
- カード情報は自前で持たない

## 13. 最後にやること

- 独自ドメインを取得したら Nginx の `server_name` を変える
- SSL は Let’s Encrypt で入れる
- DB の定期バックアップを設定する
- Stripe webhook の署名検証を入れる

## 困ったとき

エラーが出たら、コマンドと表示された全文をそのまま保存しておくと解決しやすいです。
