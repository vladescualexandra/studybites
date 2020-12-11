import { EventEmitter } from 'fbemitter';
import User from '../components/User';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;

class NotesStore {
    constructor() {
        this.notes = [];
        this.object = {};

        this.emitter = new EventEmitter();
        this.user = new User();
    }

    async getAll() {
        let response = await fetch(SERVER_URL + `/users/${this.user.state.id}/notes`);
        let data = await response.json();
        
        this.notes = data;
        this.emitter.emit(CODES.CODE_GET_ALL_NOTES);
    }

    async getById(id) {

        let response = await fetch(SERVER_URL + `/notes/${id}`);
        let data = await response.json();

        this.object = data;
        this.emitter.emit(CODES.CODE_GET_NOTE_BY_ID);
    }

    async create(note) {

    }

    async update(id, note) {

    }

    async delete(id) {

    }
}

export default NotesStore;