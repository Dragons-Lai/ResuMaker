import express from "express";
import session from 'express-session';
import MongoStore from 'connect-mongo'
import cors from "cors";
import dotenv from "dotenv-defaults";
import passport from "passport"
import passport_local from "passport-local"
const LocalStrategy = passport_local.Strategy
import bcrypt from "bcrypt-nodejs"
import mongo from "./mongo.js";
import routes from "./routes/api.js";

dotenv.config();



// 初始化 Passport
passport.use('login', new LocalStrategy({
  passReqToCallback: true
}, function (req, username, password, done) {
  console.log("hihilllll")
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err)
    }

    if (!user) {  
      return done(null, false)
    }

    var isValidPassword = function (user, password) {
      return bcrypt.compareSync(password, user.password)
    }

    if (!isValidPassword(user, password)) {
      return done(null, false)
    }

    return done(null, user)
  })
}));



const app = express();
app.use(cors({
  origin: ['http://localhost:3000'], // 這裡之後要替換成我們服務綁定的網址
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: "user_session",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL, 
    ttl: 14 * 24 * 60 * 60,
    maxAge: 300000,
    autoRemove: 'native'
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/", routes);

mongo.connect();

const server = app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port " + server.address().port);
});
