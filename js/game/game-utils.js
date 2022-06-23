import Pencil from "https://unpkg.com/pencil.js/dist/pencil.esm.js";


// Sounds
var tokenHit = new Howl({
    src: ['./sounds/hitToken.mp3'],
    volume: 0.1
});

// Turn
const timeout = async ms => new Promise(res => setTimeout(res, ms));
var numberOfTimeouts = 0;
export var waitingUserInput = false;
export var diceAvailable = false;
export var moving = false;

// Rendered objects
export var scene;
export var unit;
export var squares = {

    // Ring squares
    0: {object: null, isCheese: true, nextRing: 1, prevRing: 41, nextHor: 42}, // brownCheeseRectangle
    1: {object: null, nextRing: 2, prevRing: 0}, // yellowRectangle6
    2: {object: null, nextRing: 3, prevRing: 1}, // grayRectangle
    3: {object: null, nextRing: 4, prevRing: 2}, // orangeRectangle6
    4: {object: null, nextRing: 5, prevRing: 3}, // greenRectangle6
    5: {object: null, nextRing: 6, prevRing: 4}, // grayRectangle2
    6: {object: null, nextRing: 7, prevRing: 5}, // pinkRectangle6
    7: {object: null, isCheese: true, nextRing: 8, prevRing: 6}, // blueCheeseRectangle
    8: {object: null, nextRing: 9, prevRing: 7}, // pinkRectangle7
    9: {object: null, nextRing: 10, prevRing: 8}, // grayRectangle3
    10: {object: null, nextRing: 11, prevRing: 9}, // yellowRectangle7
    11: {object: null, nextRing: 12, prevRing: 10}, // brownRectangle7
    12: {object: null, nextRing: 13, prevRing: 11}, // grayRectangle4
    13: {object: null, nextRing: 14, prevRing: 12}, // greenRectangle7
    14: {object: null, isCheese: true, nextRing: 15, prevRing: 13}, // orangeCheeseRectangle
    15: {object: null, nextRing: 16, prevRing: 14}, // greenRectangle8
    16: {object: null, nextRing: 17, prevRing: 15}, // grayRectangle5
    17: {object: null, nextRing: 18, prevRing: 16}, // pinkRectangle8
    18: {object: null, nextRing: 19, prevRing: 17}, // blueRectangle8
    19: {object: null, nextRing: 20, prevRing: 18}, // grayRectangle6
    20: {object: null, nextRing: 21, prevRing: 19}, // brownRectangle8
    21: {object: null, isCheese: true, nextRing: 22, prevRing: 20, prevHor: 51}, // yellowCheeseRectangle
    22: {object: null, nextRing: 23, prevRing: 21}, // brownRectangle9
    23: {object: null, nextRing: 24, prevRing: 22}, // grayRectangle7
    24: {object: null, nextRing: 25, prevRing: 23}, // greenRectangle9
    25: {object: null, nextRing: 26, prevRing: 24}, // orangeRectangle7
    26: {object: null, nextRing: 27, prevRing: 25}, // grayRectangle8
    27: {object: null, nextRing: 28, prevRing: 26}, // blueRectangle9
    28: {object: null, isCheese: true, nextRing: 29, prevRing: 27}, // pinkCheeseRectangle
    29: {object: null, nextRing: 30, prevRing: 28}, // blueRectangle10
    30: {object: null, nextRing: 31, prevRing: 29}, // grayRectangle9
    31: {object: null, nextRing: 32, prevRing: 30}, // brownRectangle10
    32: {object: null, nextRing: 33, prevRing: 31}, // yellowRectangle8
    33: {object: null, nextRing: 34, prevRing: 32}, // grayRectangle10
    34: {object: null, nextRing: 35, prevRing: 33}, // orangeRectangle8
    35: {object: null, isCheese: true, nextRing: 36, prevRing: 34}, // greenCheeseRectangle
    36: {object: null, nextRing: 37, prevRing: 35}, // orangeRectangle9
    37: {object: null, nextRing: 38, prevRing: 36}, // grayRectangle11
    38: {object: null, nextRing: 39, prevRing: 37}, // blueRectangle11
    39: {object: null, nextRing: 40, prevRing: 38}, // pinkRectangle9
    40: {object: null, nextRing: 41, prevRing: 39}, // grayRectangle12
    41: {object: null, nextRing: 0, prevRing: 40}, // yellowRectangle9

    // Hub
    100: {object: null, nextHor: 47, prevHor: 46, nextDiag1: 57, prevDiag1: 56, nextDiag2: 67, prevDiag2: 66},

    // Horizontal
    42: {object: null, nextHor: 43, prevHor: 0}, // yellowRectangle
    43: {object: null, nextHor: 44, prevHor: 42}, // pinkRectangle
    44: {object: null, nextHor: 45, prevHor: 43}, // orangeRectangle
    45: {object: null, nextHor: 46, prevHor: 44}, // blueRectangle
    46: {object: null, nextHor: 100, prevHor: 45}, // greenRectangle

    47: {object: null, nextHor: 48, prevHor: 100}, // orangeRectangle2
    48: {object: null, nextHor: 49, prevHor: 47}, // pinkRectangle2
    49: {object: null, nextHor: 50, prevHor: 48}, // greenRectangle2
    50: {object: null, nextHor: 51, prevHor: 49}, // blueRectangle2
    51: {object: null, nextHor: 21, prevHor: 50}, // brownRectangle

    // Diagonal 1
    52: {object: null, nextDiag1: 53, prevDiag1: 7}, // pinkRectangle3
    53: {object: null, nextDiag1: 54, prevDiag1: 52}, // greenRectangle3
    54: {object: null, nextDiag1: 55, prevDiag1: 53}, // yellowRectangle2
    55: {object: null, nextDiag1: 56, prevDiag1: 54}, // orangeRectangle3
    56: {object: null, nextDiag1: 100, prevDiag1: 55}, // brownRectangle2

    57: {object: null, nextDiag1: 58, prevDiag1: 100}, // yellowRectangle3
    58: {object: null, nextDiag1: 59, prevDiag1: 57}, // greenRectangle4
    59: {object: null, nextDiag1: 60, prevDiag1: 58}, // brownRectangle3
    60: {object: null, nextDiag1: 61, prevDiag1: 59}, // orangeRectangle4
    61: {object: null, nextDiag1: 28, prevDiag1: 60}, // blueRectangle3

    // Diagonal 2
    62: {object: null, nextDiag2: 63, prevDiag2: 14}, // greenRectangle5
    63: {object: null, nextDiag2: 64, prevDiag2: 62}, // brownRectangle5
    64: {object: null, nextDiag2: 65, prevDiag2: 63}, // pinkRectangle5
    65: {object: null, nextDiag2: 66, prevDiag2: 64}, // yellowRectangle5
    66: {object: null, nextDiag2: 100, prevDiag2: 65}, // blueRectangle5

    67: {object: null, nextDiag2: 68, prevDiag2: 100}, // pinkRectangle4
    68: {object: null, nextDiag2: 69, prevDiag2: 67}, // brownRectangle4
    69: {object: null, nextDiag2: 70, prevDiag2: 68}, // blueRectangle4
    70: {object: null, nextDiag2: 71, prevDiag2: 69}, // yellowRectangle4
    71: {object: null, nextDiag2: 35, prevDiag2: 70}, // orangeRectangle5

}

export var outerCircle, innerCircle, horizontalRectangle, diagonalRectangle, diagonalRectangle2, blueToken;

export function centerOfSquare(square) {
    var center = square.position.clone().add(29*unit,20*unit);
    center.rotate(square.options.rotation, square.position);

    return center;
}

export async function waitUserInput(squares) {
    var target = squares[0];

    squares.forEach((square) => {
        square.on("click", function moveTo() {
            target = square;
            waitingUserInput = false;
            square.removeListener("click", moveTo);
        })
    });

    waitingUserInput = true;
    numberOfTimeouts = 0;
    while (waitingUserInput) {
        numberOfTimeouts++;
        await timeout(50);
        if (numberOfTimeouts > 250) {
            waitingUserInput = false;
        }
    }
    return target;
} 

export function moveToken(token, square) {
    if (square != null && token != null) {
        var finalPos = centerOfSquare(square);
        var initialPos = token.position.clone();
        var elapsedTime = 0;
        var lerpDuration = 600;
        moving = true;

        scene.on("draw", function moveAnimation() {
            var deltaTime = (1/scene.fps) * 1000;

            token.position.x = lerp(initialPos.x, finalPos.x, elapsedTime / lerpDuration);
            token.position.y = lerp(initialPos.y, finalPos.y, elapsedTime / lerpDuration);

            elapsedTime += deltaTime;
            
            
            if (elapsedTime >= lerpDuration) {
                tokenHit.play();
                moving = false;
                scene.removeListener("draw", moveAnimation);
            }
        }, true);
    }
}

export function startGame() {
    scene.startLoop();
    setupDice();
}

export function setupDice() {
    var cube = document.getElementById('cube');
    cube.style.visibility = "visible";
    cube.addEventListener("click", moveDice);
}

export function activateDice() {
    diceAvailable = true;
}

export function disableDice() {
    diceAvailable = false;
}

function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

export function moveDice() {
    if (diceAvailable) {
        var min = 1;
        var max = 24;
        var xRand = getRandom(max, min);
        var yRand = getRandom(max, min);
    
        //cube.style.webkitTransform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
        cube.style.transform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
    }
}

export function selectSquare(square) {
    var color = square.options.fill;
    var min = -8, max = 15, i = 0;
    var brighter = true;
    var blinkSquare = function () {
        if (brighter) {
            i += 0.3 / scene.fps;
            square.options.fill = shadeColor(color, i);
            if (i >= max) {
                brighter = false;
            }
        } else {
            i -= 0.3 / scene.fps;
            square.options.fill = shadeColor(color, i);
            if (i <= min) {
                brighter = true;
            }
        }
    }
    scene.on("draw", blinkSquare);

    return blinkSquare;
}

export function unselectSquare(blinkSquare) {
    scene.removeListener("draw", blinkSquare);
}


export function getDiceNumber() {
    var number = 1;

    var frontFace = document.getElementById('frontFace');
    var bottomFace = document.getElementById('bottomFace');
    var backFace = document.getElementById('backFace');
    var topFace = document.getElementById('topFace');
    var leftFace = document.getElementById('leftFace');
    var rightFace = document.getElementById('rightFace');

    var ffS = frontFace.getBoundingClientRect();
    var bfS = bottomFace.getBoundingClientRect();
    var bafS = backFace.getBoundingClientRect();
    var tfS = topFace.getBoundingClientRect();
    var lfS = leftFace.getBoundingClientRect();
    var rfS = rightFace.getBoundingClientRect();

    var sizeTop = tfS.width * tfS.height;
    var sizeBack = bafS.width * bafS.height;
    var sizeRight = rfS.width * rfS.height;
    var sizeLeft = lfS.width * lfS.height;
    var sizeBot = bfS.width * bfS.height;
    var sizeFront = ffS.width * ffS.height;

    var max = Math.max(sizeTop, sizeBack, sizeRight, sizeLeft, sizeBot, sizeFront);
    
    number = (max == sizeBack)? 2 : number;
    number = (max == sizeRight)? 3 : number;
    number = (max == sizeLeft)? 4 : number;
    number = (max == sizeTop)? 5 : number;
    number = (max == sizeBot)? 6 : number;

    console.log(number);
    return number;

}

export function drawBoard() {
    var divTrivia = document.getElementById("trivia");

    scene = new Pencil.Scene(divTrivia, {
        fill: "#28262c"
    });
    // White background
    const center = [scene.width / 2, scene.height / 2]

    const relation = 30 / 160;
    const relation2 = 32 / 160;

    var scale = scene.width;

    if (scene.width > scene.height) {
        scale = scene.height;
    }

    const outerRadius = scale * 0.48;
    const innerRadius = outerRadius - outerRadius*relation;

    outerCircle = new Pencil.Circle(center, outerRadius, {
        fill: "#FFFFFF",
    });

    innerCircle = new Pencil.Circle(center, innerRadius, {
        fill: "#28262c",
    });
    const hexagoneRadius = outerRadius*relation2;

    squares[100].object = new Pencil.RegularPolygon(center, 6, hexagoneRadius*0.9, {
        fill: "#e5e5e5",
    });
    const rectangleWidth = innerRadius*2.2;
    const rectangleHeight = hexagoneRadius;
    const centerHorizontalRectangle = [center[0] - rectangleWidth/2, center[1] - rectangleHeight/2];

    horizontalRectangle = new Pencil.Rectangle(centerHorizontalRectangle, rectangleWidth, rectangleHeight, {
        fill: "#FFFFFF",
    });

    const centerDiagonalRectangle = rotate(center[0],center[1],centerHorizontalRectangle[0],centerHorizontalRectangle[1], 300);
    diagonalRectangle = new Pencil.Rectangle(centerDiagonalRectangle, rectangleWidth, rectangleHeight, {
        fill: "#FFFFFF",
        rotation: 0.166666,
    });
    const centerDiagonalRectangle2 = rotate(center[0],center[1],centerHorizontalRectangle[0],centerHorizontalRectangle[1], 60);
    diagonalRectangle2 = new Pencil.Rectangle(centerDiagonalRectangle2, rectangleWidth, rectangleHeight, {
        fill: "#FFFFFF",
        rotation: 0.833333,
    });

    // Color squares
    // Green #4DAB54
    // Blue #61C0C4
    // Orange #F17B33
    // Pink #F985B9
    // Yellow #EFDB3B
    // Brown #B06932
    const squareHeight = hexagoneRadius*0.9;
    const squareWidth = squareHeight * 22/33;
    unit = outerRadius/360;

    // Left horizontal
    const centerGreenRectangle = [center[0] - unit*103, center[1] - unit*32];

    squares[46].object = new Pencil.Rectangle(centerGreenRectangle, squareWidth, squareHeight, {
        fill: "#4DAB54",
    });

    const centerBlueRectangle = [center[0] - unit*150, center[1] - unit*32];
    squares[45].object = new Pencil.Rectangle(centerBlueRectangle, squareWidth, squareHeight, {
        fill: "#61C0C4",
    });

    const centerOrangeRectangle = [center[0] - unit*197, center[1] - unit*32];
    squares[44].object = new Pencil.Rectangle(centerOrangeRectangle, squareWidth, squareHeight, {
        fill: "#F17B33",
    });

    const centerPinkRectangle = [center[0] - unit*244, center[1] - unit*32];
    squares[43].object = new Pencil.Rectangle(centerPinkRectangle, squareWidth, squareHeight, {
        fill: "#F985B9",
    });

    const centerYellowRectangle = [center[0] - unit*291, center[1] - unit*32];
    squares[42].object = new Pencil.Rectangle(centerYellowRectangle, squareWidth, squareHeight, {
        fill: "#EFDB3B",
    });


    // Right horizontal
    const centerOrangeRectangle2 = [center[0] + unit*60, center[1] - unit*32];
    squares[47].object = new Pencil.Rectangle(centerOrangeRectangle2, squareWidth, squareHeight, {
        fill: "#F17B33",
    });

    const centerPinkRectangle2 = [center[0] + unit*107, center[1] - unit*32];
    squares[48].object = new Pencil.Rectangle(centerPinkRectangle2, squareWidth, squareHeight, {
        fill: "#F985B9",
    });

    const centerGreenRectangle2 = [center[0] + unit*154, center[1] - unit*32];
    squares[49].object = new Pencil.Rectangle(centerGreenRectangle2, squareWidth, squareHeight, {
        fill: "#4DAB54",
    });

    const centerBlueRectangle2 = [center[0] + unit*201, center[1] - unit*32];
    squares[50].object = new Pencil.Rectangle(centerBlueRectangle2, squareWidth, squareHeight, {
        fill: "#61C0C4",
    });

    const centerBrownRectangle = [center[0] + unit*248, center[1] - unit*32];
    squares[51].object = new Pencil.Rectangle(centerBrownRectangle, squareWidth, squareHeight, {
        fill: "#B06932",
    });

    // Upper diagonal1
    var centerBrownRectangle2 = [center[0] - unit*103, center[1] - unit*32];
    centerBrownRectangle2 = rotate(center[0],center[1],centerBrownRectangle2[0],centerBrownRectangle2[1], 300);

    squares[56].object = new Pencil.Rectangle(centerBrownRectangle2, squareWidth, squareHeight, {
        fill: "#B06932",
        rotation: 0.166666,
    });

    var centerOrangeRectangle3 = [center[0] - unit*150, center[1] - unit*32];
    centerOrangeRectangle3 = rotate(center[0],center[1],centerOrangeRectangle3[0],centerOrangeRectangle3[1], 300);
    squares[55].object = new Pencil.Rectangle(centerOrangeRectangle3, squareWidth, squareHeight, {
        fill: "#F17B33",
        rotation: 0.166666,
    });

    var centerYellowRectangle2 = [center[0] - unit*197, center[1] - unit*32];
    centerYellowRectangle2 = rotate(center[0],center[1],centerYellowRectangle2[0],centerYellowRectangle2[1], 300);
    squares[54].object = new Pencil.Rectangle(centerYellowRectangle2, squareWidth, squareHeight, {
        fill: "#EFDB3B",
        rotation: 0.166666,
    });

    var centerGreenRectangle3 = [center[0] - unit*244, center[1] - unit*32];
    centerGreenRectangle3 = rotate(center[0],center[1],centerGreenRectangle3[0],centerGreenRectangle3[1], 300);
    squares[53].object = new Pencil.Rectangle(centerGreenRectangle3, squareWidth, squareHeight, {
        fill: "#4DAB54",
        rotation: 0.166666,
    });

    var centerPinkRectangle3 = [center[0] - unit*291, center[1] - unit*32];
    centerPinkRectangle3 = rotate(center[0],center[1],centerPinkRectangle3[0],centerPinkRectangle3[1], 300);
    squares[52].object = new Pencil.Rectangle(centerPinkRectangle3, squareWidth, squareHeight, {
        fill: "#F985B9",
        rotation: 0.166666,
    });

    // Bottom diagonal1
    var centerYellowRectangle3 = [center[0] + unit*60, center[1] - unit*32];
    centerYellowRectangle3 = rotate(center[0],center[1],centerYellowRectangle3[0],centerYellowRectangle3[1], 300);
    squares[57].object = new Pencil.Rectangle(centerYellowRectangle3, squareWidth, squareHeight, {
        fill: "#EFDB3B",
        rotation: 0.166666,
    });

    var centerGreenRectangle4 = [center[0] + unit*107, center[1] - unit*32];
    centerGreenRectangle4 = rotate(center[0],center[1],centerGreenRectangle4[0],centerGreenRectangle4[1], 300);
    squares[58].object = new Pencil.Rectangle(centerGreenRectangle4, squareWidth, squareHeight, {
        fill: "#4DAB54",
        rotation: 0.166666,
    });

    var centerBrownRectangle3 = [center[0] + unit*154, center[1] - unit*32];
    centerBrownRectangle3 = rotate(center[0],center[1],centerBrownRectangle3[0],centerBrownRectangle3[1], 300);
    squares[59].object = new Pencil.Rectangle(centerBrownRectangle3, squareWidth, squareHeight, {
        fill: "#B06932",
        rotation: 0.166666,
    });

    var centerOrangeRectangle4 = [center[0] + unit*201, center[1] - unit*32];
    centerOrangeRectangle4 = rotate(center[0],center[1],centerOrangeRectangle4[0],centerOrangeRectangle4[1], 300);
    squares[60].object = new Pencil.Rectangle(centerOrangeRectangle4, squareWidth, squareHeight, {
        fill: "#F17B33",
        rotation: 0.166666,
    });

    var centerBlueRectangle3 = [center[0] + unit*248, center[1] - unit*32];
    centerBlueRectangle3 = rotate(center[0],center[1],centerBlueRectangle3[0],centerBlueRectangle3[1], 300);
    squares[61].object = new Pencil.Rectangle(centerBlueRectangle3, squareWidth, squareHeight, {
        fill: "#61C0C4",
        rotation: 0.166666,
    });

    // Bottom diagonal2
    var centerPinkRectangle4 = [center[0] - unit*103, center[1] - unit*32];
    centerPinkRectangle4 = rotate(center[0],center[1],centerPinkRectangle4[0],centerPinkRectangle4[1], 60);
    squares[67].object = new Pencil.Rectangle(centerPinkRectangle4, squareWidth, squareHeight, {
        fill: "#F985B9",
        rotation: 0.833333,
    });

    var centerBrownRectangle4 = [center[0] - unit*150, center[1] - unit*32];
    centerBrownRectangle4 = rotate(center[0],center[1],centerBrownRectangle4[0],centerBrownRectangle4[1], 60);
    squares[68].object = new Pencil.Rectangle(centerBrownRectangle4, squareWidth, squareHeight, {
        fill: "#B06932",
        rotation: 0.833333,
    });

    var centerBlueRectangle4 = [center[0] - unit*197, center[1] - unit*32];
    centerBlueRectangle4 = rotate(center[0],center[1],centerBlueRectangle4[0],centerBlueRectangle4[1], 60);
    squares[69].object = new Pencil.Rectangle(centerBlueRectangle4, squareWidth, squareHeight, {
        fill: "#61C0C4",
        rotation: 0.833333,
    });

    var centerYellowRectangle4 = [center[0] - unit*244, center[1] - unit*32];
    centerYellowRectangle4 = rotate(center[0],center[1],centerYellowRectangle4[0],centerYellowRectangle4[1], 60);
    squares[70].object = new Pencil.Rectangle(centerYellowRectangle4, squareWidth, squareHeight, {
        fill: "#EFDB3B",
        rotation: 0.833333,
    });

    var centerOrangeRectangle5 = [center[0] - unit*291, center[1] - unit*32];
    centerOrangeRectangle5 = rotate(center[0],center[1],centerOrangeRectangle5[0],centerOrangeRectangle5[1], 60);
    squares[71].object = new Pencil.Rectangle(centerOrangeRectangle5, squareWidth, squareHeight, {
        fill: "#F17B33",
        rotation: 0.833333,
    });

    // Upper diagonal2
    var centerBlueRectangle5 = [center[0] + unit*60, center[1] - unit*32];
    centerBlueRectangle5 = rotate(center[0],center[1],centerBlueRectangle5[0],centerBlueRectangle5[1], 60);
    squares[66].object = new Pencil.Rectangle(centerBlueRectangle5, squareWidth, squareHeight, {
        fill: "#61C0C4",
        rotation: 0.833333,
    });

    var centerYellowRectangle5 = [center[0] + unit*107, center[1] - unit*32];
    centerYellowRectangle5 = rotate(center[0],center[1],centerYellowRectangle5[0],centerYellowRectangle5[1], 60);
    squares[65].object = new Pencil.Rectangle(centerYellowRectangle5, squareWidth, squareHeight, {
        fill: "#EFDB3B",
        rotation: 0.833333,
    });

    var centerPinkRectangle5 = [center[0] + unit*154, center[1] - unit*32];
    centerPinkRectangle5 = rotate(center[0],center[1],centerPinkRectangle5[0],centerPinkRectangle5[1], 60);
    squares[64].object = new Pencil.Rectangle(centerPinkRectangle5, squareWidth, squareHeight, {
        fill: "#F985B9",
        rotation: 0.833333,
    });

    var centerBrownRectangle5 = [center[0] + unit*201, center[1] - unit*32];
    centerBrownRectangle5 = rotate(center[0],center[1],centerBrownRectangle5[0],centerBrownRectangle5[1], 60);
    squares[63].object = new Pencil.Rectangle(centerBrownRectangle5, squareWidth, squareHeight, {
        fill: "#B06932",
        rotation: 0.833333,
    });

    var centerGreenRectangle5 = [center[0] + unit*248, center[1] - unit*32];
    centerGreenRectangle5 = rotate(center[0],center[1],centerGreenRectangle5[0],centerGreenRectangle5[1], 60);
    squares[62].object = new Pencil.Rectangle(centerGreenRectangle5, squareWidth, squareHeight, {
        fill: "#4DAB54",
        rotation: 0.833333,
    });

    // Cheeses
    const centerBrownCheeseRectangle = [center[0] - unit*355, center[1] - unit*32];
    squares[0].object = new Pencil.Rectangle(centerBrownCheeseRectangle, squareWidth + 17*unit, squareHeight, {
        fill: "#B06932",
    });

    const centerYellowCheeseRectangle = [center[0] + unit*295, center[1] - unit*32];
    squares[21].object = new Pencil.Rectangle(centerYellowCheeseRectangle, squareWidth + 17*unit, squareHeight, {
        fill: "#EFDB3B",
    });

    var centerPinkCheeseRectangle = [center[0] + unit*295, center[1] - unit*32];
    centerPinkCheeseRectangle = rotate(center[0],center[1],centerPinkCheeseRectangle[0],centerPinkCheeseRectangle[1], 300);
    squares[28].object = new Pencil.Rectangle(centerPinkCheeseRectangle, squareWidth + 17*unit, squareHeight, {
        fill: "#F985B9",
        rotation: 0.166666,
    });

    var centerBlueCheeseRectangle = [center[0] - unit*355, center[1] - unit*32];
    centerBlueCheeseRectangle = rotate(center[0],center[1],centerBlueCheeseRectangle[0],centerBlueCheeseRectangle[1], 300);
    squares[7].object = new Pencil.Rectangle(centerBlueCheeseRectangle, squareWidth + 17*unit, squareHeight, {
        fill: "#61C0C4",
        rotation: 0.166666,
    });

    var centerGreenCheeseRectangle = [center[0] - unit*355, center[1] - unit*32];
    centerGreenCheeseRectangle = rotate(center[0],center[1],centerGreenCheeseRectangle[0],centerGreenCheeseRectangle[1], 60);
    squares[35].object = new Pencil.Rectangle(centerGreenCheeseRectangle, squareWidth + 17*unit, squareHeight, {
        fill: "#4DAB54",
        rotation: 0.833333,
    });

    var centerOrangeCheeseRectangle = [center[0] + unit*295, center[1] - unit*32];
    centerOrangeCheeseRectangle = rotate(center[0],center[1],centerOrangeCheeseRectangle[0],centerOrangeCheeseRectangle[1], 60);
    squares[14].object = new Pencil.Rectangle(centerOrangeCheeseRectangle, squareWidth + 17*unit, squareHeight, {
        fill: "#F17B33",
        rotation: 0.833333,
    });

    // Ring
    var centerYellowRectangle6 = [center[0] - unit*355, center[1] - unit*32];
    centerYellowRectangle6 = rotate(center[0],center[1],centerYellowRectangle6[0],centerYellowRectangle6[1], 360 - 60/7);
    squares[1].object = new Pencil.Rectangle(centerYellowRectangle6, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#EFDB3B",
        rotation: 0.166666/7,

    });

    var centerGrayRectangle = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle = rotate(center[0],center[1],centerGrayRectangle[0],centerGrayRectangle[1], 360 - 2*60/7);
    squares[2].object = new Pencil.Rectangle(centerGrayRectangle, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 2 * 0.166666/7,

    });

    var centerOrangeRectangle6 = [center[0] - unit*355, center[1] - unit*32];
    centerOrangeRectangle6 = rotate(center[0],center[1],centerOrangeRectangle6[0],centerOrangeRectangle6[1], 360 - 3*60/7);
    squares[3].object = new Pencil.Rectangle(centerOrangeRectangle6, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#F17B33",
        rotation: 3 * 0.166666/7,

    });

    var centerGreenRectangle6 = [center[0] - unit*355, center[1] - unit*32];
    centerGreenRectangle6 = rotate(center[0],center[1],centerGreenRectangle6[0],centerGreenRectangle6[1], 360 - 4*60/7);
    squares[4].object = new Pencil.Rectangle(centerGreenRectangle6, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#4DAB54",
        rotation: 4 * 0.166666/7,

    });

    var centerGrayRectangle2 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle2 = rotate(center[0],center[1],centerGrayRectangle2[0],centerGrayRectangle2[1], 360 - 5*60/7);
    squares[5].object = new Pencil.Rectangle(centerGrayRectangle2, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 5 * 0.166666/7,

    });

    var centerPinkRectangle6 = [center[0] - unit*355, center[1] - unit*32];
    centerPinkRectangle6 = rotate(center[0],center[1],centerPinkRectangle6[0],centerPinkRectangle6[1], 360 - 6*60/7);
    squares[6].object = new Pencil.Rectangle(centerPinkRectangle6, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#F985B9",
        rotation: 6 * 0.166666/7,

    });

    var centerPinkRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerPinkRectangle7 = rotate(center[0],center[1],centerPinkRectangle7[0],centerPinkRectangle7[1], 360 - 8*60/7);
    squares[8].object = new Pencil.Rectangle(centerPinkRectangle7, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#F985B9",
        rotation: 8 * 0.166666/7,

    });

    var centerGrayRectangle3 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle3 = rotate(center[0],center[1],centerGrayRectangle3[0],centerGrayRectangle3[1], 360 - 9*60/7);
    squares[9].object = new Pencil.Rectangle(centerGrayRectangle3, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 9 * 0.166666/7,

    });

    var centerYellowRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerYellowRectangle7 = rotate(center[0],center[1],centerYellowRectangle7[0],centerYellowRectangle7[1], 360 - 10*60/7);
    squares[10].object = new Pencil.Rectangle(centerYellowRectangle7, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#EFDB3B",
        rotation: 10 * 0.166666/7,

    });
    var centerBrownRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerBrownRectangle7 = rotate(center[0],center[1],centerBrownRectangle7[0],centerBrownRectangle7[1], 360 - 11*60/7);
    squares[11].object = new Pencil.Rectangle(centerBrownRectangle7, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#B06932",
        rotation: 11 * 0.166666/7,

    });
    var centerGrayRectangle4 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle4 = rotate(center[0],center[1],centerGrayRectangle4[0],centerGrayRectangle4[1], 360 - 12*60/7);
    squares[12].object = new Pencil.Rectangle(centerGrayRectangle4, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 12 * 0.166666/7,

    });

    var centerGreenRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerGreenRectangle7 = rotate(center[0],center[1],centerGreenRectangle7[0],centerGreenRectangle7[1], 360 - 13*60/7);
    squares[13].object = new Pencil.Rectangle(centerGreenRectangle7, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#4DAB54",
        rotation: 13 * 0.166666/7,

    });

    var centerGreenRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerGreenRectangle8 = rotate(center[0],center[1],centerGreenRectangle8[0],centerGreenRectangle8[1], 360 - 15*60/7);
    squares[15].object = new Pencil.Rectangle(centerGreenRectangle8, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#4DAB54",
        rotation: 15 * 0.166666/7,

    });
    var centerGrayRectangle5 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle5 = rotate(center[0],center[1],centerGrayRectangle5[0],centerGrayRectangle5[1], 360 - 16*60/7);
    squares[16].object = new Pencil.Rectangle(centerGrayRectangle5, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 16 * 0.166666/7,

    });
    var centerPinkRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerPinkRectangle8 = rotate(center[0],center[1],centerPinkRectangle8[0],centerPinkRectangle8[1], 360 - 17*60/7);
    squares[17].object = new Pencil.Rectangle(centerPinkRectangle8, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#F985B9",
        rotation: 17 * 0.166666/7,

    });
    var centerBlueRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerBlueRectangle8 = rotate(center[0],center[1],centerBlueRectangle8[0],centerBlueRectangle8[1], 360 - 18*60/7);
    squares[18].object = new Pencil.Rectangle(centerBlueRectangle8, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#61C0C4",
        rotation: 18 * 0.166666/7,

    });
    var centerGrayRectangle6 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle6 = rotate(center[0],center[1],centerGrayRectangle6[0],centerGrayRectangle6[1], 360 - 19*60/7);
    squares[19].object = new Pencil.Rectangle(centerGrayRectangle6, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 19 * 0.166666/7,

    });
    var centerBrownRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerBrownRectangle8 = rotate(center[0],center[1],centerBrownRectangle8[0],centerBrownRectangle8[1], 360 - 20*60/7);
    squares[20].object = new Pencil.Rectangle(centerBrownRectangle8, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#B06932",
        rotation: 20 * 0.166666/7,

    });

    var centerBrownRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerBrownRectangle9 = rotate(center[0],center[1],centerBrownRectangle9[0],centerBrownRectangle9[1], 360 - 22*60/7);
    squares[22].object = new Pencil.Rectangle(centerBrownRectangle9, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#B06932",
        rotation: 22 * 0.166666/7,

    });
    var centerGrayRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle7 = rotate(center[0],center[1],centerGrayRectangle7[0],centerGrayRectangle7[1], 360 - 23*60/7);
    squares[23].object = new Pencil.Rectangle(centerGrayRectangle7, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 23 * 0.166666/7,

    });
    var centerGreenRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerGreenRectangle9 = rotate(center[0],center[1],centerGreenRectangle9[0],centerGreenRectangle9[1], 360 - 24*60/7);
    squares[24].object = new Pencil.Rectangle(centerGreenRectangle9, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#4DAB54",
        rotation: 24 * 0.166666/7,

    });
    var centerOrangeRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerOrangeRectangle7 = rotate(center[0],center[1],centerOrangeRectangle7[0],centerOrangeRectangle7[1], 360 - 25*60/7);
    squares[25].object = new Pencil.Rectangle(centerOrangeRectangle7, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#F17B33",
        rotation: 25 * 0.166666/7,

    });
    var centerGrayRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle8 = rotate(center[0],center[1],centerGrayRectangle8[0],centerGrayRectangle8[1], 360 - 26*60/7);
    squares[26].object = new Pencil.Rectangle(centerGrayRectangle8, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 26 * 0.166666/7,

    });
    var centerBlueRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerBlueRectangle9 = rotate(center[0],center[1],centerBlueRectangle9[0],centerBlueRectangle9[1], 360 - 27*60/7);
    squares[27].object = new Pencil.Rectangle(centerBlueRectangle9, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#61C0C4",
        rotation: 27 * 0.166666/7,

    });

    var centerBlueRectangle10 = [center[0] - unit*355, center[1] - unit*32];
    centerBlueRectangle10 = rotate(center[0],center[1],centerBlueRectangle10[0],centerBlueRectangle10[1], 360 - 29*60/7);
    squares[29].object = new Pencil.Rectangle(centerBlueRectangle10, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#61C0C4",
        rotation: 29 * 0.166666/7,

    });
    var centerGrayRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle9 = rotate(center[0],center[1],centerGrayRectangle9[0],centerGrayRectangle9[1], 360 - 30*60/7);
    squares[30].object = new Pencil.Rectangle(centerGrayRectangle9, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 30 * 0.166666/7,

    });
    var centerBrownRectangle10 = [center[0] - unit*355, center[1] - unit*32];
    centerBrownRectangle10 = rotate(center[0],center[1],centerBrownRectangle10[0],centerBrownRectangle10[1], 360 - 31*60/7);
    squares[31].object = new Pencil.Rectangle(centerBrownRectangle10, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#B06932",
        rotation: 31 * 0.166666/7,

    });
    var centerYellowRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerYellowRectangle8 = rotate(center[0],center[1],centerYellowRectangle8[0],centerYellowRectangle8[1], 360 - 32*60/7);
    squares[32].object = new Pencil.Rectangle(centerYellowRectangle8, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#EFDB3B",
        rotation: 32 * 0.166666/7,

    });
    var centerGrayRectangle10 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle10 = rotate(center[0],center[1],centerGrayRectangle10[0],centerGrayRectangle10[1], 360 - 33*60/7);
    squares[33].object = new Pencil.Rectangle(centerGrayRectangle10, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 33 * 0.166666/7,

    });
    var centerOrangeRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerOrangeRectangle8 = rotate(center[0],center[1],centerOrangeRectangle8[0],centerOrangeRectangle8[1], 360 - 34*60/7);
    squares[34].object = new Pencil.Rectangle(centerOrangeRectangle8, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#F17B33",
        rotation: 34 * 0.166666/7,

    });

    var centerOrangeRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerOrangeRectangle9 = rotate(center[0],center[1],centerOrangeRectangle9[0],centerOrangeRectangle9[1], 360 - 36*60/7);
    squares[36].object = new Pencil.Rectangle(centerOrangeRectangle9, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#F17B33",
        rotation: 36 * 0.166666/7,

    });
    var centerGrayRectangle11 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle11 = rotate(center[0],center[1],centerGrayRectangle11[0],centerGrayRectangle11[1], 360 - 37*60/7);
    squares[37].object = new Pencil.Rectangle(centerGrayRectangle11, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 37 * 0.166666/7,

    });
    var centerBlueRectangle11 = [center[0] - unit*355, center[1] - unit*32];
    centerBlueRectangle11 = rotate(center[0],center[1],centerBlueRectangle11[0],centerBlueRectangle11[1], 360 - 38*60/7);
    squares[38].object = new Pencil.Rectangle(centerBlueRectangle11, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#61C0C4",
        rotation: 38 * 0.166666/7,

    });
    var centerPinkRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerPinkRectangle9 = rotate(center[0],center[1],centerPinkRectangle9[0],centerPinkRectangle9[1], 360 - 39*60/7);
    squares[39].object = new Pencil.Rectangle(centerPinkRectangle9, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#F985B9",
        rotation: 39 * 0.166666/7,

    });
    var centerGrayRectangle12 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle12 = rotate(center[0],center[1],centerGrayRectangle12[0],centerGrayRectangle12[1], 360 - 40*60/7);
    squares[40].object = new Pencil.Rectangle(centerGrayRectangle12, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#e5e5e5",
        rotation: 40 * 0.166666/7,

    });
    var centerYellowRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerYellowRectangle9 = rotate(center[0],center[1],centerYellowRectangle9[0],centerYellowRectangle9[1], 360 - 41*60/7);
    squares[41].object = new Pencil.Rectangle(centerYellowRectangle9, squareWidth + 15*unit, squareWidth - 3*unit, {
        fill: "#EFDB3B",
        rotation: 41 * 0.166666/7,

    });

    var centerBlueToken = [center[0] + unit*20, center[1] - unit*25];
    blueToken = new Pencil.Circle(centerBlueToken, hexagoneRadius*0.2, {
        fill: "#0000FF",
    });

    scene.add(outerCircle, innerCircle, horizontalRectangle, diagonalRectangle, diagonalRectangle2, squares[100].object);

    for (let i=0; i<72; i++) {
        let square = squares[i].object;
        if (square != null) {
            scene.add(square);
        }
    }
    
    scene.add(blueToken);
}

export function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

export function getRandom(max, min) {
    return (Math.floor(Math.random() * (max-min)) + min) * 90;
}

function shadeColor(color, percent) {
    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}
