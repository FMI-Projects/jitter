import imageConstants from "../constants/imageConstants";

export const validImageType = value => {
  if (!value) {
    return undefined;
  }

  const validImageTypes = imageConstants.validTypes;
  const valueType = value.type;
  let isTypeValid = false;
  for (const validImageType of validImageTypes) {
    if (valueType === "image/" + validImageType) {
      isTypeValid = true;
    }
  }

  return isTypeValid
    ? undefined
    : `Valid image types are: ${validImageTypes.join(", ")}`;
};
