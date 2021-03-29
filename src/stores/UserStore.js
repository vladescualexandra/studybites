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

        if (response.status === 201) {
            let data = await response.json();
            this.user = data; 
        } else {
            this.user = null;
        }     
        this.emitter.emit(CODES.CODE_GET_USER);    
    }

    async validate(email, password) {
        let response = await fetch(SERVER_URL + `/user/${email}/${password}`)
            let data = await response.json();
            
            if (data.length > 0) {
                this.user = data[0];
            } else {
                this.user = null;
            }
    
        this.emitter.emit(CODES.CODE_GET_USER);    
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

    async getUserByEmail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            let response = await fetch(SERVER_URL + `/users/collab/${email}`);
            let data = await response.json();
            this.user = {
                id: data[0].id, 
                name: data[0].name, 
                email: data[0].email
            };

            this.emitter.emit(CODES.CODE_GET_USER_BY_EMAIL);    
            return this.user;

        } else {
            console.log("This is not an email adress.");
        }
    }
}

export default UserStore;