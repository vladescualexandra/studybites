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
            bookClasses: "listItem",
            selected: {
                id: 0, 
                type: 'note'
            }
        }

      this.checkIfDelete = (e) => {
        if (this.state.id > 0) {
            if (e.keyCode === 46) {
                this.deleteBook();
            }
        }   
      }

        this.showItems = async (e) => {
            document.addEventListener('keydown', e => this.checkIfDelete(e));
            let on = !this.state.active;
            let cls = on ? "list-active" : "list";
            await this.setState({
                active: on,
                classes: cls
            });   

            let book = document.querySelector(`input[value="${e.target.value}"]`);
            if (on) {
                book.style.border = '1px solid #EB551C';
            } else {
                book.style.border = 'none';
                await this.setState({
                    id: 0
                });
            }
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
            bs.emitter.emit("BOOK_DELETED");
            this.props.onDelete();
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


    render() {
        return (
            <div> 
                <li className="bookList">
                    <input 
                        className="listItem" 
                        type="button" value={this.state.name ? this.state.name : 'Add name...'} 
                        onClick={(e) => this.showItems(e)}/>

                    

                    <ul className={this.state.classes}>
                        <NotesByBookList id={this.state.id}
                            onSelect={this.handleSelect}
                            />
                </ul>
                </li>
            </div>
        );
    }
}

export default Book;