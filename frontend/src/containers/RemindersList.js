import React, {Component} from 'react';
import Reminder from '../components/Reminder';

const API_BASE_URL = process.env.REACT_APP_API_BASEURL;
const user = {
    id: 1
};

class RemindersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reminders: [],
            active: false,
            classes: "list"
        }

        this.showReminder = (id) => {
            this.props.onSelect(id, 'reminders');
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
        fetch(API_BASE_URL + `/users/${user.id}/reminders`)
        .then((response) => response.json())
        .then((result) => {
            this.setState({
                reminders: result
            })
        })
    }

    render () {
        return (
            <div>
                <input className="mainList"  type="button" value="Reminders" onClick={this.showItems} />
                <ul className={this.state.classes}>
                    {this.state.reminders.map((reminder, index) => <Reminder key={index}
                                                                    id = {reminder.id}
                                                                    title = {reminder.title}
                                                                    onShow={this.showReminder}/>)}
                </ul>
            </div>
        )
    }
}

export default RemindersList;