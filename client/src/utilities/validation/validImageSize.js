import imageConstants from "../constants/imageConstants";

export const validImageSize = value => {
  return value && value.size > imageConstants.maxSize
    ? `Maximum allowed image size is ${(
        imageConstants.maxSize / 1048576
      ).toFixed(2) + " MB"}`
    : undefined;
};
