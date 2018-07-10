import React, { Component } from 'react';

export default class ChatBar extends Component {
    constructor(props) {
    super(props)
    this.state = { message: '', username: '', id: ''}
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    }

    onChangeMessage(event) {
        event.preventDefault()
        this.setState({
            message: event.target.value,
        }) 
    }

    onChangeUsername(event) {
        event.preventDefault()
        this.setState({
            username: event.target.value,
        }) 
    }

    onKeyUp(event) {
        let username = '';
        event.preventDefault();
        if (event.keyCode === 13) {
        if (this.state.username.length <= 0) {
        username = "Anonymous";
        } else {
        username = this.state.username;
        }
        return this.props.newMessage({message: this.state.message, username: username, id: this.state.id});
        }
    }
    render() {
    return (
    <footer className="chatbar">
    <input type="text" className="chatbar-username" ref="chatbar-username" onChange={this.onChangeUsername} defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)"/>
    <input type="text" className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onChangeMessage} onKeyUp={this.onKeyUp}/>
  </footer>
    )
}
}