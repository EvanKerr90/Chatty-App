import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

export default class App extends Component {
  constructor() {
  super()
  this.state = {currentUser: {name: "Bob"},
  messages: []
}
this.newMessage = this.newMessage.bind(this)
this.newCurrentUser = this.newCurrentUser.bind(this)
this.socket = new WebSocket('ws://localhost:3001')
}


newCurrentUser(username) {
this.setState({currentUser:{name: username}})
}


newMessage(content) {
   let newMessage = JSON.stringify({username: this.state.currentUser.name, content: content});
   this.socket.send(newMessage)
    }

    

componentDidMount() {
 

 this.socket.onopen = (event) => {
     console.log('Connected to server');
 }
  this.socket.onmessage = (event) => {
    let messages = this.state.messages.concat(JSON.parse(event.data))
     this.setState({messages: messages})
  }
}

  render() {
    return (
        <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar ws={this.socket} currentUser={this.state.currentUser} newMessage={this.newMessage} newCurrentUser={this.newCurrentUser}/>
      </div>
      )
      }
      }
