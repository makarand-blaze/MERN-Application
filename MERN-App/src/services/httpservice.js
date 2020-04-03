// the class file containing
// conde for HTTP Calls
import axios from 'axios';
class HttpService {
    constructor() {
        this.url = 'http://localhost:6070/formpayload';
    }
    getStudents() {
        let response = axios.get(this.url);
        return response;
    }
    postStudent(formData) {
        console.log();
        let response = axios.post(this.url, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        });
        return response;
    }
}

export default HttpService;