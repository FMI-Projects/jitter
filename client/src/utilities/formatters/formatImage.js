import imageConstans from "../constants/imageConstants";

export const getFullUrl = imageUrl => {
  if (!imageUrl) {
    return null;
  }

  return imageConstans.baseImageUrl + imageUrl;
};

export const getRelativeUrl = imageUrl => {
  if (!imageUrl) {
    return null;
  }

  return imageUrl.split(imageConstans.baseImageUrl)[1];
};
