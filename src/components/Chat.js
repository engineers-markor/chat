import React, { Component } from 'react'
import { base } from '../base';
import Footer from './Footer';
import Message from './Message';
import '../App.css';
import { Scrollbars } from 'react-custom-scrollbars';

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
                username: user.username,
                textMessage: textMessage,
                photoUrl: user.photoUrl,
            }
        });
    }

    componentDidUpdate() {
        this.scrollComponent.scrollToBottom();
    }

    render() {
        const messagesIds = Object.keys(this.state.messages);
        const messages = this.state.messages;
        return (
            <div className="main">
                <Scrollbars style={{ width: `auto`, height: `auto` }} autoHide ref={c => { this.scrollComponent = c }} >
                    {messagesIds.map((id) => {
                        let float = `left`
                        if (messages[id].id === this.props.user.uid)
                            float = `right`
                        return (<Message
                            float={float}
                            key={id}
                            name={messages[id].username}
                            textMessage={messages[id].textMessage}
                        />)
                    })}
                </Scrollbars>
                <Footer
                    savaMessage={this.savaMessage} />
            </div>
        )
    }
}
