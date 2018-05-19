const { ObjectID } = require("mongodb");

const Post = require("../../../data/models/post");

describe("post", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be invalid if title is empty", async () => {
    const post = new Post({ title: "", author: new ObjectID() });

    let error;

    try {
      await post.validate();
    } catch (e) {
      error = e;
    }

    expect(error.errors.title).toBeDefined();
  });

  it("should be invalid if author is empty", async () => {
    const post = new Post({ title: "aTitle" });

    let error;

    try {
      await post.validate();
    } catch (e) {
      error = e;
    }

    expect(error.errors.author).toBeDefined();
  });

  it("should be valid with valid input", async () => {
    const post = new Post({ title: "aTitle", author: new ObjectID() });

    let error;

    try {
      post.validate();
    } catch (e) {
      error = e;
    }

    expect(error).not.toBeDefined();
  });

  describe("static methods", () => {
    describe("findUserPosts", () => {
      it("should return user posts with correct input", async () => {
        const postsToReturn = "somePosts";

        jest
          .spyOn(Post, "find")
          .mockImplementation(async params => postsToReturn);

        const author = new ObjectID();

        const posts = await Post.findProfilePosts(author);

        expect(Post.find).toHaveBeenCalledWith({ author });
        expect(posts).toEqual(postsToReturn);
      });
    });
  });
});
