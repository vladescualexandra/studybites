import React, {Component} from 'react';
import NotesByBookList from '../containers/NotesByBookList';

class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id, 
            name: null,
            active: false,
            classes: "list"
        }

        this.showItems = async () => {
            let on = !this.state.active;
            let cls = on ? "list-active" : "list";

            await this.setState({
                active: on,
                classes: cls
            })   
        }

        this.handleSelect = async (selectedId, selectedType) => {
            await this.setState({
                selected: {
                    id: selectedId, 
                    type: selectedType
                }
            })
        }
    }


    render() {
        return (
            <div>
                <input className="listItem" type="button" value={this.props.name} onClick={this.showItems}/>
                <ul className={this.state.classes}>
                    <NotesByBookList id={this.state.id}/>
                </ul>
            </div>
        );
    }
}

export default Book;