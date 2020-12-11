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
            active: false,
            classes: "list"
        }


        this.showNote = (id) => {
            // fetch(API_BASE_URL + `/notes/${id}`)
            // .then((response) => response.json())
            // .then((result) => {
            //    console.log(result.content);
            // }) 

            this.props.onSelect(id, 'notes');
        }


        this.showItems = async () => {
            let on = !this.state.active;
            let cls = on ? "list-active" : "list";

            await this.setState({
                active: on,
                classes: cls
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
                <input className="mainList" type="button" value="Notes" onClick={this.showItems}/>
                <ul className={this.state.classes}>
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