import React, { Component } from 'react'
import validator from 'validator';

const style = {
    position: 'fixed',
    bottom: '0px',
    width: `100%`,
    margin: `10px 0px`
};

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
            //save message
            this.props.savaMessage(this.state.textMessage);
            //-------
            this.setState({ textMessage: '' });
        }

    }

    render() {
        return (
            <div style={style}>
                <div
                    style={{
                        width: `60%`,
                        margin: `0px auto`
                    }}>
                    <form onSubmit={(e) => this.sendMessage(e)}>
                        <input
                            type="text"
                            placeholder="message"
                            value={this.state.textMessage}
                            style={{
                                padding: `10px`,
                                margin: `30px`,
                                minWidth: `500px`
                            }}
                            onChange={this.setTextMessage} />
                        <input
                            style={{
                                padding: `10px`,
                                background: `white`
                            }}
                            type="button"
                            value="SEND"
                            onClick={this.sendMessage} />
                    </form>
                </div>
            </div>
        )
    }
}
