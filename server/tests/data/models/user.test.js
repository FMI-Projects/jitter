const { ObjectID } = require("mongodb");

const User = require("../../../data/models/user");

const encryption = require("../../../utilities/encryption");
const authToken = require("../../../utilities/authToken");

describe("user", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be invalid if email is empty", async () => {
    const user = new User({
      email: "",
      password: "somePassword"
    });

    let error;

    try {
      console.log("enters", user);
      await user.validate();
      console.log("doesnt return");
    } catch (e) {
      error = e;
    }

    expect(error.errors.email).toBeDefined();
  });

  it("should be invalid if email is not a valid email", async () => {
    const user = new User({
      email: "invalidEmail",
      password: "somePassword"
    });

    let error;

    try {
      await user.validate();
    } catch (e) {
      error = e;
    }

    expect(error.errors.email).toBeDefined();
  });

  it("should be invalid if password is empty", async () => {
    const user = new User({
      email: "someEmail@gmail.com",
      password: ""
    });

    let error;

    try {
      await user.validate();
    } catch (e) {
      error = e;
    }

    expect(error.errors.password).toBeDefined();
  });

  it("should be valid with valid input", async () => {
    const user = new User({
      email: "someEmail@gmail.com",
      password: "somePassword"
    });

    let error;

    try {
      await user.validate();
    } catch (e) {
      error = e;
    }

    expect(error).not.toBeDefined();
  });

  describe("instance methods", () => {
    describe("validatePassword", () => {
      it("should make call to validator with correct input", async () => {
        const result = "validatePasswordResult";
        jest
          .spyOn(encryption, "validatePassword")
          .mockImplementation((password, hashedPassword) => result);
        const userPassword = "userPassword";
        const inputPassword = "inputPassword";
        const user = new User({ password: userPassword });

        const validatePasswordResult = await user.validatePassword(
          inputPassword
        );

        expect(encryption.validatePassword).toHaveBeenCalledWith(
          inputPassword,
          userPassword
        );
        expect(validatePasswordResult).toEqual(result);
      });
    });

    describe("generateAuthToken", () => {
      it("should make call to generator with correct input", async () => {
        const result = "createJwtResult";
        jest.spyOn(authToken, "createJwt").mockImplementation(userId => result);
        const userId = new ObjectID();
        const user = new User({ _id: userId });

        const generateAuthTokenResult = await user.generateAuthToken();

        expect(authToken.createJwt).toHaveBeenCalledWith(userId);
        expect(generateAuthTokenResult).toEqual(result);
      });
    });
  });

  describe("static methods", () => {
    describe("findByEmail", () => {
      it("should return user if user exists", async () => {
        const userToReturn = "someUser";
        jest
          .spyOn(User, "findOne")
          .mockImplementation(async params => userToReturn);
        const email = "someEmail";

        const user = await User.findByEmail(email);

        expect(User.findOne).toHaveBeenCalledWith({ email });
        expect(user).toEqual(userToReturn);
      });
    });
  });
});
