const {ObjectID} = require("mongodb");

const Comment = require("../../../data/models/comment");
const Profile = require("../../../data/models/profile");
const Post = require("../../../data/models/post");

describe("comment", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be invalid if data is invalid", async () => {
    const comment = new Comment({content: "", author: "", post: ""});

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
        const commentsToReturn = "postComments";
        const profileToReturn = "someProfile";
        const postToReturn = "somePost";

        jest
          .spyOn(Comment, "find")
          .mockImplementation(async params => commentsToReturn);
        jest
          .spyOn(Profile, "findById")
          .mockImplementation(async params => profileToReturn);
        jest
          .spyOn(Post, "findById")
          .mockImplementation(async params => postToReturn);

        const post = new ObjectID();
        const author = new ObjectID();

        const comments = await Comment.findPostComments(post, author);

        expect(Comment.find).toHaveBeenCalledWith({post});
        expect(Post.findById).toHaveBeenCalledWith(post);
        expect(Profile.findById).toHaveBeenCalledWith(author);
        expect(comments).toEqual({
          comments: commentsToReturn,
          post: postToReturn,
          author: profileToReturn
        });
      });

      it("should throw error if post does not exist", async () => {
        jest
          .spyOn(Comment, "find")
          .mockImplementation(async params => undefined);
        jest
          .spyOn(Profile, "findById")
          .mockImplementation(async params => undefined);
        jest
          .spyOn(Post, "findById")
          .mockImplementation(async params => undefined);

        const post = new ObjectID();
        const author = new ObjectID();

        let error;

        try {
          await Comment.findPostComments(post, author);
        } catch (e) {
          error = "Comments not found";
        }

        expect(Comment.find).toHaveBeenCalledWith({post});
        expect(Profile.findById).toHaveBeenCalledWith(author);
        expect(Post.findById).toHaveBeenCalledWith(post);
        expect(error).toBeDefined();
      });
    });
  });
});
