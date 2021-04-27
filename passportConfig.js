const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;
const db = require("./db/MyDB");
const ObjectId = require("mongodb").ObjectId;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      db.findUserByUserName({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    let o_id = new ObjectId(id);
    db.findUserById({ _id: o_id }, function (err, user) {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  });
};
