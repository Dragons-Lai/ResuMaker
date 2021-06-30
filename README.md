# 線上履歷表

一個提供大家寫和排版履歷的網站，發想來自於 [Cake Resume](https://www.cakeresume.com/)

**目錄**
- [線上履歷表](#線上履歷表)
- [Localhost 執行方式](#localhost-執行方式)
- [功能介紹](#功能介紹)

# Localhost 執行方式

1. 到 `./frontend` 和 `./backend` 裡面先安裝好 npm 套件

```sh
cd frontend && yarn
cd backend && yarn
```

2. 先準備一個 monogdb 的 url 寫入 `./backend/.env`:

```
MONGO_URL=mongodb+srv://....
```

3. 可以到根目錄去執行 `yarn start` 或者開兩個 console 來個別執行 `yarn start` 和 `yarn server`

```sh
yarn start

# 或者

cd frontend && yarn start
cd backend && yarn server
```

# 功能介紹



#- [線上履歷表](#線上履歷表)
- [線上履歷表](#線上履歷表)
- [Localhost 執行方式](#localhost-執行方式)
- [功能介紹](#功能介紹)

賴群龍: 
- 前端路由控制
- chunk樣式(type2~type6)
- 前後端溝通(chunk相關)
- homepage/loginform/registerform設計

B0670530 蕭昀豪: 
- 履歷分享
- 編輯模式/預覽模式轉換
- 身份驗證
- 密碼加密
- 前端路由控制(未登入者禁入/resume，已登入者禁入/register、/login、履歷分享網址)
- chunk樣式(infoChunk_1)
- redux 架構
- chunk 功能(新增/刪除)
- 前後端溝通(login/register相關)

B06705046 彭穎飛: 
- 雲端部署
- chunk功能(往上移動/往下移動)、
- Header/Sidebar/ButtonMenu設計
