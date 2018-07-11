import React, { Component } from 'react';

export default class ChatBar extends Component {
    constructor(props) {
    super(props)
    this.state = { message: '', username: this.props.currentUser.name}
    this.onKeyUpMessage = this.onKeyUpMessage.bind(this)
    this.onKeyUpUsername = this.onKeyUpUsername.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    }

    onChangeMessage(event) {
        event.preventDefault()
        this.setState({
            message: event.target.value
        }) 
    }

    onChangeUsername(event) {
        event.preventDefault()
        this.setState({
            username: event.target.value
        }) 
    }

    onKeyUpMessage(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            if (this.state.message.length <= 0) {
                alert("You can not submit empty messages")
                return;
            }
        this.props.newMessage(this.state.message) 
        this.setState({message: ''})
        }
    }

    onKeyUpUsername(event) {
        let username = '';
        event.preventDefault();
        if (event.keyCode === 13) {
        if (this.state.username.length <= 0) {
         username = "Anonymous";
         } else {
         username = this.state.username;
         }
        this.props.newCurrentUser(username) 
        }
    }

    render() {
    return (
    <footer className="chatbar">
    <input type="text" className="chatbar-username" onChange={this.onChangeUsername} onKeyUp={this.onKeyUpUsername} defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)"/>
    <input type="text" className="chatbar-message" value={this.state.message} placeholder="Type a message and hit ENTER" onChange={this.onChangeMessage} onKeyUp={this.onKeyUpMessage}/>
  </footer>
    )
}
}