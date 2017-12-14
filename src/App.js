import React, { Component } from 'react';
import './App.css';
import Message from './components/Message';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.saveMessage = this.saveMessage.bind(this);
    this.state = {
      messages: [],
    }
  }
  saveMessage(name, textMessage) {
    const prevMessages = this.state.messages;
    prevMessages.push({ name: name, message: textMessage });
    this.setState({
      messages: prevMessages
    });
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CHAT</h1>
        </header>
        {
          this.state.messages.map((message, index) => {
            
            return <Message key={index} name={message.name} text={message.message}/>
          })
        }
        <Footer saveMessage={this.saveMessage} />
      </div>
    );
  }
}

export default App;
