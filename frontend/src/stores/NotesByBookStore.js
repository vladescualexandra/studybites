import { EventEmitter } from 'fbemitter';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;


class NotesByBookStore {
    constructor(props) {
        this.notes = [];
        this.object = {};
        this.emitter = new EventEmitter();
        this.user = props;
    }

    async getAll(bookID) {
        if (bookID > 0) {
            let response = await fetch(SERVER_URL + `/books/${bookID}/notes`);
            let data = await response.json();
            
            this.notes = data;
        } else {
            this.notes = [];
        }
        this.emitter.emit(CODES.CODE_GET_ALL_NOTES_BY_BOOKS);
    }

    async getById(id) {
        if (id > 0) {
            let response = await fetch(SERVER_URL + `/notes/${id}`);
            let data = await response.json();

            this.object = data;
            this.emitter.emit(CODES.CODE_GET_NOTE_BY_ID);
        }
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

export default NotesByBookStore;