export default class ImageService {
  constructor(http) {
    this.http = http;
  }

  getSignedUrl = async profileId => {
    const url = `/api/images`;
    const { data } = await this.http.get(url);
    return data;
  };

  uploadImage = async (url, file) => {
    await this.http.put(url, file);
  };
}
