import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import * as GameUtils from './game-utils.js';

// Game variables
var logs = document.getElementById('logs');
var cube = document.getElementById('cube');
var lastDiceNumber = null;
var bluePosition = 100;
var players = {};

// Socket connection
var joinServerParameters = {token: token};
const socket = io("wss://trivial-server-game.herokuapp.com", {transports : ['websocket']}, {query: 'joinServerParameters=' + JSON.stringify(joinServerParameters)});

socket.on("connected", printInConsole);
socket.on("newGameCreated", lobby);
socket.on("roomFound", joinRoom);
socket.on("error", printInConsole);
socket.on("cancelSession", cancelSession);
socket.on("updateRoomPlayers", updateRoomPlayers);

// Start Room
startRoom();

function startRoom() {
    var divStartRoom = document.getElementById('divStartRoom');
    var divLobby = document.getElementById('divLobby');
    var createRoomButton = document.getElementById('createRoomButton');
    var joinRoomButton = document.getElementById('joinRoomButton');

    joinRoomButton.onclick = function() {
        var code = document.getElementById('code').value;
        var data = {
            playerName: "Usuario " + Math.floor(Math.random() * 1000),
            gameId: code
        }
        socket.emit("playerJoinGame", data);
    }

    createRoomButton.onclick = function() {
        socket.emit("hostCreateNewGame", "Usuario " + Math.floor(Math.random() * 1000));

        hideDiv(divStartRoom);
        showDiv(divLobby);
    }
}

function joinRoom(data) {
    var divStartRoom = document.getElementById('divStartRoom');
    var divLobby = document.getElementById('divLobby');
    var startSessionButton = document.getElementById('startSessionButton');

    hideDiv(divStartRoom);
    hideDiv(startSessionButton);
    showDiv(divLobby);
    lobby(data);
}

function updateRoomPlayers(players) {
    if (players != undefined) {
        var playersJoined = document.getElementById('playersJoined');
        var string = "";
        console.log(players);
        for (const [key, value] of Object.entries(players)) {
            string += value.name + '<br>';
        };
        playersJoined.innerHTML = string;
    }
}

// Lobby
function lobby(data) {
    var gameIdText = document.getElementById('gameId');
    gameIdText.innerHTML = data.gameId;
    var divLobby = document.getElementById('divLobby');
    var divBoard = document.getElementById('divBoard');

    var startSessionButton = document.getElementById('startSessionButton');

    startSessionButton.onclick = function() {
        hideDiv(divLobby);
        showDiv(divBoard);
        startSession();
    }
}

// Start Game Session
async function startSession() {
    GameUtils.drawBoard();
    window.addEventListener('resize', redrawBoard);
    cube.addEventListener("click", clickDice);

    GameUtils.startGame();
    GameUtils.activateDice();

    printLogString("El juego ha comenzado.");

    await sleep(1000);
    GameUtils.moveToken(GameUtils.blueToken, GameUtils.squares[bluePosition].object);
    await sleep(600);
}

function cancelSession() {
    window.location.reload();
}

function hideDiv(div) {
    div.style.display = "none";
}

function showDiv(div) {
    div.style.display = "block";
}

function redrawBoard() {
    GameUtils.scene.stopLoop();
    GameUtils.scene.clear;

    document.getElementsByTagName("canvas").item(0).remove();

    GameUtils.drawBoard();
    GameUtils.scene.startLoop();
}

async function clickDice() {
    if (GameUtils.diceAvailable) {
        await sleep(10);
        GameUtils.disableDice();
        await sleep(5000);
        lastDiceNumber = GameUtils.getDiceNumber();

        var squares = [];
        var colors = [];
        var handlers = [];
        var commands = [];

        var [result, pos1, pos2] = GameUtils.canMoveClockwise(bluePosition, lastDiceNumber);
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


        var [result, pos] = GameUtils.canMoveLineHorizontal(bluePosition, lastDiceNumber);
        if (result) {
            let square = GameUtils.squares[pos].object;
            let color = square.options.fill;
            let handler = GameUtils.selectSquare(square);
            squares.push(square);
            colors.push(color);
            handlers.push(handler);
            commands.push(2);
        }

        [result, pos] = GameUtils.canMoveLineHorizontal(bluePosition, -lastDiceNumber);
        if (result) {
            let square = GameUtils.squares[pos].object;
            let color = square.options.fill;
            let handler = GameUtils.selectSquare(square);
            squares.push(square);
            colors.push(color);
            handlers.push(handler);
            commands.push(3);
        }

        [result, pos] = GameUtils.canMoveLineDiagonal1(bluePosition, lastDiceNumber);
        if (result) {
            let square = GameUtils.squares[pos].object;
            let color = square.options.fill;
            let handler = GameUtils.selectSquare(square);
            squares.push(square);
            colors.push(color);
            handlers.push(handler);
            commands.push(4);
        }

        [result, pos] = GameUtils.canMoveLineDiagonal1(bluePosition, -lastDiceNumber);
        if (result) {
            let square = GameUtils.squares[pos].object;
            let color = square.options.fill;
            let handler = GameUtils.selectSquare(square);
            squares.push(square);
            colors.push(color);
            handlers.push(handler);
            commands.push(5);
        }

        [result, pos] = GameUtils.canMoveLineDiagonal2(bluePosition, lastDiceNumber);
        if (result) {
            let square = GameUtils.squares[pos].object;
            let color = square.options.fill;
            let handler = GameUtils.selectSquare(square);
            squares.push(square);
            colors.push(color);
            handlers.push(handler);
            commands.push(6);
        }

        [result, pos] = GameUtils.canMoveLineDiagonal2(bluePosition, -lastDiceNumber);
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
                bluePosition = await GameUtils.moveClockwise(GameUtils.blueToken, bluePosition, lastDiceNumber);
                break;
            case 1:
                bluePosition = await GameUtils.moveClockwise(GameUtils.blueToken, bluePosition, -lastDiceNumber);
                break;
            case 2:
                bluePosition = await GameUtils.moveLineHorizontal(GameUtils.blueToken, bluePosition, lastDiceNumber);
                break;
            case 3:
                bluePosition = await GameUtils.moveLineHorizontal(GameUtils.blueToken, bluePosition, -lastDiceNumber);
                break;
            case 4:
                bluePosition = await GameUtils.moveLineDiagonal1(GameUtils.blueToken, bluePosition, lastDiceNumber);
                break;
            case 5:
                bluePosition = await GameUtils.moveLineDiagonal1(GameUtils.blueToken, bluePosition, -lastDiceNumber);
                break;
            case 6:
                bluePosition = await GameUtils.moveLineDiagonal2(GameUtils.blueToken, bluePosition, lastDiceNumber);
                break;
            case 7:
                bluePosition = await GameUtils.moveLineDiagonal2(GameUtils.blueToken, bluePosition, -lastDiceNumber);
                break;
    }

        GameUtils.activateDice();
    }
}

function printLogString(string) {
    logs.value += '\r\n' + "Cliente: " + string;
}

function printInConsole(data) {
    console.log(data);
}

function printLog(data) {
    logs.value += '\r\n' + "Server: " + data.message;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
