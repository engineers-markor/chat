import React, { Component } from 'react'

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
        this.setUsername = this.setUsername.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    setUsername(e) {
        this.setState({
            username: e.target.value,
        })
    }
    logIn(e){
        e.preventDefault();
        this.props.logIn(this.state.username);
    }

    render(props) {
        return (
            <div>
                <label>Enter Username </label>
                <input
                    type="text"
                    value={this.state.username}
                    onChange={this.setUsername} />
                <input type="button" onClick={this.logIn} value="Log In" />
            </div>
        )
    }
}
