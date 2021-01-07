import React, {Component} from 'react';
import NotesByBookList from '../containers/NotesByBookList';
import BooksStore from '../stores/BooksStore';

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

        this.deleteBook = () => {
            let bs = new BooksStore();
            bs.delete(this.state.id);
            console.log("Book deleted");
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
    }


    render() {
        return (
            <div>
                <span className="bookList">
                    <img src="https://www.flaticon.com/svg/static/icons/svg/1632/1632708.svg"
                        alt="delete book" onClick={this.deleteBook} 
                    width="10px"/>
                    <input className="listItem" type="button" value={this.state.name ? this.state.name : 'Add name...'} onClick={this.showItems}/>
                    <ul className={this.state.classes}>
                        <NotesByBookList id={this.state.id}
                            onSelect={this.handleSelect}
                            />
                </ul>
                </span>
            </div>
        );
    }
}

export default Book;