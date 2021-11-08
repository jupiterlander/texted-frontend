import socketIOClient from "socket.io-client";
//const ENDPOINT = "wss://jsramverk-editor-adpr12.azurewebsites.net/";
//const ENDPOINT = 'http://localhost:1337';
const ENDPOINT = 'ws://localhost:1337';

const socket = socketIOClient(ENDPOINT, {withCredentials: true});

export default socket;
