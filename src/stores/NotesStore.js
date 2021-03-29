import { EventEmitter } from 'fbemitter';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;

class NotesStore {
    constructor(props) {
        this.notes = [];
        this.object = {};

        this.emitter = new EventEmitter();
        
        this.user = props;
    }

    async getAll() {
        if (this.user > 0) {
            let response = await fetch(SERVER_URL + `/users/${this.user}/notes`);
            let data = await response.json();
            
            this.notes = data;
        } 
        this.emitter.emit(CODES.CODE_GET_ALL_NOTES);
    }

    async getById(id) {
        if (id > 0) {
            let response = await fetch(SERVER_URL + `/notes/${id}`);
            let data = await response.json();

            this.object = data;
            this.emitter.emit(CODES.CODE_GET_NOTE_BY_ID);
        }
    }

    async create(note) {
        let response = await fetch(SERVER_URL + `/users/${this.user}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });

        let data = await response.json();
        this.getAll();
        return data;
    }

    async update(id, note) {
        if (id > 0) {
            await fetch(SERVER_URL + `/notes/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });
                }
    }

    async delete(id) {
        if (id > 0) {
            await fetch(SERVER_URL + `/notes/${id}`, {
                method: 'DELETE', 
            });
            this.getAll();
        }
    }
}

export default NotesStore;