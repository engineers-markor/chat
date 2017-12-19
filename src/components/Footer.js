import React, { Component } from 'react'
import validator from 'validator';
import '../App.css';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.setTextMessage = this.setTextMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            textMessage: ''
        }
    }

    setTextMessage(e) {
        this.setState({ textMessage: e.target.value });
    }

    sendMessage(e) {
        e.preventDefault();
        if (!validator.isEmpty(this.state.textMessage)) {
            this.props.savaMessage(this.state.textMessage);
            this.setState({ textMessage: '' });
        }
    }

    render() {
        return (
            <div className="footer">
                <div
                    style={{
                        width: `60%`,
                        margin: `0px auto`
                    }}>
                    <form onSubmit={(e) => this.sendMessage(e)}>
                        <input
                            className="pt-input"
                            type="text"
                            placeholder="message"
                            value={this.state.textMessage}
                            style={{
                                minWidth: `250px`,
                                float: `left`
                            }}
                            onChange={this.setTextMessage} />
                        <button
                            className="pt-button pt-intent-primary pt-icon-arrow-up"
                            type="button"
                            style={{
                                float: `left`
                            }}
                            value="SEND"
                            onClick={this.sendMessage} />
                    </form>
                </div>
            </div>
        )
    }
}
