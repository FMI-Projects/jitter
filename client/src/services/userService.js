export default class UserService {
    constructor(http) {
        this.http = http;
    }

    async loginUser(email, password) {
        const url = "auth/login";
        const authData = {
            email,
            password
        };

        const response = await this.http.post(url, authData);

        const token = response.headers["x-auth"];
        const userId = response.data._id;

        return {
            token,
            userId
        };
    }
}


