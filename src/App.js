import React, { Component } from 'react';
import './App.css';
import LogIn from './components/LogIn';
import { base, app } from './base';
import { Route, Redirect } from 'react-router-dom'
import Header from './components/Header';
import Chat from './components/Chat';
import LogOut from './components/LogOut';


class App extends Component {
  constructor() {
    super();
    this.saveMessage = this.saveMessage.bind(this);
    this.state = {
      user: {},
      auth: false,
      loading: true,
    }
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          auth: true,
          loading: false,
          user: user,
        });
      } else {
        this.setState({
          auth: false,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.messagesRef);
    this.removeAuthListener();
  }

  saveMessage(textMessage) {
    const id = Date.now();
    const messages = {
      ...this.state.messages
    };
    messages[id] = {
      name: this.state.user.email,
      message: textMessage,
      id: id
    }
    this.setState({ messages });
  }

  logOut() {
    app.auth().signOut();
  }

  render() {
    if (this.state.loading)
      return (<h1>Loading</h1>);
    return (
      <div className="App">
        <div className="header">
          <Header
            auth={this.state.auth} />
        </div>
        <Route exact path="/" render={props => (
          this.state.auth ? <Redirect to="/chat" /> : <Redirect to="/login" />
        )} />
        <Route exact path="/logout" render={props => (
          <LogOut />
        )} />
        <Route path="/chat" render={props => (
          this.state.auth ? <Chat
            user={this.state.user} /> : <Redirect to="/login" />
        )} />
        <Route path="/login" render={props => (
          this.state.auth ? <Redirect to="/chat" /> : <LogIn logIn={this.logIn} />
        )} />
      </div >
    );
  }
}


export default App;
