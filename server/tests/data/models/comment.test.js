const { ObjectID } = require("mongodb");

const Comment = require("../../../data/models/comment");

describe("comment", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be invalid if data is invalid", async () => {
    const comment = new Comment({ content: "", author: "", post: "" });

    let error;

    try {
      await comment.validate();
    } catch (e) {
      error = e;
    }

    expect(error.errors.content).toBeDefined();
    expect(error.errors.author).toBeDefined();
    expect(error.errors.post).toBeDefined();
  });

  it("should be valid with valid input", async () => {
    const comment = new Comment({
      content: "someContent",
      author: new ObjectID(),
      post: new ObjectID()
    });

    let error;

    try {
      comment.validate();
    } catch (e) {
      error = e;
    }

    expect(error).not.toBeDefined();
  });

  describe("static methods", () => {
    describe("findPostComments", () => {
      it("should return post comments with correct input", async () => {
        const commentsToReturn = "commentsToReturn";

        const mockQuery = {
          populate: jest.fn().mockResolvedValue(commentsToReturn)
        };

        jest.spyOn(Comment, "find").mockImplementation(params => mockQuery);

        const post = new ObjectID();

        const comments = await Comment.findPostComments(post);

        expect(Comment.find).toHaveBeenCalledWith({ post });
        expect(mockQuery.populate).toHaveBeenCalledWith("author", "_id firstName lastName profilePictureUrl");
        expect(comments).toEqual(commentsToReturn);
      });

      it("should throw error if post does not exist", async () => {
        const mockQuery = {
          populate: jest.fn().mockResolvedValue(undefined)
        };

        jest
          .spyOn(Comment, "find")
          .mockImplementation(params => mockQuery);

        const post = new ObjectID();

        let error;

        try {
          await Comment.findPostComments(post);
        } catch (e) {
          error = "Comments not found";
        }

        expect(Comment.find).toHaveBeenCalledWith({ post });
        expect(mockQuery.populate).toHaveBeenCalledWith("author", "_id firstName lastName profilePictureUrl");
        expect(error).toBeDefined();
      });
    });
  });
});
