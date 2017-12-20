import React, {Component} from 'react';
import validator from 'validator';
import {app, facebookProvider} from '../base';
import {Redirect} from 'react-router-dom';
import '../App.css';

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            redirect: false,
            loading: true
        }
        this.logIn = this
            .logIn
            .bind(this);
        this.setUsername = this
            .setUsername
            .bind(this);
        this.setPassword = this
            .setPassword
            .bind(this);
        this.setEmail = this
            .setEmail
            .bind(this);
        this.logInWithFacebook = this
            .logInWithFacebook
            .bind(this);
    }

    setUsername(e) {
        this.setState({username: e.target.value})
    }

    setPassword(e) {
        this.setState({password: e.target.value})
    }

    setEmail(e) {
        this.setState({email: e.target.value})
    }

    logInWithFacebook(e) {
        e.preventDefault();
        app
            .auth()
            .signInWithPopup(facebookProvider)
            .then(result => {
                this.setState({redirect: true})
            })
            .catch(error => {
                console.log(error);
            })

    }

    logIn(e) {
        e.preventDefault();
        if (!validator.isEmpty(this.state.username) && validator.isEmail(this.state.email) && !validator.isEmpty(this.state.password) && this.state.password.length > 5) {
            console.log("pass")
            // app     .auth()     .createUserWithEmailAndPassword(this.state.email,
            // this.state.password)     .then(() => {         this.setState({redirect:
            // true})     })     .catch((error) => {         console.log(error);     });
        }
    }

    render(props) {

        if (this.state.redirect) {
            return <Redirect to="/chat"/>
        }

        return (
            <div className="form">
                <div className="loginFacebook">
                    <button
                        className="pt-button pt-intent-primary pt-icon-log-in"
                        type="button"
                        onClick={this.logInWithFacebook}>Log In with Facebook</button>
                </div>
                <div className="singup">
                    <h5>Create new Account</h5>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.setUsername}
                        placeholder="User Name"/>
                    <input
                        type="email"
                        value={this.state.email}
                        onChange={this.setEmail}
                        placeholder="Email"/>
                    <input
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.setPassword}/>
                    <input type="button" onClick={this.logIn} value="Create Account"/>
                </div>
                <div className="login">
                    <h5>Log In</h5>
                    <input
                        type="email"
                        value={this.state.email}
                        onChange={this.setEmail}
                        placeholder="Email"/>
                    <input
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.setPassword}/>
                    <input type="button" onClick={this.logIn} value="Log In"/>
                </div>
            </div>
        )
    }
}
