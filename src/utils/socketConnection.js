import socketIOClient from "socket.io-client";
const ENDPOINT = "https://jsramverk-editor-adpr12.azurewebsites.net/";
const LOCAL = 'http://localhost:1337';

const socket = socketIOClient(process.env.NODE_ENV === 'production'? ENDPOINT: LOCAL);

export default socket;
