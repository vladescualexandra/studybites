import React, {Component} from 'react';
import Note from '../components/Note.js'
const API_BASE_URL = process.env.REACT_APP_API_BASEURL;
const user = {
    id: 1
};

class NotesList extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            notes: [],
        }

        this.showNote = (id) => {
            fetch(API_BASE_URL + `/notes/${id}`)
            .then((response) => response.json())
            .then((result) => {
               console.log(result.content);
            }) 
        }

        
    }


    componentDidMount() {
        fetch(API_BASE_URL + `/users/${user.id}/notes`)
        .then((response) => response.json())
        .then((result) => {
            this.setState({
                notes: result,
            })
        })    
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.notes.map((note, index) => <Note key={index} 
                                                    id = {note.id}
                                                    title={note.title}
                                                    onShow={this.showNote} />)}
                </ul>
            </div>
        )
    }
}

export default NotesList;