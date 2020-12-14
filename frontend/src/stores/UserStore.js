import { EventEmitter } from 'fbemitter';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;

class UserStore {

    constructor() {
        this.user = {};
        this.emitter = new EventEmitter();
    }

    async getUserById(id) {
        if (id > 0) {
            let response = await fetch(SERVER_URL + `/users/${id}`);
            let data = await response.json();
            this.user = {
                id: data.id, 
                name: data.name,
                email: data.email
            };
            this.emitter.emit(CODES.CODE_GET_USER_BY_ID);    
        }
    }
}

export default UserStore;