const { MongoClient, ObjectId } = require("mongodb");

function MyDB() {
  const myDB = {};

  const url = process.env.MONGODB_URI;

  const DB_NAME = "5610Project3";

  /* Post related section */
  myDB.createPost = async (post) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const postsCol = db.collection("posts");
      const u_id = new ObjectId(post.userId);

      const res1 = await postsCol.insertOne(post);
      const p_id = new ObjectId(res1.ops[0]._id);
      const res2 = await db.collection("Users").updateOne(
        { _id: u_id },
        {
          $push: {
            posted: {
              _id: p_id,
              title: post.title,
              createdAt: post.createdAt,
              category: post.category,
            },
          },
        }
      );
      return { res1, res2, p_id };
    } finally {
      client.close();
    }
  };

  myDB.editPost = async (postId, content) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const p_id = new ObjectId(postId);
      const res = await db.collection("posts").updateOne(
        { _id: p_id },
        {
          $set: {
            content: content,
            lastUpdated: new Date(),
          },
        }
      );
      return { res, p_id };
    } finally {
      client.close();
    }
  };

  myDB.getPosts = async (query) => {
    let client;
    try {
      console.log(query.query);
      console.log(query.category);
      const titleQuery = query.query || "";
      const catQuery = query.category || "";
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const postsCol = db.collection("posts");
      const posts = await postsCol
        .find({
          category: { $regex: catQuery },
          title: { $regex: titleQuery },
          open: true,
        })
        .sort({ createdAt: -1 })
        .toArray();
      return posts;
    } finally {
      client.close();
    }
  };

  myDB.getPostById = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const postsCol = db.collection("posts");
      let o_id = new ObjectId(query);
      const post = await postsCol.find({ _id: o_id }).toArray();
      return post[0];
    } finally {
      client.close();
    }
  };

  myDB.closePost = async (postId) => {
    let client;
    try {
      const p_id = new ObjectId(postId);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const res = await db.collection("posts").updateOne(
        { _id: p_id },
        {
          $set: {
            open: false,
          },
        }
      );
      return res;
    } finally {
      client.close();
    }
  };

  myDB.likePost = async (userId, username, post) => {
    let client;
    try {
      const u_id = new ObjectId(userId);
      const p_id = new ObjectId(post._id);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const res1 = await db.collection("posts").updateOne(
        { _id: p_id },
        {
          $push: {
            interested: {
              userId: u_id,
              username: username,
            },
          },
        }
      );
      const res2 = await db.collection("Users").updateOne(
        { _id: u_id },
        {
          $push: {
            interested: {
              _id: p_id,
              title: post.title,
              createdAt: new Date(),
              category: post.category,
            },
          },
        }
      );
      return { res1, res2 };
    } finally {
      client.close();
    }
  };

  myDB.unlikePost = async (userId, postId) => {
    let client;
    try {
      const u_id = new ObjectId(userId);
      const p_id = new ObjectId(postId);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const res1 = await db.collection("posts").updateOne(
        { _id: p_id },
        {
          $pull: {
            interested: {
              userId: u_id,
            },
          },
        }
      );
      const res2 = await db.collection("Users").updateOne(
        { _id: u_id },
        {
          $pull: {
            interested: {
              post_id: p_id,
            },
          },
        }
      );
      return { res1, res2 };
    } finally {
      client.close();
    }
  };

  myDB.createTeam = async (post, teamMembers) => {
    let client;
    try {
      console.log(teamMembers);
      const p_id = new ObjectId(post._id);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const res1 = await db.collection("posts").updateOne(
        { _id: p_id },
        {
          $set: {
            groupMember: teamMembers,
            open: false,
          },
        }
      );

      const res2 = await db.collection("Users").updateMany(
        { username: { $in: teamMembers } },
        {
          $push: {
            teamuped: {
              _id: p_id,
              title: post.title,
              createdAt: post.createdAt,
              category: post.category,
            },
          },
        }
      );
      return { res1, res2 };
    } finally {
      client.close();
    }
  };
  /* Post related section */

  /* Comment related section */
  myDB.createComment = async (comment, userId, username, postId) => {
    let client;
    try {
      const u_id = new ObjectId(userId);
      comment.user = { _id: u_id };
      const p_id = new ObjectId(postId);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const newId = new ObjectId();
      //need to add a post backend verification
      const res = await db.collection("posts").updateOne(
        { _id: p_id },
        {
          $push: {
            comments: {
              _id: newId,
              userId: u_id,
              username: username,
              content: comment.comment,
              createdAt: new Date(),
            },
          },
        }
      );
      return res;
    } finally {
      client.close();
    }
  };

  myDB.editComment = async (postId, commentId, comment) => {
    let client;
    try {
      const c_id = new ObjectId(commentId);
      const p_id = new ObjectId(postId);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      //need to add a post backend verification
      const res = await db.collection("posts").updateOne(
        { _id: p_id, "comments._id": c_id },
        {
          $set: {
            "comments.$.content": comment,
          },
        }
      );
      return res;
    } finally {
      client.close();
    }
  };

  myDB.deleteComment = async (postId, commentId) => {
    let client;
    try {
      const c_id = new ObjectId(commentId);
      const p_id = new ObjectId(postId);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      //need to add a post backend verification
      const res = await db.collection("posts").updateOne(
        { _id: p_id },
        {
          $pull: {
            comments: {
              _id: c_id,
            },
          },
        }
      );
      return res;
    } finally {
      client.close();
    }
  };

  myDB.getComments = async (query) => {
    let client;
    try {
      const p_id = new ObjectId(query);
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const postsCol = db.collection("posts");
      const post = await postsCol.find({ _id: p_id }).toArray();
      return post[0].comments;
    } finally {
      client.close();
    }
  };
  /* Comment related section */

  /* User related section */
  myDB.createUser = async (user) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCol = db.collection("Users");
      const existed = await usersCol.findOne({ username: user.username });
      if (existed != null) {
        return null;
      } else {
        const res = await usersCol.insertOne(user);
        return res;
      }
    } finally {
      client.close();
    }
  };

  myDB.findSameUserName = async (query = {}) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const userCol = db.collection("Users");
      const data = await userCol.find(query).toArray();

      if (data != null && data.length == 1) {
        if (data[0].username === query.username) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } finally {
      client.close();
    }
  };

  myDB.findUserByUserName = async (query = {}, done) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const userCol = db.collection("Users");
      const data = await userCol.find(query).toArray();

      if (data != null && data.length == 1) {
        return done(null, data[0]);
      } else {
        return done(null, null);
      }
    } finally {
      client.close();
    }
  };

  myDB.findUserById = async (query = {}, done) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const userCol = db.collection("Users");
      const data = await userCol.find(query).toArray();

      if (data != null && data.length == 1) {
        return done(null, data[0]);
      } else {
        return done(null, null);
      }
    } finally {
      client.close();
    }
  };

  myDB.getUserByName = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const userCol = db.collection("Users");
      const data = await userCol.find({ username: query }).toArray();
      return data;
    } finally {
      client.close();
    }
  };
  /* User related section */

  return myDB;
}

module.exports = MyDB();
