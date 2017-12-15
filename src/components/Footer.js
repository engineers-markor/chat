import React, { Component } from 'react'

const style = {
    position: 'fixed',
    bottom: '0px',
    width: `100%`,
    margin: `10px 0px`
};

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.setTextMessage = this
            .setTextMessage
            .bind(this);
        this.sendMessage = this
            .sendMessage
            .bind(this);
        this.state = {
            name: '',
            textMessage: ''
        }
    }

    setTextMessage(e) {
        this.setState({ textMessage: e.target.value });
    }

    sendMessage(e) {
        e.preventDefault();
        this.setState({ textMessage: '' });
        this
            .props
            .saveMessage(this.state.textMessage);

    }

    render() {
        return (
            <div style={style}>
                <div
                    style={{
                        width: `60%`,
                        margin: `0px auto`
                    }}>
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
                </div>
            </div>
        )
    }
}
