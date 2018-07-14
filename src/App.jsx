import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: {
        name: "Anonymous"
      },
      messages: [],
      userCount: '0',
      appColor: 'red'
    }
    this.newMessage = this.newMessage.bind(this)
    this.newCurrentUser = this.newCurrentUser.bind(this)
    this.newAppColor = this.newAppColor.bind(this)
    this.newUserColor = this.newUserColor.bind(this)
    this.socket = new WebSocket('ws://localhost:3001')
  }

  randomColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16)
  }


  newAppColor(color) {
    if (color === 'random') {
      this.setState({
        appColor: this.randomColor()
      })
    } else {
      this.setState({
        appColor: color
      })
    }
  }

  newUserColor(color) {
    if (color === 'random') {
      this.setState(prevState => ({
        currentUser: {
          name: prevState.currentUser.name,
          color: this.randomColor()
        }
      }))
    } else {
      this.setState(prevState => ({
        currentUser: {
          name: prevState.currentUser.name,
          color: color
        }
      }))
    }
  }


  newCurrentUser(username) {
    let content = this.state.currentUser.name + " has changed their name to " + username + "."
    let newMessage = JSON.stringify({
      type: 'postNotification',
      content: content
    })
    this.socket.send(newMessage)
    this.setState(prevState => ({
      currentUser: {
        name: username,
        color: prevState.currentUser.color
      }
    }))
  }

  imageTest(contentString) {
    const testRegex = /(jpe?g|gif|png)(?=\?.+|$)/
    const contentArray = contentString.split(' ')
    let url = []
    let newContentString = []
    contentArray.forEach(function (word) {
      if (testRegex.test(word)) {
        url.push(word)
      } else {
        newContentString.push(word)
      }
    })
    if (url.length > 0) {
      return {
        url: url,
        content: newContentString.join(' '),
      }
    } else {
      return contentString;
    }
  }


  newMessage(content) {
    let imageUrl = this.imageTest(content)
    if (imageUrl.url) {
      let newMessage = JSON.stringify({
        username: this.state.currentUser.name,
        content: imageUrl.content,
        type: "postMessage",
        color: this.state.currentUser.color,
        images: imageUrl.url
      });
      this.socket.send(newMessage)
    } else {
      let newMessage = JSON.stringify({
        username: this.state.currentUser.name,
        content: imageUrl,
        type: "postMessage",
        color: this.state.currentUser.color
      });
      this.socket.send(newMessage)
    }
  }


  componentDidMount() {


    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }
    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data)
      if (data.type === 'userCount') {
        this.setState({
          userCount: data.size
        })
      } else if (data.type === 'color') {
        this.newUserColor(data.color)
      } else {
        let messages = this.state.messages.concat(data)
        this.setState({
          messages: messages
        })
      }
    }
  }


  render() {
    return (
        <div>
        <nav className="navbar" style={{backgroundColor: this.state.appColor}}>
          <a href="/" className="navbar-brand" >Chatty</a>
          <span className="user-count">{this.state.userCount} users online</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} newUserColor={this.newUserColor} newAppColor={this.newAppColor} newMessage={this.newMessage} appColor={this.state.appColor} newCurrentUser={this.newCurrentUser}/>
      </div>
      )
      }
      }
