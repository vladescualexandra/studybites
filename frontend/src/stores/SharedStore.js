import { EventEmitter } from 'fbemitter';
import User from '../components/User';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;


class SharedStore {
    constructor() {
        this.shared = [];

        this.emitter = new EventEmitter();
        this.user = new User();
    }

    async getAll() {
        let response = await fetch(SERVER_URL + `/users/${this.user.state.id}/shared`);
        let data = await response.json();
        
        this.shared = data;
        this.emitter.emit(CODES.CODE_GET_ALL_SHARED);
    }

    async getById() {

    }

    async create(shared) {

    }

    async update(id, shared) {

    }

    async delete(id) {

    }
}

export default SharedStore;