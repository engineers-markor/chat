import React, {Component} from 'react'
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <h1>CHAT</h1>
                    {this.props.auth
                        ? <Link to="logout" className="pt-button pt-icon-log-out">Log Out
                            </Link>
                        : null}
                </header>
            </div>
        )
    }
}
