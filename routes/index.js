const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const myDB = require("../db/MyDB.js");
const saltRounds = 10;

//This is the key GET route to work with react
// router.get("*", (req, res) =>
//   res.sendFile(path.resolve("front", "build", "index.html"))
// );

// index GET
// router.get("/", function (req, res) {
//   res.sendFile(path.resolve(__dirname), "front/build", "index.html");
// });

/* Post related section */
router.post("/createPost", async (req, res) => {
  try {
    console.log("create post");
    const postObj = {
      userId: req.user._id,
      username: req.user.username,
      title: req.body.title,
      category: req.body.category,
      content: req.body.content,
      createdAt: new Date(),
      comments: [],
      interested: [],
      open: true,
      lastUpdated: new Date(),
      groupMember: [],
    };
    const dbRes = await myDB.createPost(postObj);
    res.send({ p_id: dbRes.p_id });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/editPost", async (req, res) => {
  try {
    const dbRes = await myDB.editPost(req.body.postId, req.body.content);
    res.send({ p_id: dbRes.p_id });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/closePost", async (req, res) => {
  try {
    const dbRes = await myDB.closePost(req.body.postId);
    res.send(dbRes);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/getPosts", async (req, res) => {
  try {
    console.log(req.body);
    const nPerPage = 12;
    const page = +req.body.page || 0;
    const dbRes = await myDB.getPosts(req.body);
    res.send({
      posts: dbRes.slice(page * nPerPage, (page + 1) * nPerPage),
      total: dbRes.length,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/getPostById", async (req, res) => {
  try {
    const postId = req.body.id;
    const dbRes = await myDB.getPostById(postId);
    res.send(dbRes);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/likePost", async (req, res) => {
  try {
    const dbRes = await myDB.likePost(
      req.user._id,
      req.user.username,
      req.body.post
    );
    res.send(dbRes);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/unlikePost", async (req, res) => {
  try {
    const dbRes = await myDB.unlikePost(req.user._id, req.body.postId);
    res.send(dbRes);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/createTeam", async (req, res) => {
  try {
    const dbRes = await myDB.createTeam(req.body.post, req.body.teamMembers);
    res.send(dbRes);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});
/* Post related section */

/* Comment related section */
router.post("/createComment", async (req, res) => {
  try {
    const commentObj = {
      comment: req.body.comment,
      createdAt: new Date(),
    };
    const dbRes = await myDB.createComment(
      commentObj,
      req.user._id,
      req.user.username,
      req.body.postId
    );
    res.send(dbRes);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/editComment", async (req, res) => {
  try {
    console.log(req.body.comment);
    const dbRes = await myDB.editComment(
      req.body.postId,
      req.body.commentId,
      req.body.comment
    );
    res.send(dbRes);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.get("/getComments", async (req, res) => {
  try {
    const dbRes = await myDB.getComments(req.query);
    res.send(dbRes);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/deleteComment", async (req, res) => {
  try {
    const dbRes = await myDB.deleteComment(req.body.postId, req.body.commentId);
    res.send(dbRes);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});
/* Comment related section */

/* Auth related section */
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("successful login");
    console.log("userid", req.user._id);
    res.send({ userid: req.user._id });
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  console.log("successful logout");
  res.redirect("/");
});

router.post("/checkSameUserName", async (req, res) => {
  try {
    console.log("query", req.body);
    const result = await myDB.findSameUserName(req.body);
    res.send({ same: result });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log("user register info", req.body);
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
    const userObj = {
      username: req.body.username,
      password: hashedPwd,
      posted: [],
      teamuped: [],
      interested: [],
    };

    const dbRes = await myDB.createUser(userObj);

    if (dbRes == null) {
      console.log("error!!!");
      res.send({ userid: null });
      //res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        console.log("successful register and login");
        console.log("userid", req.user._id);
        res.send({ userid: req.user._id });
        //res.redirect("/login");
      });
    }
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});
/* Auth related section */

/* User related section */
router.post("/getUserByName", async (req, res) => {
  try {
    const username = req.body.username;
    const dbRes = await myDB.getUserByName(username);
    const userInfo = {
      username: dbRes[0].username,
      posted: dbRes[0].posted,
      teamuped: dbRes[0].teamuped,
      interested: dbRes[0].interested,
    };
    res.send(userInfo);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.get("/getUser", (req, res) =>
  res.send({
    username: req.user ? req.user.username : null,
    posted: req.user ? req.user.posted : null,
    teamuped: req.user ? req.user.teamuped : null,
    interested: req.user ? req.user.interested : null,
  })
);
/* User related section */

module.exports = router;
