import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
const shortid = require('shortid');

export default class App extends Component {
  constructor(props) {
  super()
  this.state = {currentUser: {name: "Bob"},
  messages: [
    { 
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id: "1"
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id: "2"
    }
  ]
}
this.newMessage = this.newMessage.bind(this)
}


newMessage(content) {
  const newMessage = {id: shortid.generate(), username: content.username, content: content.message};
  const messages = this.state.messages.concat(newMessage)
   this.setState({messages: messages})
}



  render() {
    return (
        <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage}/>
      </div>
      )
      }
      }
