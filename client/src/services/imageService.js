export default class ImageService {
  constructor(http) {
    this.http = http;
  }

  async getSignedUrl(profileId) {
    const url = `/api/images`;
    const { data } = await this.http.get(url);
    return data;
  }

  async uploadImage(url, file) {
    await this.http.put(url, file);
  }
}
