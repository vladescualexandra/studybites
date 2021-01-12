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

      this.checkIfDelete = (e) => {
        if (e.keyCode === 46) {
            console.log("delete");
            this.deleteBook();
        } else {
            console.log("not delete");
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
            <div className="bookList" > 
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