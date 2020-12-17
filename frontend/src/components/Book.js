import React, {Component} from 'react';
import NotesByBookList from '../containers/NotesByBookList';

class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id, 
            name: props.name,
            active: false,
            classes: "list",
            selected: {
                id: 0, 
                type: 'note'
            }
        }

        this.showItems = async () => {
            let on = !this.state.active;
            let cls = on ? "list-active" : "list";

            await this.setState({
                active: on,
                classes: cls
            })   
        }

        this.handleSelect = (selectedId, selectedType) => {
            this.props.onShow(selectedId);
            this.setState({
                selected: {
                    id: selectedId, 
                    type: selectedType
                }
            });
        }
    }

    componentDidMount() {
        if (this.props) {
            this.setState({
                id: this.props.id, 
                name: this.props.name
            })
        }
    }

    componentDidUpdate(prevProps) {
        // if (this.props !== prevProps) {
        //     this.setState({
        //         id: this.props.id, 
        //         name: this.props.name
        //     })
        // }
    }


    render() {
        return (
            <div>
                <input className="listItem" type="button" value={this.state.name ? this.state.name : 'Add name...'} onClick={this.showItems}/>
                <ul className={this.state.classes}>
                    <NotesByBookList id={this.state.id}
                        onSelect={this.handleSelect}
                        />
                </ul>
            </div>
        );
    }
}

export default Book;