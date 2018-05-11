const request = require("supertest");
const {ObjectID} = require("mongodb");
const faker = require("faker");

require("../config/config");
const {prepareDatabase, resetDatabase} = require("../config/mockgoose");
const app = require("../../app");
const Comment = require("../../data/models/comment");

const {populatePosts, posts} = require("../seed/posts");
const {populateUsers, users} = require("../seed/users");
const {populateComments, comments} = require("../seed/comments");
const {populateProfiles} = require("../seed/profiles");

describe("commentController", () => {
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

  describe("PUT /api/comments/:id", () => {
    it("should update comment with correct data", async () => {
      const comment = comments[0];
      const data = {
        ...comment,
        content: faker.lorem.text()
      };

      await request(app)
        .put(`/api/comments/${comments[0]._id}`)
        .set("x-auth", users[0].token)
        .send(data)
        .expect(200);

      const updatedComment = await Comment.findById(comment._id);

      expect(updatedComment.content).toEqual(data.content);
    });

    it("should not update another user's comment", async () => {
      const id = comments[1]._id;

      await request(app)
        .put(`/api/comments/${id}`)
        .set("x-auth", users[0].token)
        .send({})
        .expect(401);
    });

    it("should return 400 on invalid object id", async () => {
      const id = new ObjectID();

      await request(app)
        .put(`/api/comments/${id}`)
        .set("x-auth", users[0].token)
        .send({})
        .expect(400);
    });

    it("should return 401 on unauthorized request", async () => {
      const id = comments[0]._id;

      await request(app)
        .put(`/api/comments/${id}`)
        .expect(401);
    });
  });

  describe("GET /api/comments/:id", () => {
    it("should get a comment on valid id", async () => {
      const id = comments[0]._id;

      await request(app)
        .get(`/api/comments/${id}`)
        .set("x-auth", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.content).toEqual(comments[0].content);
        });
    });

    it("should return 401 on unauthorized request", async () => {
      const id = comments[0]._id;

      await request(app)
        .get(`/api/comments/${id}`)
        .expect(401);
    });

    it("should return 400 on invalid id", async () => {
      const id = "123";

      await request(app)
        .get(`/api/comments/${id}`)
        .set("x-auth", users[0].token)
        .expect(400);
    });
  });

  describe("DELETE /api/comments/:id", () => {
    it("should delete comment with valid id", async () => {
      const id = comments[0]._id;

      await request(app)
        .delete(`/api/comments/${id}`)
        .set("x-auth", users[0].token)
        .expect(200);

      const comment = await Comment.findById(id);

      expect(comment).toBeFalsy();
    });

    it("should return 400 on invalid object id", async () => {
      const id = "123";

      await request(app)
        .delete(`/api/comments/${id}`)
        .set("x-auth", users[0].token)
        .expect(400);
    });

    it("should return 401 on unauthorized request", async () => {
      const id = comments[0]._id;

      await request(app)
        .delete(`/api/comments/${id}`)
        .expect(401);
    });

    it("should not delete another user's comment", async () => {
      const id = comments[1]._id;

      await request(app)
        .delete(`/api/comments/${id}`)
        .set("x-auth", users[0].token)
        .expect(401);
    });
  });
});
