# restaurant_list

## 環境建置
1. Node.js@14.16.0
2. Express@4.16.4
3. Express-handlebars@3.0.0
4. Mongoose@5.9.7
5. method-override

## 安裝步驟
1. git clone 

2. 安裝Node.js 

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

3. 安裝Express

```bash
npm install express@4.16.4
```

4. 安裝Express-handlebars
```bash
npm i express-handlebars@3.0.0
```

5. 安裝Mongoose, body-parser, method-override
```bash
npm i mongoose@5.9.7 body-parser method-override
```

6. 設定環境變數  
MONGODB_URI = mongodb+srv://你的帳號:你的密碼@cluster0.rwy64fu.mongodb.net/restaurant-list?retryWrites=true&w=majority
LC_CTYPE=UTF-8  

7. Seeder
```bash
npm run seed
```

8. Testing 

```bash 
npm run dev
```

## 功能
1. 基本餐廳列表

2. 點擊可顯示詳細餐廳資訊

3. 可透過輸入餐廳名稱或類別的關鍵字搜尋餐廳

4. 連結MongoDB，可讀寫遠端資料庫

5. 利用add a new restaurant新增餐廳至資料庫


