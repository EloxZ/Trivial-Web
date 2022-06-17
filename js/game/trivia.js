import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import * as GameUtils from './game-utils.js';


const logs = document.getElementById('logs');
var cube = document.getElementById('cube');
var lastDiceNumber = 1;

var gameActive = true;
var canMove = false;

cube.addEventListener("click", async function() {
    if (GameUtils.diceAvailable) {
        await sleep(10);
        GameUtils.disableDice();
        await sleep(5000);
        lastDiceNumber = GameUtils.getDiceNumber();

        var boxes = [];
        var colors = [];
        var handlers = [];

        if (canMoveClockwise(bluePosition, lastDiceNumber)) {
            let idBox1 = (bluePosition+lastDiceNumber)%42;
            let idBox2 = (bluePosition-lastDiceNumber);
            if (idBox2 < 0) {
                idBox2 += 42;
            }
            let box1 = GameUtils.getBox(idBox1);
            let box2 = GameUtils.getBox(idBox2);
            let color1 = box1.options.fill;
            let color2 = box2.options.fill;
            let handler1 = GameUtils.selectBox(box1);
            let handler2 = GameUtils.selectBox(box2);

            boxes.push(box1, box2);
            colors.push(color1, color2);
            handlers.push(handler1, handler2);
        }
        
        

        
        var target = await GameUtils.waitUserInput(boxes);

        boxes.forEach((box, index) => {
            box.options.fill = colors[index];
            GameUtils.unselectBox(handlers[index]);
        });
        
        if (target == boxes[2]) {
            bluePosition = await moveClockwise(GameUtils.blueToken, bluePosition, -lastDiceNumber);
        } else {
            bluePosition = await moveClockwise(GameUtils.blueToken, bluePosition, lastDiceNumber);
        }

        GameUtils.activateDice();
    }
})


var bluePosition = 0;




// Socket connection
var joinServerParameters = {token: token};
const socket = io("ws://localhost:8082", {transports : ['websocket']}, {query: 'joinServerParameters=' + JSON.stringify(joinServerParameters)});

socket.on("connected", printMsg);




// Main
GameUtils.drawBoard();
GameUtils.startGame();
window.addEventListener('resize', redrawBoard);
GameUtils.activateDice();

printMsgString("Intentando conectarse a servidor...");

await sleep(1000);
GameUtils.moveToken(GameUtils.blueToken, GameUtils.getBox(bluePosition));
await sleep(600);



function redrawBoard() {
    GameUtils.actualScene.stopLoop();
    GameUtils.actualScene.clear;

    document.getElementsByTagName("canvas").item(0).remove();

    GameUtils.drawBoard();
    GameUtils.actualScene.startLoop();
}

async function moveClockwise(playerToken, currentBox, steps) {
    var pos = currentBox;
    if (steps > 0) {
        for (var step = 1; step<=steps; step++) {
            pos = (currentBox+step) % 42;
            
            GameUtils.moveToken(playerToken, GameUtils.getBox(pos));
            await sleep(600);
        }
    } else if (steps < 0) {
        for (var step = -1; step>=steps; step--) {
            pos = currentBox+step;
            if (pos < 0) pos = -((-pos % 42) - 42);
            if (pos == 42) pos = 0;
            
            GameUtils.moveToken(playerToken, GameUtils.getBox(pos));
            await sleep(600);
        }
    }
    return pos;
}

function canMoveClockwise(currentBox) {
    return (currentBox >= 0 && currentBox < 42); 
}

async function moveLineMinMax(playerToken, currentBox, steps, min, max) {
    var pos = currentBox;

    if (canMoveLineMinMax(currentBox, steps, min, max)) {
        if (steps > 0) {
            for (var step = 1; step<=steps; step++) {
                pos = (currentBox+step);

                switch (res) {
                    case 41:
                        currentBox = 0;
                        break; 
                    case 53:
                        currentBox = 21;
                        break;
                    case 52:
                        currentBox = 7;
                        break; 
                    case 64:
                        currentBox = 28;
                        break;
                    case 62:
                        currentBox = 14;
                        break; 
                    case 74:
                        currentBox = 35;
                        break;
                    default:
                        // Do Nothing
                }
                
                GameUtils.moveToken(playerToken, GameUtils.getBox(pos));
                await sleep(600);
            }
        } else if (steps < 0) {
            for (var step = -1; step>=steps; step--) {
                pos = currentBox+step;

                switch (res) {
                    case 41:
                        currentBox = 0;
                        break; 
                    case 53:
                        currentBox = 21;
                        break;
                    case 52:
                        currentBox = 7;
                        break; 
                    case 64:
                        currentBox = 28;
                        break;
                    case 62:
                        currentBox = 14;
                        break; 
                    case 74:
                        currentBox = 35;
                        break;
                    default:
                        // Do Nothing
                }
    
                GameUtils.moveToken(playerToken, GameUtils.getBox(pos));
                await sleep(600);
            }
        }
    }

    return pos;
}

function canMoveLineMinMax(currentBox, steps, min, max) {
    var res = false;
    if (currentBox >= min && currentBox <= max && steps != 0) {
        res = (steps > 0)? (currentBox + steps <= max) : (currentBox + steps >= min);
    }
    return res;
}

function canMoveLineHorizontal(currentBox, steps) {
    switch (currentBox) {
        case 0:
            currentBox = 41;
            break; 
        case 21:
            currentBox = 53;
            break;
        default:
            // Do Nothing
    }
    return canMoveLineMinMax(currentBox, steps, 41, 53);
}

function canMoveLineDiagonal1(currentBox, steps) {
    switch (currentBox) {
        case 7:
            currentBox = 52;
            break; 
        case 28:
            currentBox = 64;
            break;
        default:
            // Do Nothing
    }
    return canMoveLineMinMax(currentBox, steps, 52, 64);
}

function canMoveLineDiagonal2(currentBox, steps) {
    switch (currentBox) {
        case 14:
            currentBox = 62;
            break; 
        case 35:
            currentBox = 74;
            break;
        default:
            // Do Nothing
    }
    return canMoveLineMinMax(currentBox, steps, 62, 74);
}

async function moveLineHorizontal(playerToken, currentBox, steps) { 
    switch (currentBox) {
        case 0:
            currentBox = 41;
            break; 
        case 21:
            currentBox = 53;
            break;
        default:
            // Do Nothing
    }
    return await moveLineMinMax(playerToken, currentBox, steps, 41, 53);
}

async function moveLineDiagonal1(playerToken, currentBox, steps) {
    switch (currentBox) {
        case 7:
            currentBox = 52;
            break; 
        case 28:
            currentBox = 64;
            break;
        default:
            // Do Nothing
    }
    return await moveLineMinMax(playerToken, currentBox, steps, 52, 64);
}

async function moveLineDiagonal2(playerToken, currentBox, steps) {
    switch (currentBox) {
        case 14:
            currentBox = 62;
            break; 
        case 35:
            currentBox = 74;
            break;
        default:
            // Do Nothing
    }
    return moveLineMinMax(playerToken, currentBox, steps, 62, 74);
}


function printMsgString(string) {
    logs.value += '\r\n' + "Cliente: " + string;
}

function printMsg(data) {
    logs.value += '\r\n' + "Server: " + data.message;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
