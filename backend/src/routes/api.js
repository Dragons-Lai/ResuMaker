// ===
// Ref: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
// ===

import { Router } from "express";
import passport from "passport";
import passport_local from "passport-local";
const LocalStrategy = passport_local.Strategy;

import Chunk from "../models/Chunk.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

const COOKIES_OPTIONS = {
  httpOnly: false, // The cookie only accessible by the web server
  signed: true, // Indicates if the cookie should be signed
};

const router = Router();

async function isAuthenticated(req, res, next) {
  console.log("Authenticated", req.isAuthenticated());
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    // if we need to refresh, take action here.
    return next();
  }

  // if they aren't redirect them to the home page
  res.json({ message: "Not login yet. " });
}

async function vieweeOrUser(req, res, next) {
  const viewee = req.query.viewee;
  if (viewee) {
    const query = await User.findOne({ account: viewee }, "sharable _id");
    if (query === null || !query.sharable) {
      // 不在回傳訊息加是找不到人還是他不公開是因為這也是提供給客的訊息
      res.status(404).json({ message: "Cannot find the resume or the resume is not open. " });
    } else {
      req.viewee_id = query._id;
      return next();
    }
  } else {
    isAuthenticated(req, res, next);
  }
}

router.get("/getUserName", isAuthenticated, async function (req, res) {
  try {
    const user_id = req.user._id;
    let query = await User.findOne({ _id: user_id });

    if (query === null) {
      res.send("");
    } else {
      const userName = query.userName;
      res.send(userName);
    }
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

router.get("/getSharable", isAuthenticated, async function (req, res) {
  try {
    const user_id = req.user._id;
    let query = await User.findOne({ _id: user_id }, "sharable account");

    if (query === null) {
      res.send("");
    } else {
      const sharable = query.sharable;
      res.send({ sharable, url_suffix: query.account }); // url_suffix may change or encrypt in the futer.
    }
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

router.get("/getOrder", vieweeOrUser, async function (req, res) {
  try {
    // console.log("getOrder__viewee_id", req.viewee_id)
    var user_id;
    if (req.viewee_id) user_id = req.viewee_id;
    else user_id = req.user._id;

    // console.log("getOrder___user_id: ", user_id);
    let query = await Order.findOne({ user_id });

    if (query === null) {
      res.send({ ChunkIdList: [] });
    } else {
      const ChunkIdList = query.order;
      res.send({ ChunkIdList });
    }
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

router.get("/getChunk", vieweeOrUser, async function (req, res) {
  try {
    var user_id;
    if (req.viewee_id) user_id = req.viewee_id;
    else user_id = req.user._id;

    console.log("getChunk___parms: ", req.query);
    // console.log("getChunk___user_id: ", user_id);
    let query = await Chunk.find({ user_id });

    if (query.length === 0) {
      res.send({ ChunkList: [] });
    } else {
      res.send({ ChunkList: query });
    }
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

router.post("/saveOrder", isAuthenticated, async function (req, res) {
  try {
    const user_id = req.user._id;
    const chunk_order = req.body.ChunkIdList;
    const condition = { user_id };
    const update_info = { user_id, order: chunk_order };
    const result = await Order.findOneAndUpdate(condition, update_info, {
      new: true,
      upsert: true,
    });

    res.json({ message: "saveOrder done" });
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

router.post("/deleteChunks", isAuthenticated, async function (req, res) {
  try {
    const { DeleteChunkIdList } = req.body;
    // console.log("deleteChunks___DeleteChunkIdList: ", DeleteChunkIdList);
    for (var i = 0; i < DeleteChunkIdList.length; i++) {
      let condition = { id: DeleteChunkIdList[i] };
      await Chunk.deleteOne(condition);
    }
    res.json({ message: "deleteChunks done" });
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

router.post("/updateChunk", isAuthenticated, async function (req, res) {
  try {
    const { UpdateChunk } = req.body;
    const user_id = req.user._id;

    // console.log("updateChunk___user_id: ", user_id);
    // console.log("updateChunk___UpdateChunk: ", UpdateChunk);

    let condition = { user_id, id: UpdateChunk.id };
    const query = await Chunk.findOne(condition);
    if (query === null) {
      const chunk = new Chunk({
        user_id: user_id,
        id: UpdateChunk.id,
        type: UpdateChunk.type,
        value: UpdateChunk.value,
      });
      await chunk.save();
    } else {
      let update = { value: UpdateChunk.value };
      // console.log("update: ", update);
      await Chunk.findOneAndUpdate(condition, update);
    }
    res.json({ message: "updateChunk done" });
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

router.post("/setSharable", isAuthenticated, async function (req, res) {
  // return the sharable value after setting. 
  try {
    console.log(req.body);
    const { sharable } = req.body;
    const user_id = req.user._id;

    // console.log("updateChunk___user_id: ", user_id);
    // console.log("updateChunk___UpdateChunk: ", UpdateChunk);

    let condition = { _id: user_id };
    console.log("setSharable: ", sharable);
    await User.findOneAndUpdate(condition, { sharable });

    res.json({ message: "setSharable done" });
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

// login and register ==================================================
// login ---------------------------------------------------------------
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// 初始化 Passport
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "account",
      passwordField: "password",
      passReqToCallback: true,
      successRedirect: "/resume",
    },
    function (req, account, password, done) {
      User.findOne({ account: account }, function (err, user) {
        if (err) {
          console.log(err);
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      });
    }
  )
);

router.post(
  "/login",
  passport.authenticate("login", {
    failureFlash: "Invalid username or password.",
  }),
  function (req, res) {
    // Set cookie
    res.cookie("isLogin", "", COOKIES_OPTIONS);
    res.json({ message: "Login." });
  }
);

// isLogin ---------------------------------------------------------------
// router.get("/isLogin", (req, res, next) => {
//   if (req.isAuthenticated()) res.send(true);
//   else res.send(false);
// });

// register ---------------------------------------------------------------
router.post("/register", (req, res, next) => {
  const userInfo = {
    userName: req.body.userName,
    account: req.body.account,
    password: req.body.password,
  };

  User.findOne({ account: userInfo.account }, (err, user) => {
    if (err) {
      console.log(err, "Fail on registering a user. ");
      res.json({ message: "Something went wrong..." });
    } else {
      if (!user) {
        const newUser = new User(userInfo);
        newUser.save();
        res.json({ message: "Successfully registered. " });
      } else {
        res.json({ message: "This account has been registered. " });
      }
    }
  });
});

// logout ---------------------------------------------------------------
router.post("/logout", (req, res) => {
  req.logout();
  res.clearCookie("isLogin");
  res.end();
});

export default router;
