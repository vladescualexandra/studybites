import React, {Component} from 'react';
import Book from '../components/Book.js'
import BooksStore from '../stores/BooksStore.js';
import CODES from '../codes.json';


class BooksList extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            books: [],
            active: false,
            classes: "list"
        }

        this.store = new BooksStore();
   
        this.showItems = async () => {
            let on = !this.state.active;
            let cls = on ? "list-active" : "list";
            await  this.setState({
                active: on,
                classes: cls
            });        

        }

        this.showNote = (id) => {
            this.props.onSelect(id, 'notes');
        }

        this.handleSelect = async (selectedId, selectedType) => {
            

            this.props.onSelect(selectedId, selectedType);
            await this.setState({
                selected: {
                    type: selectedType,
                    id: selectedId
                }
            });           
        }
        
    }
    
    componentDidMount() {
        this.store.getAll();
        this.store.emitter.addListener(CODES.CODE_GET_ALL_BOOKS, () => {
            this.setState({
                books: this.store.books
            })
        })
    }

    render() {
        return (
            <div>
                <input className="mainList" type="button" value="Books" onClick={this.showItems}/>
                <ul className={this.state.classes}>
                    {this.state.books.map((book, index) => <Book key={index} 
                                                    id = {book.id}
                                                    name = {book.name}
                                                    onShow = {this.showNote}
                                                    onSelect = {this.handleSelect}
                                                   />)}
                </ul>
            </div>
        )
    }
}

export default BooksList;