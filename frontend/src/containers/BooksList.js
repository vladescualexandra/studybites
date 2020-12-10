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

        this.showItems = () => {
           

            let on = !this.state.active;
            let cls = on ? "list-active" : "list";


            console.log(on, cls)

            this.setState({
                active: on,
                classes: cls
            })

            console.log(this.state)
        
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
                <input type="button" value="Books" onClick={this.showItems}/>
                <ul className={this.state.classes}>
                    {this.state.books.map((book, index) => <Book key={index} 
                                                    id = {book.id}
                                                    name = {book.name}
                                                   />)}
                </ul>
            </div>
        )
    }
}

export default BooksList;