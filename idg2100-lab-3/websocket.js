/* WebSocket
A Websocket is a communication protocol that provides full-duplex, --
-- bidirectional communication between a client (like a web browser) --
-- and a server over a single, persistent connection
It allows data to be sent and recieved simultaneously in real time--
--without the need for repeated requests */

// Create WebSocket connection running locally on port 8080.
const socket = new WebSocket("ws://localhost:8080");

// Connection opened
// Once the connection is open, it sends a message "Hello Server!" to the server
socket.addEventListener("open", (event) => {
    socket.send("Hello Server!");
});

// Listen for messages
//Whenever the server sends a message, it logs it to the console
socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
});