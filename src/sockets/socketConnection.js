import { Manager } from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_DOC_SOCKETSERVER;
const manager = new Manager(ENDPOINT, {
    autoConnect: false
});

export const getSocket = (token) => {
    const newToken = token? token : sessionStorage.getItem('token');
    const socket = manager.socket("/", {
        auth: {
            token: newToken,
        },
    });

    // Fix for firefox...
    socket.auth.token = newToken;
    return socket;
};

export default getSocket;
