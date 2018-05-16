import imageConstans from "../constants/imageConstants";

export const getFullUrl = imageUrl => {
  if (!imageUrl) {
    return null;
  }

  return imageConstans.baseImageUrl + imageUrl;
};
