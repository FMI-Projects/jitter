const compareAuthor = (oldVal, newVal, key) => {
  const areDifferent =
    oldVal._id !== newVal._id ||
    oldVal.content !== newVal.content ||
    oldVal.post !== newVal.post ||
    oldVal.createdAt !== newVal.createdAt ||
    oldVal.author !== newVal.author;

  return areDifferent ? newVal : oldVal;
};

export default compareAuthor;
