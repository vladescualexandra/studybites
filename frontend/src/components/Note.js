import React, {Component} from 'react';

class Note extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id, 
            title: props.title
        }       
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                id: this.props.id, 
                title: this.props.title
            })
        }
    }

    
    render() {
    return (
        <div>
            <input className="listItem" type="button" value={this.state.title ? this.state.title : 'Add title...'}
                onClick={() => this.props.onShow(this.props.id)}
                ></input>   
   
        </div>
    );
    }
}

export default Note;

