import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv-defaults";
import passport from "passport";
import flash from "flash";

import mongo from "./mongo.js";
import routes from "./routes/api.js";

dotenv.config();

// configuration ======================================================
mongo.connect();

// set up our express application
const app = express();
app.use(
  cors({
    origin: ["http://172.105.208.68", "http://172.105.208.68:3000", "http://localhost:3000"], // 這裡之後要替換成我們服務綁定的網址
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser("user_secret"));

// required for passport
app.use(
  session({
    secret: "user_session",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 14 * 24 * 60 * 60,
      maxAge: 1000 * 60 * 15,
      autoRemove: "native",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ===============================================================
app.use("/", routes);

// launch ===============================================================
const server = app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port " + server.address().port);
});
