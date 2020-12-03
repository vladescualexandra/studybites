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
            books: []
        }

        
    }
    
    componentDidMount() {
        fetch(API_BASE_URL + `/users/${user.id}/books`)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            this.setState({
                books: result
            })
        })
    
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.books.map((book, index) => <Book key={index} 
                                                    id = {book.id}
                                                    name = {book.name}
                                                    onShow={this.showNotes}/>)}
                </ul>
            </div>
        )
    }
}

export default BooksList;