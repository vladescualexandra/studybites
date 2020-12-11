import { EventEmitter } from 'fbemitter';
import User from '../components/User';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;


class NotesByBookStore {
    constructor() {
        this.notes = [];

        this.emitter = new EventEmitter();
        this.user = new User();
    }

    async getAll(bookID) {
        let response = await fetch(SERVER_URL + `/books/${bookID}/notes`);
        let data = await response.json();
        
        this.notes = data;
        this.emitter.emit(CODES.CODE_GET_ALL_NOTES_BY_BOOKS);
    }

    async getById(id) {

    }

    async create(note) {

    }

    async update(id, note) {

    }

    async delete(id) {

    }
}

export default NotesByBookStore;