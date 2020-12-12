import { EventEmitter } from 'fbemitter';
import User from '../components/User';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;


class SharedStore {
    constructor() {
        this.shared = [];
        this.object = {};
        this.emitter = new EventEmitter();
        this.user = new User();
    }

    async getAll() {
        let response = await fetch(SERVER_URL + `/users/${this.user.state.id}/shared`);
        let data = await response.json();
        
        this.shared = data;
        this.emitter.emit(CODES.CODE_GET_ALL_SHARED);
    }

    async getById(id) {
        let response = await fetch(SERVER_URL + `/shared/${id}`);
        let data = await response.json();

        this.object = data;
        this.emitter.emit(CODES.CODE_GET_SHARED_BY_ID);

    }

    async create(shared) {
        let response = await fetch(SERVER_URL + `/users/${this.user.state.id}/shared`, {
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
        await fetch(SERVER_URL + `/shared/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shared)
        });

    }

    async delete(id) {

    }
}

export default SharedStore;