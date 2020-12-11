import React, { Component } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASEURL;


class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            type: this.props.type,
            title: '',
            content: ''
        }
    }

    componentDidMount() {
        if (this.props.id !== 0) {
            console.log(API_BASE_URL + `/${this.props.type}/${this.props.id}`);
            fetch(API_BASE_URL + `/${this.props.type}/${this.props.id}`)
            .then((response) => response.json())
            .then((result) => {

            this.setState({
                title: result.title,
                content: result.content
            })
            }) 
        }
    }

    componentDidUpdate(prevProps) {
     
        if (this.props.id !== prevProps.id) {
            fetch(API_BASE_URL + `/${this.props.type}/${this.props.id}`)
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    id: this.props.id, 
                    type: this.props.type,
                    title: result.title,
                })

                switch(this.props.type) {
                    case "reminders": 
                        this.setState({
                            content: result.details
                        });
                        break;
                default:
                    this.setState({
                        content: result.content
                    });
                    break;
                }
            })
  
        }
        
    }

    render() {
        return (
            <div id="editor">
                <input 
                    id="title" 
                    type="text" 
                    placeholder="Title"
                    value={this.state.title ? this.state.title : ''}
                    onChange={(e) => {this.updateTitle(e.target.value)}}
                    /> <br/>
                <textarea 
                    id="content" 
                    type="textarea" 
                    placeholder="Content" 
                    value={this.state.content ? this.state.content : ''}
                    onChange={(e) => {this.updateContent(e.target.value)}}
                    />
            </div>
        )
    }
}


export default Editor;