import React, {Component} from 'react';
import Note from '../components/Note.js'
const API_BASE_URL = process.env.REACT_APP_API_BASEURL;
const user = {
    id: 1
};

class NotesByBookList extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            bookID: props.id,
            notes: []
        }

        this.showNote = (id) => {
            fetch(API_BASE_URL + `/notes/${id}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.content)
            })  
        }
    }
    
    componentDidMount() {
        console.log(this.state.bookID);
        fetch(API_BASE_URL + `/books/${this.state.bookID}/notes`)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            this.setState({
                notes: result
            })
        })

        console.log('comp - NotesByBookList')
        console.log(this.state.notes);
    
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.notes.map((note, index) => <Note key={index} 
                                                    id = {note.id}
                                                    title = {note.title}
                                                    onShow={this.showNote} />)}
                </ul>
            </div>
        )
    }
}

export default NotesByBookList;