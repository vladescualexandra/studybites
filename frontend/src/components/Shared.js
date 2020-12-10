import React, {Component} from 'react';

class Shared extends Component {
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
                <input class="listItem" type="button" value={this.props.title}
                    onClick={() => this.props.onShow(this.props.id)}></input>
            </div>
        )
    }
}

export default Shared;