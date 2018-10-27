const Profile = require("../../data/models/profile");
const { users } = require("./users");

const profiles = [
  {
    _id: users[0]._id,
    firstName: "testFirstFirstName",
    lastName: "testFirstLastName"
  },
  {
    _id: users[1]._id,
    firstName: "testSecondFirstName",
    lastName: "testSecondLastName"
  }
];

const populateProfiles = async () => {
  const profileOne = new Profile(profiles[0]).save();
  const profileTwo = new Profile(profiles[1]).save();

  await Promise.all([profileOne, profileTwo]);
};

module.exports = {
  populateProfiles,
  profiles
};
