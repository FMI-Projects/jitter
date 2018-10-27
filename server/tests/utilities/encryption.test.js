const bcrypt = require("bcryptjs");

const {
  validatePassword,
  hashPassword
} = require("../../utilities/encryption");

describe("encryption", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("validatePassword", () => {
    it("should resolve with correct input", async () => {
      jest
        .spyOn(bcrypt, "compare")
        .mockImplementation((password, input, callback) => {
          callback(null, "response");
        });

      const password = "password";
      const hash = "hash";

      const result = await validatePassword(password, hash);

      expect(result).toEqual(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        password,
        hash,
        expect.any(Function)
      );
    });

    it("should reject with incorrect input", async () => {
      jest
        .spyOn(bcrypt, "compare")
        .mockImplementation((password, input, callback) => {
          callback("error", null);
        });

      const password = "password";
      const hash = "hash";

      const result = await validatePassword(password, hash);

      expect(result).toEqual(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        password,
        hash,
        expect.any(Function)
      );
    });
  });

  describe("hashPassword", () => {
    it("should reject if there is an error generating salt", async () => {
      jest.spyOn(bcrypt, "genSalt").mockImplementation((length, callback) => {
        callback("error", null);
      });
      jest
        .spyOn(bcrypt, "hash")
        .mockImplementation((password, salt, callback) => {});

      const password = "inputPassword";

      let error;

      try {
        await hashPassword(password);
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10, expect.any(Function));
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    it("should reject if there is an error generaing hash", async () => {
      const salt = "salt";
      jest.spyOn(bcrypt, "genSalt").mockImplementation((length, callback) => {
        callback(null, salt);
      });

      jest
        .spyOn(bcrypt, "hash")
        .mockImplementation((password, salt, callback) => {
          callback("error", null);
        });

      const password = "inputPassword";

      let error;

      try {
        await hashPassword(password);
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10, expect.any(Function));
      expect(bcrypt.hash).toHaveBeenCalledWith(
        password,
        salt,
        expect.any(Function)
      );
    });

    it("should resolve hash if generated correctly", async () => {
      const salt = "salt";
      jest.spyOn(bcrypt, "genSalt").mockImplementation((length, callback) => {
        callback(null, salt);
      });

      const hash = "hash";
      jest
        .spyOn(bcrypt, "hash")
        .mockImplementation((password, salt, callback) => {
          callback(null, hash);
        });

      const password = "inputPassword";

      let error;
      let hashResult;

      try {
        hashResult = await hashPassword(password);
      } catch (e) {
        error = e;
      }

      expect(error).not.toBeDefined();
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10, expect.any(Function));
      expect(bcrypt.hash).toHaveBeenCalledWith(
        password,
        salt,
        expect.any(Function)
      );
      expect(hashResult).toEqual(hash);
    });
  });
});
