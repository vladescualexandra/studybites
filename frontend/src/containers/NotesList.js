import React, {Component} from 'react';
import Note from '../components/Note.js'
import NotesStore from '../stores/NotesStore.js';
import CODES from '../codes.json';

class NotesList extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            id: this.props.id,
            notes: [],
            active: false,
            classes: "list"
        }
        

        this.store = new NotesStore(this.state.id);

        this.showNote = (id) => {
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
        this.store.getAll();
        this.store.emitter.addListener(CODES.CODE_GET_ALL_NOTES, async () => {
            this.setState({
                notes: this.store.notes
            })
        })
    }

    async componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            await this.setState({
                id: this.props.id
            })

            this.store = new NotesStore(this.state.id);
            await this.store.getAll();

            this.store.emitter.addListener(CODES.CODE_GET_ALL_NOTES, () => {
                
            });
            await this.setState({
                notes: this.store.notes
            });
        } 
    }

    render() {
        return (
            <div className="listContainer">
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