import { EventEmitter } from 'fbemitter';
import User from '../components/User';
import CODES from '../codes.json';
const SERVER_URL = process.env.REACT_APP_API_BASEURL;


class BooksStore {
    constructor() {
        this.books = [];

        this.emitter = new EventEmitter();
        this.user = new User();
    }

    async getAll() {
        let response = await fetch(SERVER_URL + `/users/${this.user.state.id}/books`);
        let data = await response.json();
        
        this.books = data;
        this.emitter.emit(CODES.CODE_GET_ALL_BOOKS);
    }

    async getById() {

    }

    async create(book) {

    }

    async update(id, book) {

    }

    async delete(id) {

    }
}

export default BooksStore;