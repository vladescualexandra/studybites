import { EventEmitter } from 'fbemitter';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;


class RemindersStore {
    constructor(props) {
        this.reminders = [];
        this.object = {};
        this.emitter = new EventEmitter();
        this.user = props;
    }

    async getAll() {
        if (this.user > 0) {
            let response = await fetch(SERVER_URL + `/users/${this.user}/reminders`);
            let data = await response.json();
            
            this.reminders = data;
        } else {
            this.reminders = [];
        }
        this.emitter.emit(CODES.CODE_GET_ALL_REMINDERS);
    }

    async getById(id) {
        if (id > 0) {
            let response = await fetch(SERVER_URL + `/reminders/${id}`);
            let data = await response.json();

            this.object = data;
            this.emitter.emit(CODES.CODE_GET_REMINDER_BY_ID);
        }
    }   

    async create(reminder) {
            let response = await fetch(SERVER_URL + `/users/${this.user}/reminders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reminder)
            });


            let data = await response.json();
            this.object = data;
            return this.object;        
    }

    async update(id, reminder) {
        if (id > 0) {
            await fetch(SERVER_URL + `/reminders/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reminder)
            });
        }
    }

    async delete(id) {
        if (id > 0) {
            await fetch(SERVER_URL + `/reminders/${id}`, {
                method: 'DELETE', 
            });      
        }
    }
}

export default RemindersStore;