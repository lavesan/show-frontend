import axios from 'axios';

class UserService {

    save(body) {
        return axios.post('/utils', body);
    }

    list(filter = []) {
        return axios.post('/utils/list', filter);
    }

}

let userInstance = null;

export default (() => {

    const getInstance = () => {
        if (!userInstance) {
            userInstance = new UserService();
        }
        return userInstance;
    }

    return {
        getInstance,
    }

})()
