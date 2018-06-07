const compareAuthor = (oldVal, newVal, key) => {
  const areDifferent =
    oldVal._id !== newVal._id ||
    oldVal.firstName !== newVal.firstName ||
    oldVal.lastName !== newVal.lastName ||
    oldVal.profilePictureUrl !== newVal.profilePictureUrl;

  return areDifferent ? newVal : oldVal;
};

export default compareAuthor;
