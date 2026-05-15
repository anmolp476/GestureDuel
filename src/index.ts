import express, { type Request, type Response } from 'express'
import { createServer } from 'http'
import { WebSocketServer, WebSocket } from 'ws'


const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) =>  {
    res.send("<script> const socket = new WebSocket('ws://10.0.0.212:3000'); socket.onopen = () => console.log('Connected!'); </script>");
})

const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
    console.log("New client connected!");

    ws.on('message', (message: string) => {
        console.log(`Recieved: ${message}`);
    });

    ws.on('close', () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => {
    console.log(`Express and WebSocket server running on http://localhost:${port}`)
})
