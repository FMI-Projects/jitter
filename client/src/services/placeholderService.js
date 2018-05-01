export default class PlaceholderService {
    constructor(http) {
        this.http = http;
    }

    async placeholderMethodGetById(id) {
        const url = `/placeholders/${id}`;
        return this.http.get(url);
    }
}


