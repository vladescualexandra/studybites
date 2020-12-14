import React, {Component} from 'react';
import Reminder from '../components/Reminder';
import CODES from '../codes.json';
import RemindersStore from '../stores/RemindersStore';

class RemindersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            reminders: [],
            active: false,
            classes: "list"
        }

        this.store = new RemindersStore(this.state.id);

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
        this.store.getAll();
        this.store.emitter.addListener(CODES.CODE_GET_ALL_REMINDERS, () => {
            this.setState({
                reminders: this.store.reminders
            })
        })
    }

    async componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {

            await this.setState({
                id: this.props.id
            })

            this.store = new RemindersStore(this.state.id);
            await this.store.getAll();
            this.store.emitter.addListener(CODES.CODE_GET_ALL_REMINDERS, async () => {
                await this.setState({
                    reminders: this.store.reminders
                })
            })
        }
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