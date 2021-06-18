// import mongo from './mongo';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import redis from 'redis';
import connect_redis from 'connect-redis';

dotenv.config();

var redisClient = redis.createClient();
var redisStore = connect_redis(session);  
redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

// gotta load in MONGO_URL before `mongo.connect()`
// require('dotenv-defaults').config();

const app = express();
app.use(cors());
app.use(express.json());
// Start a session; we use Redis for the session store.
// "secret" will be used to create the session ID hash (the cookie id and the redis key value)
// "name" will show up as your cookie name in the browser
// "cookie" is provided by default; you can add it to add additional personalized options
// The "store" ttl is the expiration time for each Redis session ID, in seconds
app.use(session({
  secret: 'ThisIsHowYouUseRedisSessionStorage',
  name: '_redisPractice',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 , maxAge: 30 * 60 * 1000}),
}));

app.use("/", async function(req, res){
  console.log("hihi", req.session)
  req.session.data = "test"
  res.end()
})
// mongo.connect();

const server = app.listen(process.env.PORT || 4000, function () {
  console.log('Listening on port ' + server.address().port);
});
