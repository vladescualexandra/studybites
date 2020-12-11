import { EventEmitter } from 'fbemitter';
import User from '../components/User';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;


class RemindersStore {
    constructor() {
        this.reminders = [];

        this.emitter = new EventEmitter();
        this.user = new User();
    }

    async getAll() {
        let response = await fetch(SERVER_URL + `/users/${this.user.state.id}/reminders`);
        let data = await response.json();
        
        this.reminders = data;
        this.emitter.emit(CODES.CODE_GET_ALL_REMINDERS);
    }

    async getById() {

    }

    async create(reminder) {

    }

    async update(id, reminder) {

    }

    async delete(id) {

    }
}

export default RemindersStore;