const { ObjectID } = require("mongodb");

const User = require("../../../data/models/user");

jest.mock("../../../utilities/encryption");
const { validatePassword } = require("../../../utilities/encryption");

jest.mock("../../../utilities/jwt");
const { createJwt } = require("../../../utilities/jwt");

describe("user", () => {
  it("should be invalid if email is empty", async () => {
    const user = new User({
      email: "",
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
        const userPassword = "userPassword";
        const inputPassword = "inputPassword";
        const user = new User({ password: userPassword });
        await user.validatePassword(inputPassword);

        expect(validatePassword).toHaveBeenCalledWith(
          inputPassword,
          userPassword
        );
      });
    });

    describe("generateAuthToken", () => {
      it("should make call to generator with correct input", async () => {
        const userId = new ObjectID();
        const user = new User({ _id: userId });
        await user.generateAuthToken();

        expect(createJwt).toHaveBeenCalledWith(userId);
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  describe("static methods", () => {
    describe("findByEmail", () => {
      it("should return user if user exists", async () => {
        const userToReturn = "someUser";
        User.findOne = jest.fn(async () => userToReturn);

        const user = await User.findByEmail("someEmail");

        expect(user).toEqual(userToReturn);
      });

      it("should throw an error if user does not exist", async () => {
        User.findOne = jest.fn(async () => undefined);

        let error;

        try {
          await User.findByEmail("someEmail");
        } catch (e) {
          error = "User not found";
        }

        expect(error).toBeDefined();
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});
