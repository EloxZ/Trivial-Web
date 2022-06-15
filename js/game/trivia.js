import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import * as GameUtils from './game-utils.js';


const logs = document.getElementById('logs');

// Socket connection
var joinServerParameters = {token: token};
const socket = io("ws://localhost:8082", {transports : ['websocket']}, {query: 'joinServerParameters=' + JSON.stringify(joinServerParameters)});

socket.on("connected", printMsg);




// Main
GameUtils.drawBoard();
GameUtils.startGame();

window.addEventListener('resize', function(event, actualScene) {
    GameUtils.actualScene.stopLoop();
    GameUtils.actualScene.clear;

    document.getElementsByTagName("canvas").item(0).remove();

    GameUtils.drawBoard();
    GameUtils.actualScene.startLoop();
}, true);



await sleep(2000);
GameUtils.moveToken(GameUtils.blueToken, GameUtils.yellowRectangle6);
await sleep(2000);
GameUtils.moveToken(GameUtils.blueToken, GameUtils.grayRectangle);
await sleep(2000);
GameUtils.moveToken(GameUtils.blueToken, GameUtils.orangeRectangle6);
await sleep(2000);
GameUtils.moveToken(GameUtils.blueToken, GameUtils.greenRectangle6);


function printMsg(data) {
    logs.value += '\r\n' + "Server: " + data.message;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}