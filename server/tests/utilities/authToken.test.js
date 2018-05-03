const jwt = require("jsonwebtoken");
const { ObjectID } = require("mongodb");
const { createJwt, decodeJwt } = require("../../utilities/authToken");

describe("authToken", () => {
  describe("createJwt", () => {
    it("should make call to jwt sign with correct input", () => {
      const result = "jwtSignResult";
      jest.spyOn(jwt, "sign").mockImplementation((params, secret) => result);
      const userId = new ObjectID();

      const createJwtResult = createJwt(userId);

      expect(jwt.sign).toHaveBeenCalledWith(
        {
          _id: userId.toHexString(),
          access: "auth"
        },
        process.env.JWT_SECRET
      );
      expect(createJwtResult).toEqual(result);
    });
  });

  describe("decodeJwt", () => {
    it("should make call to jwt verify with correct input", () => {
      const result = "jwtVerifyResult";
      jest.spyOn(jwt, "verify").mockImplementation((token, secret) => result);
      const userToken = "token";

      const decodeJwtResult = decodeJwt(userToken);

      expect(jwt.verify).toHaveBeenCalledWith(
        userToken,
        process.env.JWT_SECRET
      );
      expect(decodeJwtResult).toEqual(result);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
