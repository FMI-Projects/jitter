const User = require("../../../data/models/user");
const encryption = require("../../../utilities/encryption");

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
    // describe("validatePassword", () => {
    //   it("should make call to validator with correct input", async () => {
    //     const spy = jest.spyOn(encryption, "validatePassword");

    //     const userPassword = "userPassword";
    //     const inputPassword = "inputPassword";
    //     const user = new User({ password: userPassword });
    //     user.validatePassword(inputPassword);

    //     expect(spy).toHaveBeenCalledWith(inputPassword, userPassword);
    //   });
    // });
  });
});
