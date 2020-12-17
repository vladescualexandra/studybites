import React, { Component } from 'react';

class New extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            active: false,
            classes: "list"
        }

        this.showItems = async () => {
            let on = !this.state.active;
            let cls = on ? "list-active" : "list";
    
            await this.setState({
                active: on,
                classes: cls
            })   
        }

        this.onCreate = async (value) => {
            this.props.onCreate(value);
        }
    }

    render() {
        return (
            <div>
                <input className="new" type="button" value="+ NEW" onClick={this.showItems}/>
                <div className={this.state.classes}>
                        <input className="new" type="button" value="Note" onClick={() => this.onCreate("note")}/>
                        <input className="new" type="button" value="Book" onClick={() => this.onCreate("book")}/>
                        <input className="new" type="button" value="Reminder" onClick={() => this.onCreate("reminder")}/>
                        <input className="new" type="button" value="Shared" onClick={() => this.onCreate("shared")}/>

                </div>
            </div>
        )
    }
}

export default New;