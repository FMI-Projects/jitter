const request = require("supertest");
const { ObjectID } = require("mongodb");
const faker = require("faker");

require("../config/config");
const { prepareDatabase, resetDatabase } = require("../config/mockgoose");
const app = require("../../app");
const Post = require("../../data/models/post");

const { populatePosts, posts } = require("../seed/posts");
const { populateProfiles } = require("../seed/profiles");
const { populateUsers, users } = require("../seed/users");
const { populateComments } = require("../seed/comments");

describe("postController", () => {
  beforeAll(async () => {
    jest.setTimeout(10000);

    await prepareDatabase();
  });

  beforeEach(async () => {
    await resetDatabase();

    await populateUsers();
    await populateProfiles();
    await populatePosts();
    await populateComments();
  });

  describe("GET /api/posts/:id", () => {
    it("should get post with correct id", async () => {
      const id = posts[0]._id;

      await request(app)
        .get(`/api/posts/${id}`)
        .set("x-auth", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.title).toEqual(posts[0].title);
        });
    });

    it("should return 401 on unauthorized request", async () => {
      const id = posts[0]._id;

      await request(app)
        .get(`/api/posts/${id}`)
        .expect(401);
    });

    it("should return 422 on invalid id", async () => {
      const id = "123";

      await request(app)
        .get(`/api/posts/${id}`)
        .set("x-auth", users[0].token)
        .expect(422);
    });
  });

  describe("POST /api/posts/", () => {
    it("should create a new post with valid data", async () => {
      const data = {
        _id: new ObjectID(),
        title: faker.name.title(),
        content: faker.lorem.text()
      };

      await request(app)
        .post("/api/posts")
        .set("x-auth", users[0].token)
        .send(data)
        .expect(201)
        .expect(res => {
          expect(res.body.author).toEqual(users[0]._id.toHexString());
        });

      const post = await Post.findById(data._id);
      expect(post.title).toEqual(data.title);
      expect(post.content).toEqual(data.content);
    });

    it("should return 401 on unauthorized request", async () => {
      await request(app)
        .post("/api/posts/")
        .expect(401);
    });

    it("should return 422 on invalid data", async () => {
      await request(app)
        .post("/api/posts/")
        .set("x-auth", users[0].token)
        .send({})
        .expect(422);
    });
  });

  describe("PUT /api/posts/:id", () => {
    it("should update post with correct data", async () => {
      const post = posts[0];
      const data = {
        ...post,
        title: faker.name.title()
      };

      await request(app)
        .put(`/api/posts/${post._id}`)
        .set("x-auth", users[0].token)
        .send(data)
        .expect(200);

      const updatedPost = await Post.findById(post._id);
      expect(updatedPost.title).toEqual(data.title);
    });

    it("should not update another user's post", async () => {
      const id = posts[1]._id;

      await request(app)
        .put(`/api/posts/${id}`)
        .set("x-auth", users[0].token)
        .expect(403);
    });

    it("should return 422 on invalid object id", async () => {
      const id = "123";

      await request(app)
        .put(`/api/posts/${id}`)
        .set("x-auth", users[0].token)
        .send({})
        .expect(422);
    });

    it("should return 401 on unauthorized request", async () => {
      const id = posts[0]._id;

      await request(app)
        .put(`/api/posts/${id}`)
        .expect(401);
    });
  });

  describe("DELETE /api/posts/:id", async () => {
    it("should delete post on valid id", async () => {
      const id = posts[0]._id;

      await request(app)
        .delete(`/api/posts/${id}`)
        .set("x-auth", users[0].token)
        .expect(204);

      const post = await Post.findById(id);

      expect(post).toBeFalsy();
    });

    it("should return 422 on invalid object id", async () => {
      const id = "123";

      await request(app)
        .delete(`/api/posts/${id}`)
        .set("x-auth", users[0].token)
        .expect(422);
    });

    it("should return 401 on unauthorized request", async () => {
      const id = posts[0]._id;

      await request(app)
        .delete(`/api/posts/${id}`)
        .expect(401);
    });

    it("should not delete another user's post", async () => {
      const id = posts[1]._id;

      await request(app)
        .delete(`/api/posts/${id}`)
        .set("x-auth", users[0].token)
        .expect(403);
    });
  });

  describe("GET /api/post/:id/comments", () => {
    it("should get a posts's comments", async () => {
      const id = posts[0]._id;

      await request(app)
        .get(`/api/posts/${id}/comments`)
        .set("x-auth", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it("should return 401 on unauthorized request", async () => {
      const id = posts[0]._id;

      await request(app)
        .get(`/api/posts/${id}/comments`)
        .expect(401);
    });
  });

  describe("POST /api/comments/:id", () => {
    it("should create a new comment with valid data", async () => {
      const content = faker.lorem.text();

      const data = {
        _id: new ObjectID(),
        content: content
      };

      await request(app)
        .post(`/api/posts/${posts[0]._id}/comments`)
        .set("x-auth", users[0].token)
        .send(data)
        .expect(201)
        .expect(res => {
          expect(res.body.content).toEqual(content);
          expect(res.body.author).toEqual(users[0]._id.toHexString());
          expect(res.body.post).toEqual(posts[0]._id.toHexString());
        });
    });

    it("should return 401 on unauthorized request", async () => {
      await request(app)
        .post(`/api/posts/${posts[0]._id}/comments`)
        .expect(401);
    });

    it("should return 422 on invalid data", async () => {
      await request(app)
        .post(`/api/posts/${posts[0]._id}/comments`)
        .set("x-auth", users[0].token)
        .send({})
        .expect(422);
    });
  });
});
