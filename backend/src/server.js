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

mongo.connect();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser("user_secret"));
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

app.use("/", routes);

const server = app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port " + server.address().port);
});
