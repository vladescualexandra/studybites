import React, {Component} from 'react';
import Shared from '../components/Shared.js'
import CODES from '../codes.json';
import SharedStore from '../stores/SharedStore.js';


class SharedList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            notes: [],
            active: false,
            classes: "list"
        }

        this.store = new SharedStore(this.state.id);

        this.showShared = (id) => {
            this.props.onSelect(id, 'shared');
        } 

        this.showItems = () => {
           
            let on = !this.state.active;
            let cls = on ? "list-active" : "list";

            this.setState({
                active: on,
                classes: cls
            })

        
        }
    }

    componentDidMount() {
        this.store.getAll();
        this.store.emitter.addListener(CODES.CODE_GET_ALL_SHARED, () => {
            this.setState({
                notes: this.store.shared
            })
        })
    }

    async componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {

            await this.setState({
                id: this.props.id
            })

            this.store = new SharedStore(this.state.id);
            await this.store.getAll();
            this.store.emitter.addListener(CODES.CODE_GET_ALL_SHARED, async () => {
                
            });

            await this.setState({
                notes: this.store.shared
            })
        }
    }

    render() {
        return (
            <div className="listContainer">
                <input className="mainList" type="button" value="Shared" onClick={this.showItems}/>
                <ul className={this.state.classes}>
                    {this.state.notes.map((note, index) => <Shared key={index} 
                                                    id = {note.id}
                                                    title={note.title}
                                                    onShow={this.showShared} />)}
                </ul>
            </div>
        )
    }
}

export default SharedList;