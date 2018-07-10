import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

export default class App extends React.Component {
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
}


  render() {
    return (
        <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser}/>
      </div>
      )
      }
      }
