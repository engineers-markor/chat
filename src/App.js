import React, {Component} from 'react';
import './App.css';
import Message from './components/Message';
import Footer from './components/Footer';
import {base} from './base';

class App extends Component {
  constructor() {
    super();
    this.saveMessage = this
      .saveMessage
      .bind(this);
    this.state = {
      messages: {}
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

  saveMessage(name, textMessage) {
    const id = Date.now();
    const messages = {
      ...this.state.messages
    };
    messages[id] = {
      name: name,
      message: textMessage,
      id: id
    }
    this.setState({messages});
    console.log(this.state.messages.length)
  }

  render() {
    const messagesIds = Object.keys(this.state.messages);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CHAT</h1>
        </header>
        <div className="Cheat-body">
          {messagesIds.map(messageId => (<Message
            key={messageId}
            name={this.state.messages[messageId].name}
            text={this.state.messages[messageId].message}
            saveMessage={this.saveMessage}/>))}
        </div>
        <div>
          <Footer saveMessage={this.saveMessage}/>
        </div>
      </div>
    );
  }
}

export default App;
