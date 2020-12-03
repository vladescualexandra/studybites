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
            notes: []
        }

        this.showShared = (id) => {
            fetch(API_BASE_URL + `/shared/${id}`)
            .then((response) => response.json())
            .then((result) => {
                console.log("SHARED: Title: " + result.title + "/ Content: " + result.content);
            })

            fetch(API_BASE_URL + `/shared/${id}/collaborators`)
            .then((response) => response.json())
            .then((result) => {
                for (let item of result) {
                    fetch(API_BASE_URL + `/users/${item.userId}`)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log("Collaborator: " + result.name);
                    });
                } 
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
        console.log(this.state.notes);
    }
    render() {
        return (
            <div>
                <ul>
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