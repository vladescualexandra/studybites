import React, {Component} from 'react';
import Book from '../components/Book.js'
const API_BASE_URL = process.env.REACT_APP_API_BASEURL;
const user = {
    id: 1
};

class BooksList extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            books: [],
            active: false,
            classes: "list"
        }
   
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
        fetch(API_BASE_URL + `/users/${user.id}/books`)
        .then((response) => response.json())
        .then((result) => {
            this.setState({
                books: result
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