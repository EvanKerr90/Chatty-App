import React from 'react';



export default function Message(props) { 
    if (props.message.images) {
    let displayImages = props.message.images.map((image, key) => {
        let id = props.message.imageID[key]
        return <img src={image} key={id} className="message-image"/>
    })

    return (
<div className="message" id={props.message.id}>
<span className="message-username" style={{color: props.message.color}}>{props.message.username}</span>
<span className="message-content">{props.message.content}{displayImages}</span>
</div>
    )

    } else {
    return (
<div className="message" id={props.message.id}>
<span className="message-username" style={{color: props.message.color}}>{props.message.username}</span>
<span className="message-content">{props.message.content}</span>
</div>
    )
}
}



