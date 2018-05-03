const request = require("supertest");

require("../config/config");
const { prepareDatabase, resetDatabase } = require("../config/mockgoose");
const app = require("../../app");
const User = require("../../data/models/user");
const Profile = require("../../data/models/profile");
const { populateUsers, users } = require("../seed/users");
const { populateProfiles, profiles } = require("../seed/profiles");

describe("authController", () => {
  jest.setTimeout(12000);

  beforeAll(async () => {
    await prepareDatabase();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  describe("register", () => {
    it("should create user successfully with correct data", async () => {
      const email = "testEmail@gmail.com";
      const password = "testPassword";
      const firstName = "testFirstName";
      const lastName = "testLastName";

      await request(app)
        .post("/auth/register")
        .send({
          email,
          password,
          firstName,
          lastName
        })
        .expect(201)
        .expect(res => {
          expect(res.headers["x-auth"]).not.toBeFalsy();
          expect(res.body.user._id).not.toBeFalsy();
          expect(res.body.profile).toMatchObject({
            firstName,
            lastName,
            _id: expect.any(String),
            _userId: res.body.user._id
          });
        });

      const user = await User.findByEmail(email);
      expect(user.email).toEqual(email);
      expect(user.password).not.toEqual(password);

      const profile = await Profile.findByUserId(user._id);
      expect(profile).not.toBeFalsy();
      expect(profile).toMatchObject({
        firstName,
        lastName
      });
    });

    it("should return 400 with invalid email", async () => {
      const email = "incorrectEmail";
      const password = "testPassword";
      const firstName = "testFirstName";
      const lastName = "testLastName";

      await request(app)
        .post("/auth/register")
        .send({
          email,
          password,
          firstName,
          lastName
        })
        .expect(400);

      const userCount = await User.count();
      expect(userCount).toEqual(0);

      const profileCount = await Profile.count();
      expect(profileCount).toEqual(0);
    });

    it("should return 400 with invalid password", async () => {
      const email = "testEmail@gmail.com";
      const password = "";
      const firstName = "testFirstName";
      const lastName = "testLastName";

      await request(app)
        .post("/auth/register")
        .send({
          email,
          password,
          firstName,
          lastName
        })
        .expect(400);

      const userCount = await User.count();
      expect(userCount).toEqual(0);

      const profileCount = await Profile.count();
      expect(profileCount).toEqual(0);
    });

    it("should return 400 with invalid firstName", async () => {
      const email = "testEmail@gmail.com";
      const password = "testPassword";
      const firstName = "";
      const lastName = "testLastName";

      await request(app)
        .post("/auth/register")
        .send({
          email,
          password,
          firstName,
          lastName
        })
        .expect(400);

      const userCount = await User.count();
      expect(userCount).toEqual(0);

      const profileCount = await Profile.count();
      expect(profileCount).toEqual(0);
    });

    it("should return 400 with invalid lastname", async () => {
      const email = "testEmail@gmail.com";
      const password = "testPassword";
      const firstName = "testFirstName";
      const lastName = "";

      await request(app)
        .post("/auth/register")
        .send({
          email,
          password,
          firstName,
          lastName
        })
        .expect(400);

      const userCount = await User.count();
      expect(userCount).toEqual(0);

      const profileCount = await Profile.count();
      expect(profileCount).toEqual(0);
    });
  });

  describe("login", () => {
    const [userOne] = users;
    const [profileOne] = profiles;

    beforeEach(async () => {
      await populateUsers();
      await populateProfiles();
    });

    it("should return valid data with correct input", async () => {
      const email = userOne.email;
      const password = userOne.password;

      await request(app)
        .post("/auth/login")
        .send({
          email,
          password
        })
        .expect(200)
        .expect(res => {
          expect(res.headers["x-auth"]).not.toBeFalsy();
          expect(res.body.user._id).toEqual(userOne._id.toHexString());
          expect(res.body.profile).toMatchObject({
            _id: expect.any(String),
            firstName: profileOne.firstName,
            lastName: profileOne.lastName,
            _userId: res.body.user._id
          });
        });
    });

    it("should return 400 with invalid password", async () => {
      const email = userOne.email;
      const password = "invalidPassword";

      await request(app)
        .post("/auth/login")
        .send({
          email,
          password
        })
        .expect(400);
    });

    it("should return 400 with non existing user", async () => {
      const email = "nonExistingEmail@gmail.com";
      const password = "somePassword";

      await request(app)
        .post("/auth/login")
        .send({
          email,
          password
        })
        .expect(400);
    });
  });
});
