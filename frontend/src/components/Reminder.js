import React, { Component } from 'react';

class Reminder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id, 
            title: props.title
        }
    }

    render() {
        return (
            <div>
                <input className="listItem" type="button" value={this.props.title ? this.state.title : 'Add title...'}
                onClick={() => this.props.onShow(this.props.id)}></input>
            </div>
        )
    }
}

export default Reminder;