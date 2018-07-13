import React, { Component } from 'react';

export default class ChatBar extends Component {
    constructor(props) {
    super(props)
    this.state = { message: '', username: this.props.currentUser.name, color: this.props.appColor, buttonColor: 'white'}
    this.onKeyUpMessage = this.onKeyUpMessage.bind(this)
    this.onKeyUpUsername = this.onKeyUpUsername.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onClickColor = this.onClickColor.bind(this)
    this.onClickSelect = this.onClickSelect.bind(this)
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


    onClickColor(event) {
        event.preventDefault()
        if (this.state.buttonColor.buttonAppColor === 'red') {
        this.props.newAppColor(event.target.value)
        } else {
            this.props.newUserColor(event.target.value)
    } 
}

    onClickSelect(event) {
        event.preventDefault()
        if (event.target.value === 'app color') {
        this.setState(prevState => ({...prevState, buttonColor: {buttonAppColor: 'red', buttonUserColor: 'white'}}))
        } else {
            this.setState(prevState => ({...prevState, buttonColor: {buttonAppColor: 'white', buttonUserColor: 'red'}}))
            }
    }

    render() {
    return (
    <footer className="chatbar" style={{backgroundColor: this.props.appColor}}>
    <input type="text" className="chatbar-username" onChange={this.onChangeUsername} onKeyUp={this.onKeyUpUsername} defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)"/>
    <input type="text" className="chatbar-message" value={this.state.message} placeholder="Type a message and hit ENTER" onChange={this.onChangeMessage} onKeyUp={this.onKeyUpMessage}/>
    <span className="color-buttons">
    <input type="button" className="color-button" value="red" onClick={this.onClickColor}/>
    <input type="button" className="color-button" value="blue" onClick={this.onClickColor}/>
    <input type="button" className="color-button" value="green" onClick={this.onClickColor}/>
    <input type="button" className="color-button" value="yellow" onClick={this.onClickColor}/>
    <input type="button" className="color-button" value="random" onClick={this.onClickColor}/>
    </span>
    <span className="change-buttons">
    <input type="button" className="change-button" style={{backgroundColor: this.state.buttonColor.buttonAppColor}} value="app color" onClick={this.onClickSelect}/>
    <input type="button" className="change-button" style={{backgroundColor: this.state.buttonColor.buttonUserColor}} value="username color" onClick={this.onClickSelect}/>
    </span>
  </footer>
    )
}
}