const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
const getImageId = function(images) {
   let id = []
   if (images.length > 0) {
     images.forEach(function(image) {
     id.push(uuidv1())
     })
     return id;
   } 
 }

 const randomColor = function() {
  return "#"+((1<<24)*Math.random()|0).toString(16)
}



wss.broadcast = function broadcast(msg) {
  wss.clients.forEach(function each(client) {
      client.send(msg);
   });
};


wss.on('connection', (ws) => {
  let userEnter = JSON.stringify({size: wss.clients.size,
    type: 'userCount'})
    console.log(wss.clients)
  console.log('Client connected');
  ws.send(JSON.stringify({color: randomColor(), type: 'color'}))
  wss.broadcast(userEnter)
  
  ws.onmessage = (event) => {
    let incoming = JSON.parse(event.data)
      switch(incoming.type) {
        case "postMessage":
        if (!incoming.images || incoming.images.length <= 0) {
          let outgoingMessage = {
             username: incoming.username,
             content: incoming.content,
             color: incoming.color,
             id: uuidv1(),
             type: "incomingMessage",
          }
          wss.broadcast(JSON.stringify(outgoingMessage))
        } else { 
        let outgoingMessage = {
           username: incoming.username,
           content: incoming.content,
           color: incoming.color,
          id: uuidv1(),
          type: "incomingMessage",
           images: incoming.images,
          imageID: getImageId(incoming.images)
        }
        wss.broadcast(JSON.stringify(outgoingMessage))
      }
        break;
      case "postNotification":
      let outgoingNotification = {
        content: incoming.content,
        type: "incomingNotification",
        id: uuidv1(),
      }
        wss.broadcast(JSON.stringify(outgoingNotification))
      break;
    default:
    throw new Error("Unknown event type " + data.type);
      }
}

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    let userExit = JSON.stringify({size: wss.clients.size,
      type: 'userCount'})
    wss.broadcast(userExit)
  console.log('Client disconnected');
  })
});