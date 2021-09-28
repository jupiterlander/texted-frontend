import socketIOClient from "socket.io-client";
const ENDPOINT = "https://jsramverk-editor-adpr12.azurewebsites.net/";
//const LOCAL = 'http://localhost:1337';

const socket = socketIOClient(ENDPOINT);

export default socket;
