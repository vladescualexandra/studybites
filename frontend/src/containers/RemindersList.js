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
            reminders: []
        }

        this.showReminder = (id) => {
            fetch(API_BASE_URL + `/reminders/${id}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.details)
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
                <ul>
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