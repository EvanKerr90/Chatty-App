import React, { Component } from 'react';

export default class ChatBar extends Component {
    constructor(props) {
    super(props)
    }
    render() {
    return (
    <footer className="chatbar">
    <input className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)"/>
    <input className="chatbar-message" placeholder="Type a message and hit ENTER"/>
  </footer>
    )
}
}