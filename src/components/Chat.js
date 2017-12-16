import React, { Component } from 'react'
import { base } from '../base';
import Footer from './Footer';
import Message from './Message';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.savaMessage = this.savaMessage.bind(this);
        this.state = {
            messages: {},
        }
    }
    componentWillMount() {
        this.messagesRef = base.syncState('messages', {
            context: this,
            state: 'messages'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.messagesRef);
    }

    savaMessage(textMessage) {
        const user = this.props.user;
        base.push('messages', {
            data: {
                time: Date.now(),
                id: user.uid,
                username: user.displayName,
                textMessage: textMessage,
                photoUrl: user.photoURL,
            }
        });
    }

    render() {
        const messagesIds = Object.keys(this.state.messages);
        const messages = this.state.messages;
        return (
            <div>
                {messagesIds.map((id) => {
                    return <Message
                        key={id}
                        name={messages[id].username}
                        textMessage={messages[id].textMessage}
                    />
                })}

                <Footer
                    savaMessage={this.savaMessage} />
            </div>
        )
    }
}
