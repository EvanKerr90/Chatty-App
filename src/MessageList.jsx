import React, {Component} from 'react';
import Message from './Message.jsx';

function Notification(props) { 
    return (
<div className="notification">
  <span className="notification-content">{props.message.content}</span>
</div>
    )
}

export default function MessageList(props)  {

const messages = props.messages.map((message) => {
   switch(message.type) { 
       case 'incomingNotification':
       return <Notification message={message} key={message.id}/>;
       default: 
       return <Message key={message.id} message={message}/>
    }   
})
return (
<main className="messages">
{messages}
<div className="message system">
</div>
</main>
    )
}

