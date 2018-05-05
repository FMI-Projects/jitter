const { ObjectID } = require("mongodb");

const Profile = require("../../data/models/profile");
const { users } = require("./users");

const profileOneId = new ObjectID();
const profileTwoId = new ObjectID();

const profiles = [
  {
    _id: profileOneId,
    firstName: "testFirstFirstName",
    lastName: "testFirstLastName",
    _userId: users[0]._id
  },
  {
    _id: profileTwoId,
    firstName: "testSecondFirstName",
    lastName: "testSecondLastName",
    _userId: users[1]._id
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
