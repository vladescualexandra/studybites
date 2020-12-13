import { EventEmitter } from 'fbemitter';
import User from '../components/User';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;


class BooksStore {
    constructor() {
        this.books = [];
        this.object = {};

        this.emitter = new EventEmitter();
        this.user = new User();
    }

    async getAll() {
        let response = await fetch(SERVER_URL + `/users/${this.user.state.id}/books`);
        let data = await response.json();
        
        this.books = data;
        this.emitter.emit(CODES.CODE_GET_ALL_BOOKS);
    }

    async getById(id) {
        let response = await fetch(SERVER_URL + `/books/${id}`);
        let data = await response.json();

        this.object = data;
        this.emitter.emit(CODES.CODE_GET)

    }

    async create(book) {

    }

    async update(id, book) {
        await fetch(SERVER_URL + `/books/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
    }

    async delete(id) {
        await fetch(SERVER_URL + `/books/${id}`, {
            method: 'DELETE', 
        });

        this.getAll();
    }
}

export default BooksStore;