const request = require("supertest");
const {ObjectID} = require("mongodb");
const faker = require("faker");

require("../config/config");
const {prepareDatabase, resetDatabase} = require("../config/mockgoose");
const app = require("../../app");
const Post = require("../../data/models/post");

const {populatePosts, posts} = require("../seed/posts");
const {populateUsers, users} = require("../seed/users");

describe("postController", () => {
  jest.setTimeout(12000);

  beforeAll(async () => {
    await prepareDatabase();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  describe("GET /api/posts/:id", () => {
    let token;
    const [userOne] = users;

    beforeEach(async () => {
      await populateUsers();
      await populatePosts();

      const {email, password} = userOne;

      const res = await request(app)
        .post("/auth/login")
        .send({email, password});

      token = res.headers["x-auth"];
    });

    it("should get post with correct id", async () => {
      const id = posts[0]._id;

      await request(app)
        .get(`/api/posts/${id}`)
        .set("x-auth", token)
        .expect(200)
        .expect(res => {
          expect(res.body.title).toEqual(posts[0].title);
        });
    });

    it("should not access another user's post", async () => {
      const id = posts[1]._id;

      await request(app)
        .get(`/api/posts/${id}`)
        .set("x-auth", token)
        .expect(401);
    });

    it("should not return 401 on unauthorized request", async () => {
      const id = posts[0]._id;

      await request(app)
        .get(`/api/posts/${id}`)
        .expect(401);
    });

    it("should return 400 on invalid id", async () => {
      const id = new ObjectID();

      await request(app)
        .get(`/api/posts/${id}`)
        .set("x-auth", token)
        .expect(400);
    });
  });

  describe("POST /api/posts/:id", () => {
    const [userOne] = users;
    let token;

    beforeEach(async () => {
      await populateUsers();

      const {email, password} = userOne;

      const res = await request(app)
        .post("/auth/login")
        .send({email, password});

      token = res.headers["x-auth"];
    });

    it("should create a new post with valid data", async () => {
      const data = {
        _id: new ObjectID(),
        title: faker.name.title(),
        content: faker.lorem.text()
      };

      await request(app)
        .post("/api/posts")
        .set("x-auth", token)
        .send(data)
        .expect(201)
        .expect(res => {
          expect(res.body.author).toEqual(userOne._id.toHexString());
        });

      const post = await Post.findById(data._id);
      expect(post.title).toEqual(data.title);
      expect(post.content).toEqual(data.content);
    });

    it("should not return 401 on unauthorized request", async () => {
      await request(app)
        .post(`/api/posts/`)
        .expect(401);
    });

    it("should return 400 on invalid data", async () => {
      await request(app)
        .post("/api/posts/")
        .set("x-auth", token)
        .send({})
        .expect(400);
    });
  });

  describe("PUT /api/posts/:id", () => {
    let token;
    const [userOne] = users;

    beforeEach(async () => {
      await populateUsers();
      await populatePosts();

      const {email, password} = userOne;

      const res = await request(app)
        .post("/auth/login")
        .send({email, password});

      token = res.headers["x-auth"];
    });

    it("should update post with correct data", async () => {
      const post = posts[0];
      const data = {
        ...post,
        title: faker.name.title()
      };

      await request(app)
        .put(`/api/posts/${post._id}`)
        .set("x-auth", token)
        .send(data)
        .expect(200);

      const updatedPost = await Post.findById(post._id);
      expect(updatedPost.title).toEqual(data.title);
    });

    it("should not update another user's post", async () => {
      const id = posts[1]._id;

      await request(app)
        .delete(`/api/posts/${id}`)
        .set("x-auth", token)
        .expect(401);
    });

    it("should return 400 on invalid object id", async () => {
      const id = new ObjectID();

      await request(app)
        .put(`/api/posts/${id}`)
        .set("x-auth", token)
        .send({})
        .expect(400);
    });

    it("should not return 401 on unauthorized request", async () => {
      const id = posts[0]._id;

      await request(app)
        .get(`/api/posts/${id}`)
        .expect(401);
    });
  });

  describe("DELETE /api/posts/:id", async () => {
    let token;
    const [userOne] = users;

    beforeEach(async () => {
      await populateUsers();
      await populatePosts();

      const {email, password} = userOne;

      const res = await request(app)
        .post("/auth/login")
        .send({email, password});

      token = res.headers["x-auth"];
    });

    it("deletes a post on valid id", async () => {
      const id = posts[0]._id;

      await request(app)
        .delete(`/api/posts/${id}`)
        .set("x-auth", token)
        .expect(200);

      const post = await Post.findById(id);

      expect(post).toBeFalsy();
    });

    it("should return 400 on invalid object id", async () => {
      const id = new ObjectID();

      await request(app)
        .delete(`/api/posts/${id}`)
        .set("x-auth", token)
        .expect(400);
    });

    it("should not return 401 on unauthorized request", async () => {
      const id = posts[0]._id;

      await request(app)
        .delete(`/api/posts/${id}`)
        .expect(401);
    });

    it("should not delete another user's post", async () => {
      const id = posts[1]._id;

      await request(app)
        .delete(`/api/posts/${id}`)
        .set("x-auth", token)
        .expect(401);
    });
  });

  describe("GET /api/posts", async () => {
    let token;
    const [userOne] = users;

    beforeEach(async () => {
      await populateUsers();
      await populatePosts();

      const {email, password} = userOne;

      const res = await request(app)
        .post("/auth/login")
        .send({email, password});

      token = res.headers["x-auth"];
    });

    it("should get a user's posts", async () => {
      await request(app)
        .get("/api/posts")
        .set("x-auth", token)
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it("should return 401 on unauthorized request", async () => {
      await request(app)
        .get("/api/posts")
        .expect(401);
    });
  });
});
