import React, {Component} from 'react';
import Shared from '../components/Shared.js'
const API_BASE_URL = process.env.REACT_APP_API_BASEURL;
const user = {
    id: 1
};


class SharedList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            active: false,
            classes: "list"
        }

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
        fetch(API_BASE_URL + `/users/${user.id}/shared`)
        .then((response) => response.json())
        .then((result) => {
            this.setState({
                notes: result
            })
        })
    }
    render() {
        return (
            <div>
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