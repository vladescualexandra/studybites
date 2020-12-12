import { EventEmitter } from 'fbemitter';
import User from '../components/User';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;


class RemindersStore {
    constructor() {
        this.reminders = [];
        this.object = {};
        this.emitter = new EventEmitter();
        this.user = new User();
    }

    async getAll() {
        let response = await fetch(SERVER_URL + `/users/${this.user.state.id}/reminders`);
        let data = await response.json();
        
        this.reminders = data;
        this.emitter.emit(CODES.CODE_GET_ALL_REMINDERS);
    }

    async getById(id) {
        let response = await fetch(SERVER_URL + `/reminders/${id}`);
        let data = await response.json();

        this.object = data;
        this.emitter.emit(CODES.CODE_GET_REMINDER_BY_ID);
    }

    async create(reminder) {

    }

    async update(id, reminder) {
        await fetch(SERVER_URL + `/reminders/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reminder)
        });
    }

    async delete(id) {

    }
}

export default RemindersStore;