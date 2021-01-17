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
            <div >
                <span id="new">
                    <input id="newNote" type="button" value="New note" onClick={() => this.onCreate("note")}/>
                    <img id="openNew" 
                        src="https://www.flaticon.com/svg/vstatic/svg/152/152415.svg?token=exp=1610896313~hmac=85df12b38b8d6d7e2019ede0c872d2b3"
                        height="15px" alt="open" onClick={this.showItems}/>
                </span>  
                <div id="listNew" className={this.state.classes}>
                            <input className="new listItemNew" type="button" value="Note" onClick={() => this.onCreate("note")}/>
                            <input className="new listItemNew" type="button" value="Book" onClick={() => this.onCreate("book")}/>
                            <input className="new listItemNew" type="button" value="Reminder" onClick={() => this.onCreate("reminder")}/>
                            <input className="new listItemNew" type="button" value="Shared" onClick={() => this.onCreate("shared")}/>
                    </div>
            </div>
        )
    }
}

export default New;