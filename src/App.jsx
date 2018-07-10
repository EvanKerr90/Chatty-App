import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
var shortid = require('shortid');

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

// componentDidMount() {
//   console.log("componentDidMount <App />");
//   setTimeout(() => {
//     console.log("Simulating incoming message");
//     // Add a new message to the list of messages in the data store
//     const newMessage = {id: 3, username: 'Michelle', content: "stuff"};
//     const messages = this.state.messages.concat(newMessage)
//     // Update the state of the app component.
//     // Calling setState will trigger a call to render() in App and all child components.
//     this.setState({messages: messages})
//   })
// }

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
