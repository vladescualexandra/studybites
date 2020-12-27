import { EventEmitter } from 'fbemitter';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;


class SharedStore {
    constructor(props) {
        this.shared = [];
        this.object = {};
        this.emitter = new EventEmitter();
        this.user = props;
    }

    async getAll() {
        if (this.user > 0) {
            let response = await fetch(SERVER_URL + `/users/${this.user}/shared`);
            let data = await response.json();
            
            this.shared = data;
        } else {
            this.shared = [];
        }
        this.emitter.emit(CODES.CODE_GET_ALL_SHARED);
    }

    async getById(id) {
        if (id > 0) {
            let response = await fetch(SERVER_URL + `/shared/${id}`);
            let data = await response.json();

            this.object = data;
            this.emitter.emit(CODES.CODE_GET_SHARED_BY_ID);
        } 
    }

    async create(shared) {
        let response = await fetch(SERVER_URL + `/users/${this.user}/shared`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shared)
        });

        let data = await response.json();
        this.getAll();
        return data;
    }

    async update(id, shared) {
        if (id > 0) {
            await fetch(SERVER_URL + `/shared/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(shared)
            });
        }   
    }

    async delete(id) {
        if (id > 0) {
            await fetch(SERVER_URL + `/shared/${id}`, {
                method: 'DELETE', 
            });
        
            this.getAll();
        }
    }
}

export default SharedStore;