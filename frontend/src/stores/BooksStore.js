import { EventEmitter } from 'fbemitter';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;


class BooksStore {
    constructor(props) {
        this.books = [];
        this.object = {};

        this.emitter = new EventEmitter();
        this.user = props;
    }

    async getAll() {
        if (this.user > 0) {
            let response = await fetch(SERVER_URL + `/users/${this.user}/books`);
            let data = await response.json();
            
            this.books = data;
        } else {
            this.books = [];
        }
        this.emitter.emit(CODES.CODE_GET_ALL_BOOKS);
    }

    async getById(id) {
        if (id > 0) {
            let response = await fetch(SERVER_URL + `/books/${id}`);
            let data = await response.json();

            this.object = data;
            this.emitter.emit(CODES.CODE_GET)
        }
    }

    async create(book) {

    }

    async update(id, book) {
        if (id > 0) {
            await fetch(SERVER_URL + `/books/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
        }
    }

    async delete(id) {
        if (id > 0) {
            await fetch(SERVER_URL + `/books/${id}`, {
                method: 'DELETE', 
            });

            this.getAll();
        }
    }
}

export default BooksStore;