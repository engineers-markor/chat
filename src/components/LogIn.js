import React, {Component} from 'react';
import validator from 'validator';
import {app, facebookProvider, base} from '../base';
import {Redirect} from 'react-router-dom';
import '../App.css';

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            loginEmail: '',
            loginPassword: '',
            redirect: false,
            loading: true
        }
        this.createAccount = this
            .createAccount
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

        this.setLoginEmail = this
            .setLoginEmail
            .bind(this);

        this.setLoginPassword = this
            .setLoginPassword
            .bind(this);

        this.login = this
            .login
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

    setLoginEmail(e) {
        this.setState({loginEmail: e.target.value})
    }
    setLoginPassword(e) {
        this.setState({loginPassword: e.target.value})
    }

    logInWithFacebook(e) {
        e.preventDefault();
        app
            .auth()
            .signInWithPopup(facebookProvider)
            .then(result => {
                if (result.additionalUserInfo.isNewUser) {
                    this.addUser(result.user.uid, result.user.email, result.user.displayName, result.user.photoURL);
                }
                console.log(result);
                this.setState({redirect: true})
            })
            .catch(error => {
                console.log(error);
            })

    }

    login(e) {
        e.preventDefault();
        //log in
        if (validator.isEmail(this.state.loginEmail) && !validator.isEmpty(this.state.loginPassword) && this.state.loginPassword.length > 5) {
            app
                .auth()
                .signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPassword)
                .then((user) => {
                    console.log(user);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    createAccount(e) {
        e.preventDefault();
        if (!validator.isEmpty(this.state.username) && validator.isEmail(this.state.email) && !validator.isEmpty(this.state.password) && this.state.password.length > 5) {
            app
                .auth()
                .fetchProvidersForEmail(this.state.email)
                .then((providers) => {
                    if (providers.length === 0) {
                        //create account
                        return app
                            .auth()
                            .createUserWithEmailAndPassword(this.state.email, this.state.password);
                    } else if (providers.indexOf('password') === -1) {
                        console.log('Log in with facebook');
                    } else {
                        console.log('Already have account');
                    }
                })
                .then((user) => {
                    if (user) {
                        console.log(user);
                        this.addUser(user.uid, user.email, this.state.username, user.photoURL
                            ? user.photoURL
                            : '');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    addUser(uid, email, username, photoUrl) {
        base.post(`users/${uid}`, {
            data: {
                username: username,
                email: email,
                photoUrl: photoUrl
            }
        });
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
                    <input
                        className="pt-button"
                        type="button"
                        onClick={this.createAccount}
                        value="Create Account"/>
                </div>
                <div className="login">
                    <h5>Log In</h5>
                    <input
                        type="email"
                        value={this.state.loginEmail}
                        onChange={this.setLoginEmail}
                        placeholder="Email"/>
                    <input
                        placeholder="Password"
                        type="password"
                        value={this.state.loginPassword}
                        onChange={this.setLoginPassword}/>
                    <input className="pt-button" type="button" onClick={this.login} value="Log In"/>
                </div>
            </div>
        );
    }
}
