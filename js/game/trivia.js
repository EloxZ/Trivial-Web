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

        var squares = [];
        var colors = [];
        var handlers = [];
        var commands = [];

        var [result, pos1, pos2] = canMoveClockwise(bluePosition, lastDiceNumber);
        if (result) {
            let square1 = GameUtils.squares[pos1].object;
            let square2 = GameUtils.squares[pos2].object;
            let color1 = square1.options.fill;
            let color2 = square2.options.fill;
            let handler1 = GameUtils.selectSquare(square1);
            let handler2 = GameUtils.selectSquare(square2);

            squares.push(square1, square2);
            colors.push(color1, color2);
            handlers.push(handler1, handler2);
            commands.push(0, 1);
        }


        var [result, pos] = canMoveLineHorizontal(bluePosition, lastDiceNumber);
        if (result) {
            let square = GameUtils.squares[pos].object;
            let color = square.options.fill;
            let handler = GameUtils.selectSquare(square);
            squares.push(square);
            colors.push(color);
            handlers.push(handler);
            commands.push(2);
        }

        [result, pos] = canMoveLineHorizontal(bluePosition, -lastDiceNumber);
        if (result) {
            let square = GameUtils.squares[pos].object;
            let color = square.options.fill;
            let handler = GameUtils.selectSquare(square);
            squares.push(square);
            colors.push(color);
            handlers.push(handler);
            commands.push(3);
        }

        [result, pos] = canMoveLineDiagonal1(bluePosition, lastDiceNumber);
        if (result) {
            let square = GameUtils.squares[pos].object;
            let color = square.options.fill;
            let handler = GameUtils.selectSquare(square);
            squares.push(square);
            colors.push(color);
            handlers.push(handler);
            commands.push(4);
        }

        [result, pos] = canMoveLineDiagonal1(bluePosition, -lastDiceNumber);
        if (result) {
            let square = GameUtils.squares[pos].object;
            let color = square.options.fill;
            let handler = GameUtils.selectSquare(square);
            squares.push(square);
            colors.push(color);
            handlers.push(handler);
            commands.push(5);
        }

        [result, pos] = canMoveLineDiagonal2(bluePosition, lastDiceNumber);
        if (result) {
            let square = GameUtils.squares[pos].object;
            let color = square.options.fill;
            let handler = GameUtils.selectSquare(square);
            squares.push(square);
            colors.push(color);
            handlers.push(handler);
            commands.push(6);
        }

        [result, pos] = canMoveLineDiagonal2(bluePosition, -lastDiceNumber);
        if (result) {
            let square = GameUtils.squares[pos].object;
            let color = square.options.fill;
            let handler = GameUtils.selectSquare(square);
            squares.push(square);
            colors.push(color);
            handlers.push(handler);
            commands.push(7);
        }

        var command = commands[0];

        var target = await GameUtils.waitUserInput(squares);

        squares.forEach((square, index) => {
            square.options.fill = colors[index];
            GameUtils.unselectSquare(handlers[index]);
            if (square == target) command = commands[index];
        });

        

        switch (command) {
            case 0:
                bluePosition = await moveClockwise(GameUtils.blueToken, bluePosition, lastDiceNumber);
                break;
            case 1:
                bluePosition = await moveClockwise(GameUtils.blueToken, bluePosition, -lastDiceNumber);
                break;
            case 2:
                bluePosition = await moveLineHorizontal(GameUtils.blueToken, bluePosition, lastDiceNumber);
                break;
            case 3:
                bluePosition = await moveLineHorizontal(GameUtils.blueToken, bluePosition, -lastDiceNumber);
                break;
            case 4:
                bluePosition = await moveLineDiagonal1(GameUtils.blueToken, bluePosition, lastDiceNumber);
                break;
            case 5:
                bluePosition = await moveLineDiagonal1(GameUtils.blueToken, bluePosition, -lastDiceNumber);
                break;
            case 6:
                bluePosition = await moveLineDiagonal2(GameUtils.blueToken, bluePosition, lastDiceNumber);
                break;
            case 7:
                bluePosition = await moveLineDiagonal2(GameUtils.blueToken, bluePosition, -lastDiceNumber);
                break;
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

console.log(GameUtils.squares[0].nextRing);

printMsgString("Intentando conectarse a servidor...");

await sleep(1000);
GameUtils.moveToken(GameUtils.blueToken, GameUtils.squares[bluePosition].object);
await sleep(600);



function redrawBoard() {
    GameUtils.scene.stopLoop();
    GameUtils.scene.clear;

    document.getElementsByTagName("canvas").item(0).remove();

    GameUtils.drawBoard();
    GameUtils.scene.startLoop();
}

async function moveClockwise(playerToken, currentSquare, steps) {
    var pos = currentSquare;
    if (steps > 0) {
        for (var step = 1; step<=steps; step++) {
            pos = GameUtils.squares[pos].nextRing;
            
            GameUtils.moveToken(playerToken, GameUtils.squares[pos].object);
            await sleep(600);
        }
    } else if (steps < 0) {
        for (var step = -1; step>=steps; step--) {
            pos = GameUtils.squares[pos].prevRing;
            
            GameUtils.moveToken(playerToken, GameUtils.squares[pos].object);
            await sleep(600);
        }
    }
    return pos;
}

function canMoveClockwise(currentSquare, steps) {
    var res = (currentSquare >= 0 && currentSquare < 42);
    var pos1 = (currentSquare+steps)%42;
    var pos2 = (currentSquare-steps);
    if (pos2 < 0) {
        pos2 += 42;
    }
    return [res, pos1, pos2]; 
}

function canMoveLineHorizontal(currentSquare, steps) {
    var pos = currentSquare;
    var res = true;
    var step = 1;

    if (steps > 0) {
        while (res && step <= steps) {
            if (GameUtils.squares[pos].nextHor != null) {
                pos = GameUtils.squares[pos].nextHor;
                step++;
            } else {
                res = false;
            }
        }
    } else {
        steps = -steps;
        while (res && step <= steps) {
            if (GameUtils.squares[pos].prevHor != null) {
                pos = GameUtils.squares[pos].prevHor;
                step++;
            } else {
                res = false;
            }
        }
    }

    return [res, pos];
}

function canMoveLineDiagonal1(currentSquare, steps) {
    var pos = currentSquare;
    var res = true;
    var step = 1;

    if (steps > 0) {
        while (res && step <= steps) {
            if (GameUtils.squares[pos].nextDiag1 != null) {
                pos = GameUtils.squares[pos].nextDiag1;
                step++;
            } else {
                res = false;
            }
        }
    } else {
        steps = -steps;
        while (res && step <= steps) {
            if (GameUtils.squares[pos].prevDiag1 != null) {
                pos = GameUtils.squares[pos].prevDiag1;
                step++;
            } else {
                res = false;
            }
        }
    }

    return [res, pos];
}

function canMoveLineDiagonal2(currentSquare, steps) {
    var pos = currentSquare;
    var res = true;
    var step = 1;

    if (steps > 0) {
        while (res && step <= steps) {
            if (GameUtils.squares[pos].nextDiag2 != null) {
                pos = GameUtils.squares[pos].nextDiag2;
                step++;
            } else {
                res = false;
            }
        }
    } else {
        steps = -steps;
        while (res && step <= steps) {
            if (GameUtils.squares[pos].prevDiag2 != null) {
                pos = GameUtils.squares[pos].prevDiag2;
                step++;
            } else {
                res = false;
            }
        }
    }

    return [res, pos];
}

async function moveLineHorizontal(playerToken, currentSquare, steps) { 
    var pos = currentSquare;
    if (steps > 0) {
        for (var step = 1; step<=steps; step++) {
            pos = GameUtils.squares[pos].nextHor;
            
            GameUtils.moveToken(playerToken, GameUtils.squares[pos].object);
            await sleep(600);
        }
    } else if (steps < 0) {
        for (var step = -1; step>=steps; step--) {
            pos = GameUtils.squares[pos].prevHor;
            
            GameUtils.moveToken(playerToken, GameUtils.squares[pos].object);
            await sleep(600);
        }
    }
    return pos;
}

async function moveLineDiagonal1(playerToken, currentSquare, steps) {
    var pos = currentSquare;
    if (steps > 0) {
        for (var step = 1; step<=steps; step++) {
            pos = GameUtils.squares[pos].nextDiag1;
            
            GameUtils.moveToken(playerToken, GameUtils.squares[pos].object);
            await sleep(600);
        }
    } else if (steps < 0) {
        for (var step = -1; step>=steps; step--) {
            pos = GameUtils.squares[pos].prevDiag1;
            
            GameUtils.moveToken(playerToken, GameUtils.squares[pos].object);
            await sleep(600);
        }
    }
    return pos;
}

async function moveLineDiagonal2(playerToken, currentSquare, steps) {
    var pos = currentSquare;
    if (steps > 0) {
        for (var step = 1; step<=steps; step++) {
            pos = GameUtils.squares[pos].nextDiag2;
            
            GameUtils.moveToken(playerToken, GameUtils.squares[pos].object);
            await sleep(600);
        }
    } else if (steps < 0) {
        for (var step = -1; step>=steps; step--) {
            pos = GameUtils.squares[pos].prevDiag2;
            
            GameUtils.moveToken(playerToken, GameUtils.squares[pos].object);
            await sleep(600);
        }
    }
    return pos;
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
