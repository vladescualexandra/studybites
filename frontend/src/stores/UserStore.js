import { EventEmitter } from 'fbemitter';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;

class UserStore {

    constructor() {
        this.user = {};
        this.emitter = new EventEmitter();
    }


    async create(name, email, password) {
        let u = {
            name: name, 
            email: email,
            password: password
        };

        let response = await fetch(SERVER_URL + `/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(u)
        });
        let data = await response.json();
        this.user = data;
        this.emitter.emit(CODES.CODE_GET_USER);    
    }

    async validate(email, password) {
        if (email.length > 0 && password.length > 0) {
            let response = await fetch(SERVER_URL + `/users/${email}/${password}`)
            let data = await response.json();
            this.user = data[0];
            this.emitter.emit(CODES.CODE_GET_USER);    
        }
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
            return this.user;
        }
    }
}

export default UserStore;