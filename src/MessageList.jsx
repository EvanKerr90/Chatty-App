import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component  {
constructor(props) {
super(props)
}
render() {
const messages = this.props.messages.map((message) => {
return <Message key={message.id} message={message}/>
})
return (
<main className="messages">
{messages}
<div className="message system">
</div>
</main>
    )
}
}