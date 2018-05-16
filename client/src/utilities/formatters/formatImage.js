import imageConstans from "../constants/imageConstants";

export const formatUrl = imageUrl => {
  if (!imageUrl) {
    return null;
  }

  return imageConstans.baseImageUrl + imageUrl;
};
