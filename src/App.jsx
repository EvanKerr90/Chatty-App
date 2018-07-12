import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

export default class App extends Component {
  constructor() {
  super()
  this.state = {currentUser: {name: "Anonymous"},
  messages: [],
  userCount: '0'
}
this.newMessage = this.newMessage.bind(this)
this.newCurrentUser = this.newCurrentUser.bind(this)
this.socket = new WebSocket('ws://localhost:3001')
}


newCurrentUser(username) {
let content = this.state.currentUser.name + " has changed their name to " + username + "."
let newMessage = JSON.stringify({type: 'postNotification', content: content})
this.socket.send(newMessage)
this.setState(prevState => ({currentUser: {name: username, color: prevState.currentUser.color}}))
}


newMessage(content) {
   let newMessage = JSON.stringify({username: this.state.currentUser.name, content: content, type: "postMessage", color: this.state.currentUser.color});
   this.socket.send(newMessage)
    }

componentDidMount() {
 

 this.socket.onopen = (event) => {
     console.log('Connected to server');
 }
  this.socket.onmessage = (event) => {
    let data = JSON.parse(event.data)
    if (data.type === 'color') {
      this.setState({currentUser: {name: this.state.currentUser.name, color: data.color}})
      console.log(data.color)
    } else if (data.type === 'userCount') {
      this.setState({userCount: data.size})
    } else {
    let messages = this.state.messages.concat(data)
      this.setState({messages: messages})
    }
    }
  }


  render() {
    return (
        <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand" >Chatty</a>
          <span className="user-count">{this.state.userCount} users online</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar ws={this.socket} currentUser={this.state.currentUser.name} newMessage={this.newMessage} newCurrentUser={this.newCurrentUser}/>
      </div>
      )
      }
      }
