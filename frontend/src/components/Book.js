import React, {Component} from 'react';
import NotesByBookList from '../containers/NotesByBookList';

class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id, 
            name: null
        }

    }


    render() {
        return (
            <div>
                <input type="button" value={this.props.name}
                    onClick={() => this.props.onShow(this.props.id)}/>
                        <NotesByBookList id={this.state.id}/>
            </div>
        );
    }
}

export default Book;