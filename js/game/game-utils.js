
import Pencil from "https://unpkg.com/pencil.js/dist/pencil.esm.js";

var tokenHit = new Howl({
    src: ['./sounds/hitToken.mp3'],
    volume: 0.1
});

const timeout = async ms => new Promise(res => setTimeout(res, ms));
var numberOfTimeouts = 0;

export var waitingUserInput = false;
export var diceAvailable = false;
export var moving = false;
export var actualScene;
export var unit;
export var outerCircle, innerCircle, horizontalRectangle, diagonalRectangle, diagonalRectangle2, hexagone, greenRectangle, blueRectangle, orangeRectangle, pinkRectangle, yellowRectangle,
    orangeRectangle2, pinkRectangle2, greenRectangle2, blueRectangle2, brownRectangle, brownCheeseRectangle, yellowCheeseRectangle, brownRectangle2, orangeRectangle3, yellowRectangle2,
    greenRectangle3, pinkRectangle3, yellowRectangle3, blueRectangle3, orangeRectangle4, brownRectangle3, greenRectangle4, pinkRectangle4, orangeRectangle5, yellowRectangle4,
    blueRectangle4, brownRectangle4, greenRectangle5, brownRectangle5, pinkRectangle5, yellowRectangle5, blueRectangle5, pinkCheeseRectangle, blueCheeseRectangle, greenCheeseRectangle,
    orangeCheeseRectangle, yellowRectangle6, grayRectangle, orangeRectangle6, greenRectangle6, grayRectangle2, pinkRectangle6, pinkRectangle7, grayRectangle3, yellowRectangle7, brownRectangle7, grayRectangle4,
    greenRectangle7, greenRectangle8, greenRectangle9, brownRectangle8, brownRectangle9, brownRectangle10, yellowRectangle8, yellowRectangle9, grayRectangle5, grayRectangle6, grayRectangle7,
    grayRectangle8, grayRectangle9, grayRectangle10, grayRectangle11, grayRectangle12, pinkRectangle8, pinkRectangle9, orangeRectangle7, orangeRectangle8, orangeRectangle9, blueRectangle8, blueRectangle9,
    blueRectangle10, blueRectangle11, blueToken;

export function getBox(boxId) {
    var box;

    switch(boxId) {
        case 0:
            box = brownCheeseRectangle;
            break;
        case 1:
            box = yellowRectangle6;
            break;
        case 2:
            box = grayRectangle;
            break;
        case 3:
            box = orangeRectangle6;
            break;
        case 4:
            box = greenRectangle6;
            break;
        case 5:
            box = grayRectangle2;
            break;
        case 6:
            box = pinkRectangle6;
            break;
        case 7:
            box = blueCheeseRectangle;
            break;
        case 8:
            box = pinkRectangle7;
            break;
        case 9:
            box = grayRectangle3;
            break;
        case 10:
            box = yellowRectangle7;
            break;
        case 11:
            box = brownRectangle7;
            break;
        case 12:
            box = grayRectangle4;
            break;
        case 13:
            box = greenRectangle7;
            break;
        case 14:
            box = orangeCheeseRectangle;
            break;
        case 15:
            box = greenRectangle8;
            break;
        case 16:
            box = grayRectangle5;
            break;
        case 17:
            box = pinkRectangle8;
            break;
        case 18:
            box = blueRectangle8;
            break;
        case 19:
            box = grayRectangle6;
            break;
        case 20:
            box = brownRectangle8;
            break;
        case 21:
            box = yellowCheeseRectangle;
            break;
        case 22:
            box = brownRectangle9;
            break;
        case 23:
            box = grayRectangle7;
            break;
        case 24:
            box = greenRectangle9;
            break;
        case 25:
            box = orangeRectangle7;
            break;
        case 26:
            box = grayRectangle8;
            break;
        case 27:
            box = blueRectangle9;
            break;
        case 28:
            box = pinkCheeseRectangle;
            break;
        case 29:
            box = blueRectangle10;
            break;
        case 30:
            box = grayRectangle9;
            break;
        case 31:
            box = brownRectangle10;
            break;
        case 32:
            box = yellowRectangle8;
            break;
        case 33:
            box = grayRectangle10;
            break;
        case 34:
            box = orangeRectangle8;
            break;
        case 35:
            box = greenCheeseRectangle;
            break;
        case 36:
            box = orangeRectangle9;
            break;
        case 37:
            box = grayRectangle11;
            break;
        case 38:
            box = blueRectangle11;
            break;
        case 39:
            box = pinkRectangle9;
            break;
        case 40:
            box = grayRectangle12;
            break;
        case 41:
            box = yellowRectangle9;
            break;

        // Horizontal
        case 42:
            box = yellowRectangle;
            break;
        case 43:
            box = pinkRectangle;
            break;
        case 44:
            box = orangeRectangle;
            break;
        case 45:
            box = blueRectangle;
            break;
        case 46:
            box = greenRectangle;
            break;
        case 48:
            box = orangeRectangle2;
            break;
        case 49:
            box = pinkRectangle2;
            break;
        case 50:
            box = greenRectangle2;
            break;
        case 51:
            box = blueRectangle2;
            break;
        case 52:
            box = brownRectangle;
            break;

        // Diagonal 1
        case 53:
            box = pinkRectangle3;
            break;
        case 54:
            box = greenRectangle3;
            break;
        case 55:
            box = yellowRectangle2;
            break;
        case 56:
            box = orangeRectangle3;
            break;
        case 57:
            box = brownRectangle2;
            break;
        case 59:
            box = yellowRectangle3;
            break;
        case 60:
            box = greenRectangle4;
            break;
        case 61:
            box = brownRectangle3;
            break;
        case 62:
            box = orangeRectangle4;
            break;
        case 63:
            box = blueRectangle3;
            break;

        // Diagonal 2
        case 64:
            box = greenRectangle5;
            break;
        case 65:
            box = brownRectangle5;
            break;
        case 66:
            box = pinkRectangle5;
            break;
        case 67:
            box = yellowRectangle5;
            break;
        case 68:
            box = blueRectangle5;
            break;
        case 70:
            box = pinkRectangle4;
            break;
        case 71:
            box = brownRectangle4;
            break;
        case 72:
            box = blueRectangle4;
            break;
        case 73:
            box = yellowRectangle4;
            break;
        case 74:
            box = orangeRectangle5;
            break;
        default:
            box = hexagone;
    }

    return box;
}

export function centerOfBox(box) {
    var center = box.position.clone().add(29*unit,20*unit);
    center.rotate(box.options.rotation, box.position);

    return center;
}

export function isCheeseBox(boxId) {
    return (boxId == 0 || boxId == 7 || boxId == 14 || boxId == 21 || boxId == 28 || boxId == 35 );
}

export async function waitUserInput(boxes) {
    var target = boxes[0];

    boxes.forEach((box) => {
        box.on("click", function moveTo() {
            target = box;
            waitingUserInput = false;
            box.removeListener("click", moveTo);
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

export function moveToken(token, box) {
    if (box != null && token != null) {
        var finalPos = centerOfBox(box);
        var initialPos = token.position.clone();
        var elapsedTime = 0;
        var lerpDuration = 600;
        moving = true;

        actualScene.on("draw", function moveAnimation() {
            var deltaTime = (1/actualScene.fps) * 1000;

            token.position.x = lerp(initialPos.x, finalPos.x, elapsedTime / lerpDuration);
            token.position.y = lerp(initialPos.y, finalPos.y, elapsedTime / lerpDuration);

            elapsedTime += deltaTime;
            
            
            if (elapsedTime >= lerpDuration) {
                tokenHit.play();
                moving = false;
                actualScene.removeListener("draw", moveAnimation);
            }
        }, true);
    }
}

export function startGame() {
    actualScene.startLoop();
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

export function selectBox(box) {
    var color = box.options.fill;
    var min = -8, max = 15, i = 0;
    var brighter = true;
    var blinkBox = function () {
        if (brighter) {
            i += 0.3 / actualScene.fps;
            box.options.fill = shadeColor(color, i);
            if (i >= max) {
                brighter = false;
            }
        } else {
            i -= 0.3 / actualScene.fps;
            box.options.fill = shadeColor(color, i);
            if (i <= min) {
                brighter = true;
            }
        }
    }
    actualScene.on("draw", blinkBox);

    return blinkBox;
}

export function unselectBox(blinkBox) {
    actualScene.removeListener("draw", blinkBox);
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

    const scene = new Pencil.Scene(divTrivia, {
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

    hexagone = new Pencil.RegularPolygon(center, 6, hexagoneRadius*0.9, {
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

    // Color boxes
    // Green #4DAB54
    // Blue #61C0C4
    // Orange #F17B33
    // Pink #F985B9
    // Yellow #EFDB3B
    // Brown #B06932
    const boxHeight = hexagoneRadius*0.9;
    const boxWidth = boxHeight * 22/33;
    unit = outerRadius/360;

    // Left horizontal
    const centerGreenRectangle = [center[0] - unit*103, center[1] - unit*32];

    greenRectangle = new Pencil.Rectangle(centerGreenRectangle, boxWidth, boxHeight, {
        fill: "#4DAB54",
    });

    const centerBlueRectangle = [center[0] - unit*150, center[1] - unit*32];
    blueRectangle = new Pencil.Rectangle(centerBlueRectangle, boxWidth, boxHeight, {
        fill: "#61C0C4",
    });

    const centerOrangeRectangle = [center[0] - unit*197, center[1] - unit*32];
    orangeRectangle = new Pencil.Rectangle(centerOrangeRectangle, boxWidth, boxHeight, {
        fill: "#F17B33",
    });

    const centerPinkRectangle = [center[0] - unit*244, center[1] - unit*32];
    pinkRectangle = new Pencil.Rectangle(centerPinkRectangle, boxWidth, boxHeight, {
        fill: "#F985B9",
    });

    const centerYellowRectangle = [center[0] - unit*291, center[1] - unit*32];
    yellowRectangle = new Pencil.Rectangle(centerYellowRectangle, boxWidth, boxHeight, {
        fill: "#EFDB3B",
    });


    // Right horizontal
    const centerOrangeRectangle2 = [center[0] + unit*60, center[1] - unit*32];
    orangeRectangle2 = new Pencil.Rectangle(centerOrangeRectangle2, boxWidth, boxHeight, {
        fill: "#F17B33",
    });

    const centerPinkRectangle2 = [center[0] + unit*107, center[1] - unit*32];
    pinkRectangle2 = new Pencil.Rectangle(centerPinkRectangle2, boxWidth, boxHeight, {
        fill: "#F985B9",
    });

    const centerGreenRectangle2 = [center[0] + unit*154, center[1] - unit*32];
    greenRectangle2 = new Pencil.Rectangle(centerGreenRectangle2, boxWidth, boxHeight, {
        fill: "#4DAB54",
    });

    const centerBlueRectangle2 = [center[0] + unit*201, center[1] - unit*32];
    blueRectangle2 = new Pencil.Rectangle(centerBlueRectangle2, boxWidth, boxHeight, {
        fill: "#61C0C4",
    });

    const centerBrownRectangle = [center[0] + unit*248, center[1] - unit*32];
    brownRectangle = new Pencil.Rectangle(centerBrownRectangle, boxWidth, boxHeight, {
        fill: "#B06932",
    });

    // Upper diagonal1
    var centerBrownRectangle2 = [center[0] - unit*103, center[1] - unit*32];
    centerBrownRectangle2 = rotate(center[0],center[1],centerBrownRectangle2[0],centerBrownRectangle2[1], 300);

    brownRectangle2 = new Pencil.Rectangle(centerBrownRectangle2, boxWidth, boxHeight, {
        fill: "#B06932",
        rotation: 0.166666,
    });

    var centerOrangeRectangle3 = [center[0] - unit*150, center[1] - unit*32];
    centerOrangeRectangle3 = rotate(center[0],center[1],centerOrangeRectangle3[0],centerOrangeRectangle3[1], 300);
    orangeRectangle3 = new Pencil.Rectangle(centerOrangeRectangle3, boxWidth, boxHeight, {
        fill: "#F17B33",
        rotation: 0.166666,
    });

    var centerYellowRectangle2 = [center[0] - unit*197, center[1] - unit*32];
    centerYellowRectangle2 = rotate(center[0],center[1],centerYellowRectangle2[0],centerYellowRectangle2[1], 300);
    yellowRectangle2 = new Pencil.Rectangle(centerYellowRectangle2, boxWidth, boxHeight, {
        fill: "#EFDB3B",
        rotation: 0.166666,
    });

    var centerGreenRectangle3 = [center[0] - unit*244, center[1] - unit*32];
    centerGreenRectangle3 = rotate(center[0],center[1],centerGreenRectangle3[0],centerGreenRectangle3[1], 300);
    greenRectangle3 = new Pencil.Rectangle(centerGreenRectangle3, boxWidth, boxHeight, {
        fill: "#4DAB54",
        rotation: 0.166666,
    });

    var centerPinkRectangle3 = [center[0] - unit*291, center[1] - unit*32];
    centerPinkRectangle3 = rotate(center[0],center[1],centerPinkRectangle3[0],centerPinkRectangle3[1], 300);
    pinkRectangle3 = new Pencil.Rectangle(centerPinkRectangle3, boxWidth, boxHeight, {
        fill: "#F985B9",
        rotation: 0.166666,
    });

    // Bottom diagonal1
    var centerYellowRectangle3 = [center[0] + unit*60, center[1] - unit*32];
    centerYellowRectangle3 = rotate(center[0],center[1],centerYellowRectangle3[0],centerYellowRectangle3[1], 300);
    yellowRectangle3 = new Pencil.Rectangle(centerYellowRectangle3, boxWidth, boxHeight, {
        fill: "#EFDB3B",
        rotation: 0.166666,
    });

    var centerGreenRectangle4 = [center[0] + unit*107, center[1] - unit*32];
    centerGreenRectangle4 = rotate(center[0],center[1],centerGreenRectangle4[0],centerGreenRectangle4[1], 300);
    greenRectangle4 = new Pencil.Rectangle(centerGreenRectangle4, boxWidth, boxHeight, {
        fill: "#4DAB54",
        rotation: 0.166666,
    });

    var centerBrownRectangle3 = [center[0] + unit*154, center[1] - unit*32];
    centerBrownRectangle3 = rotate(center[0],center[1],centerBrownRectangle3[0],centerBrownRectangle3[1], 300);
    brownRectangle3 = new Pencil.Rectangle(centerBrownRectangle3, boxWidth, boxHeight, {
        fill: "#B06932",
        rotation: 0.166666,
    });

    var centerOrangeRectangle4 = [center[0] + unit*201, center[1] - unit*32];
    centerOrangeRectangle4 = rotate(center[0],center[1],centerOrangeRectangle4[0],centerOrangeRectangle4[1], 300);
    orangeRectangle4 = new Pencil.Rectangle(centerOrangeRectangle4, boxWidth, boxHeight, {
        fill: "#F17B33",
        rotation: 0.166666,
    });

    var centerBlueRectangle3 = [center[0] + unit*248, center[1] - unit*32];
    centerBlueRectangle3 = rotate(center[0],center[1],centerBlueRectangle3[0],centerBlueRectangle3[1], 300);
    blueRectangle3 = new Pencil.Rectangle(centerBlueRectangle3, boxWidth, boxHeight, {
        fill: "#61C0C4",
        rotation: 0.166666,
    });

    // Bottom diagonal2
    var centerPinkRectangle4 = [center[0] - unit*103, center[1] - unit*32];
    centerPinkRectangle4 = rotate(center[0],center[1],centerPinkRectangle4[0],centerPinkRectangle4[1], 60);
    pinkRectangle4 = new Pencil.Rectangle(centerPinkRectangle4, boxWidth, boxHeight, {
        fill: "#F985B9",
        rotation: 0.833333,
    });

    var centerBrownRectangle4 = [center[0] - unit*150, center[1] - unit*32];
    centerBrownRectangle4 = rotate(center[0],center[1],centerBrownRectangle4[0],centerBrownRectangle4[1], 60);
    brownRectangle4 = new Pencil.Rectangle(centerBrownRectangle4, boxWidth, boxHeight, {
        fill: "#B06932",
        rotation: 0.833333,
    });

    var centerBlueRectangle4 = [center[0] - unit*197, center[1] - unit*32];
    centerBlueRectangle4 = rotate(center[0],center[1],centerBlueRectangle4[0],centerBlueRectangle4[1], 60);
    blueRectangle4 = new Pencil.Rectangle(centerBlueRectangle4, boxWidth, boxHeight, {
        fill: "#61C0C4",
        rotation: 0.833333,
    });

    var centerYellowRectangle4 = [center[0] - unit*244, center[1] - unit*32];
    centerYellowRectangle4 = rotate(center[0],center[1],centerYellowRectangle4[0],centerYellowRectangle4[1], 60);
    yellowRectangle4 = new Pencil.Rectangle(centerYellowRectangle4, boxWidth, boxHeight, {
        fill: "#EFDB3B",
        rotation: 0.833333,
    });

    var centerOrangeRectangle5 = [center[0] - unit*291, center[1] - unit*32];
    centerOrangeRectangle5 = rotate(center[0],center[1],centerOrangeRectangle5[0],centerOrangeRectangle5[1], 60);
    orangeRectangle5 = new Pencil.Rectangle(centerOrangeRectangle5, boxWidth, boxHeight, {
        fill: "#F17B33",
        rotation: 0.833333,
    });

    // Upper diagonal2
    var centerBlueRectangle5 = [center[0] + unit*60, center[1] - unit*32];
    centerBlueRectangle5 = rotate(center[0],center[1],centerBlueRectangle5[0],centerBlueRectangle5[1], 60);
    blueRectangle5 = new Pencil.Rectangle(centerBlueRectangle5, boxWidth, boxHeight, {
        fill: "#61C0C4",
        rotation: 0.833333,
    });

    var centerYellowRectangle5 = [center[0] + unit*107, center[1] - unit*32];
    centerYellowRectangle5 = rotate(center[0],center[1],centerYellowRectangle5[0],centerYellowRectangle5[1], 60);
    yellowRectangle5 = new Pencil.Rectangle(centerYellowRectangle5, boxWidth, boxHeight, {
        fill: "#EFDB3B",
        rotation: 0.833333,
    });

    var centerPinkRectangle5 = [center[0] + unit*154, center[1] - unit*32];
    centerPinkRectangle5 = rotate(center[0],center[1],centerPinkRectangle5[0],centerPinkRectangle5[1], 60);
    pinkRectangle5 = new Pencil.Rectangle(centerPinkRectangle5, boxWidth, boxHeight, {
        fill: "#F985B9",
        rotation: 0.833333,
    });

    var centerBrownRectangle5 = [center[0] + unit*201, center[1] - unit*32];
    centerBrownRectangle5 = rotate(center[0],center[1],centerBrownRectangle5[0],centerBrownRectangle5[1], 60);
    brownRectangle5 = new Pencil.Rectangle(centerBrownRectangle5, boxWidth, boxHeight, {
        fill: "#B06932",
        rotation: 0.833333,
    });

    var centerGreenRectangle5 = [center[0] + unit*248, center[1] - unit*32];
    centerGreenRectangle5 = rotate(center[0],center[1],centerGreenRectangle5[0],centerGreenRectangle5[1], 60);
    greenRectangle5 = new Pencil.Rectangle(centerGreenRectangle5, boxWidth, boxHeight, {
        fill: "#4DAB54",
        rotation: 0.833333,
    });

    // Cheeses
    const centerBrownCheeseRectangle = [center[0] - unit*355, center[1] - unit*32];
    brownCheeseRectangle = new Pencil.Rectangle(centerBrownCheeseRectangle, boxWidth + 17*unit, boxHeight, {
        fill: "#B06932",
    });

    const centerYellowCheeseRectangle = [center[0] + unit*295, center[1] - unit*32];
    yellowCheeseRectangle = new Pencil.Rectangle(centerYellowCheeseRectangle, boxWidth + 17*unit, boxHeight, {
        fill: "#EFDB3B",
    });

    var centerPinkCheeseRectangle = [center[0] + unit*295, center[1] - unit*32];
    centerPinkCheeseRectangle = rotate(center[0],center[1],centerPinkCheeseRectangle[0],centerPinkCheeseRectangle[1], 300);
    pinkCheeseRectangle = new Pencil.Rectangle(centerPinkCheeseRectangle, boxWidth + 17*unit, boxHeight, {
        fill: "#F985B9",
        rotation: 0.166666,
    });

    var centerBlueCheeseRectangle = [center[0] - unit*355, center[1] - unit*32];
    centerBlueCheeseRectangle = rotate(center[0],center[1],centerBlueCheeseRectangle[0],centerBlueCheeseRectangle[1], 300);
    blueCheeseRectangle = new Pencil.Rectangle(centerBlueCheeseRectangle, boxWidth + 17*unit, boxHeight, {
        fill: "#61C0C4",
        rotation: 0.166666,
    });

    var centerGreenCheeseRectangle = [center[0] - unit*355, center[1] - unit*32];
    centerGreenCheeseRectangle = rotate(center[0],center[1],centerGreenCheeseRectangle[0],centerGreenCheeseRectangle[1], 60);
    greenCheeseRectangle = new Pencil.Rectangle(centerGreenCheeseRectangle, boxWidth + 17*unit, boxHeight, {
        fill: "#4DAB54",
        rotation: 0.833333,
    });

    var centerOrangeCheeseRectangle = [center[0] + unit*295, center[1] - unit*32];
    centerOrangeCheeseRectangle = rotate(center[0],center[1],centerOrangeCheeseRectangle[0],centerOrangeCheeseRectangle[1], 60);
    orangeCheeseRectangle = new Pencil.Rectangle(centerOrangeCheeseRectangle, boxWidth + 17*unit, boxHeight, {
        fill: "#F17B33",
        rotation: 0.833333,
    });

    // Circle
    var centerYellowRectangle6 = [center[0] - unit*355, center[1] - unit*32];
    centerYellowRectangle6 = rotate(center[0],center[1],centerYellowRectangle6[0],centerYellowRectangle6[1], 360 - 60/7);
    yellowRectangle6 = new Pencil.Rectangle(centerYellowRectangle6, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#EFDB3B",
        rotation: 0.166666/7,

    });

    var centerGrayRectangle = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle = rotate(center[0],center[1],centerGrayRectangle[0],centerGrayRectangle[1], 360 - 2*60/7);
    grayRectangle = new Pencil.Rectangle(centerGrayRectangle, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 2 * 0.166666/7,

    });

    var centerOrangeRectangle6 = [center[0] - unit*355, center[1] - unit*32];
    centerOrangeRectangle6 = rotate(center[0],center[1],centerOrangeRectangle6[0],centerOrangeRectangle6[1], 360 - 3*60/7);
    orangeRectangle6 = new Pencil.Rectangle(centerOrangeRectangle6, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#F17B33",
        rotation: 3 * 0.166666/7,

    });

    var centerGreenRectangle6 = [center[0] - unit*355, center[1] - unit*32];
    centerGreenRectangle6 = rotate(center[0],center[1],centerGreenRectangle6[0],centerGreenRectangle6[1], 360 - 4*60/7);
    greenRectangle6 = new Pencil.Rectangle(centerGreenRectangle6, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#4DAB54",
        rotation: 4 * 0.166666/7,

    });

    var centerGrayRectangle2 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle2 = rotate(center[0],center[1],centerGrayRectangle2[0],centerGrayRectangle2[1], 360 - 5*60/7);
    grayRectangle2 = new Pencil.Rectangle(centerGrayRectangle2, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 5 * 0.166666/7,

    });

    var centerPinkRectangle6 = [center[0] - unit*355, center[1] - unit*32];
    centerPinkRectangle6 = rotate(center[0],center[1],centerPinkRectangle6[0],centerPinkRectangle6[1], 360 - 6*60/7);
    pinkRectangle6 = new Pencil.Rectangle(centerPinkRectangle6, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#F985B9",
        rotation: 6 * 0.166666/7,

    });

    var centerPinkRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerPinkRectangle7 = rotate(center[0],center[1],centerPinkRectangle7[0],centerPinkRectangle7[1], 360 - 8*60/7);
    pinkRectangle7 = new Pencil.Rectangle(centerPinkRectangle7, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#F985B9",
        rotation: 8 * 0.166666/7,

    });

    var centerGrayRectangle3 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle3 = rotate(center[0],center[1],centerGrayRectangle3[0],centerGrayRectangle3[1], 360 - 9*60/7);
    grayRectangle3 = new Pencil.Rectangle(centerGrayRectangle3, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 9 * 0.166666/7,

    });

    var centerYellowRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerYellowRectangle7 = rotate(center[0],center[1],centerYellowRectangle7[0],centerYellowRectangle7[1], 360 - 10*60/7);
    yellowRectangle7 = new Pencil.Rectangle(centerYellowRectangle7, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#EFDB3B",
        rotation: 10 * 0.166666/7,

    });
    var centerBrownRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerBrownRectangle7 = rotate(center[0],center[1],centerBrownRectangle7[0],centerBrownRectangle7[1], 360 - 11*60/7);
    brownRectangle7 = new Pencil.Rectangle(centerBrownRectangle7, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#B06932",
        rotation: 11 * 0.166666/7,

    });
    var centerGrayRectangle4 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle4 = rotate(center[0],center[1],centerGrayRectangle4[0],centerGrayRectangle4[1], 360 - 12*60/7);
    grayRectangle4 = new Pencil.Rectangle(centerGrayRectangle4, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 12 * 0.166666/7,

    });

    var centerGreenRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerGreenRectangle7 = rotate(center[0],center[1],centerGreenRectangle7[0],centerGreenRectangle7[1], 360 - 13*60/7);
    greenRectangle7 = new Pencil.Rectangle(centerGreenRectangle7, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#4DAB54",
        rotation: 13 * 0.166666/7,

    });

    var centerGreenRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerGreenRectangle8 = rotate(center[0],center[1],centerGreenRectangle8[0],centerGreenRectangle8[1], 360 - 15*60/7);
    greenRectangle8 = new Pencil.Rectangle(centerGreenRectangle8, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#4DAB54",
        rotation: 15 * 0.166666/7,

    });
    var centerGrayRectangle5 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle5 = rotate(center[0],center[1],centerGrayRectangle5[0],centerGrayRectangle5[1], 360 - 16*60/7);
    grayRectangle5 = new Pencil.Rectangle(centerGrayRectangle5, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 16 * 0.166666/7,

    });
    var centerPinkRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerPinkRectangle8 = rotate(center[0],center[1],centerPinkRectangle8[0],centerPinkRectangle8[1], 360 - 17*60/7);
    pinkRectangle8 = new Pencil.Rectangle(centerPinkRectangle8, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#F985B9",
        rotation: 17 * 0.166666/7,

    });
    var centerBlueRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerBlueRectangle8 = rotate(center[0],center[1],centerBlueRectangle8[0],centerBlueRectangle8[1], 360 - 18*60/7);
    blueRectangle8 = new Pencil.Rectangle(centerBlueRectangle8, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#61C0C4",
        rotation: 18 * 0.166666/7,

    });
    var centerGrayRectangle6 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle6 = rotate(center[0],center[1],centerGrayRectangle6[0],centerGrayRectangle6[1], 360 - 19*60/7);
    grayRectangle6 = new Pencil.Rectangle(centerGrayRectangle6, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 19 * 0.166666/7,

    });
    var centerBrownRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerBrownRectangle8 = rotate(center[0],center[1],centerBrownRectangle8[0],centerBrownRectangle8[1], 360 - 20*60/7);
    brownRectangle8 = new Pencil.Rectangle(centerBrownRectangle8, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#B06932",
        rotation: 20 * 0.166666/7,

    });

    var centerBrownRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerBrownRectangle9 = rotate(center[0],center[1],centerBrownRectangle9[0],centerBrownRectangle9[1], 360 - 22*60/7);
    brownRectangle9 = new Pencil.Rectangle(centerBrownRectangle9, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#B06932",
        rotation: 22 * 0.166666/7,

    });
    var centerGrayRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle7 = rotate(center[0],center[1],centerGrayRectangle7[0],centerGrayRectangle7[1], 360 - 23*60/7);
    grayRectangle7 = new Pencil.Rectangle(centerGrayRectangle7, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 23 * 0.166666/7,

    });
    var centerGreenRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerGreenRectangle9 = rotate(center[0],center[1],centerGreenRectangle9[0],centerGreenRectangle9[1], 360 - 24*60/7);
    greenRectangle9 = new Pencil.Rectangle(centerGreenRectangle9, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#4DAB54",
        rotation: 24 * 0.166666/7,

    });
    var centerOrangeRectangle7 = [center[0] - unit*355, center[1] - unit*32];
    centerOrangeRectangle7 = rotate(center[0],center[1],centerOrangeRectangle7[0],centerOrangeRectangle7[1], 360 - 25*60/7);
    orangeRectangle7 = new Pencil.Rectangle(centerOrangeRectangle7, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#F17B33",
        rotation: 25 * 0.166666/7,

    });
    var centerGrayRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle8 = rotate(center[0],center[1],centerGrayRectangle8[0],centerGrayRectangle8[1], 360 - 26*60/7);
    grayRectangle8 = new Pencil.Rectangle(centerGrayRectangle8, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 26 * 0.166666/7,

    });
    var centerBlueRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerBlueRectangle9 = rotate(center[0],center[1],centerBlueRectangle9[0],centerBlueRectangle9[1], 360 - 27*60/7);
    blueRectangle9 = new Pencil.Rectangle(centerBlueRectangle9, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#61C0C4",
        rotation: 27 * 0.166666/7,

    });

    var centerBlueRectangle10 = [center[0] - unit*355, center[1] - unit*32];
    centerBlueRectangle10 = rotate(center[0],center[1],centerBlueRectangle10[0],centerBlueRectangle10[1], 360 - 29*60/7);
    blueRectangle10 = new Pencil.Rectangle(centerBlueRectangle10, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#61C0C4",
        rotation: 29 * 0.166666/7,

    });
    var centerGrayRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle9 = rotate(center[0],center[1],centerGrayRectangle9[0],centerGrayRectangle9[1], 360 - 30*60/7);
    grayRectangle9 = new Pencil.Rectangle(centerGrayRectangle9, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 30 * 0.166666/7,

    });
    var centerBrownRectangle10 = [center[0] - unit*355, center[1] - unit*32];
    centerBrownRectangle10 = rotate(center[0],center[1],centerBrownRectangle10[0],centerBrownRectangle10[1], 360 - 31*60/7);
    brownRectangle10 = new Pencil.Rectangle(centerBrownRectangle10, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#B06932",
        rotation: 31 * 0.166666/7,

    });
    var centerYellowRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerYellowRectangle8 = rotate(center[0],center[1],centerYellowRectangle8[0],centerYellowRectangle8[1], 360 - 32*60/7);
    yellowRectangle8 = new Pencil.Rectangle(centerYellowRectangle8, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#EFDB3B",
        rotation: 32 * 0.166666/7,

    });
    var centerGrayRectangle10 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle10 = rotate(center[0],center[1],centerGrayRectangle10[0],centerGrayRectangle10[1], 360 - 33*60/7);
    grayRectangle10 = new Pencil.Rectangle(centerGrayRectangle10, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 33 * 0.166666/7,

    });
    var centerOrangeRectangle8 = [center[0] - unit*355, center[1] - unit*32];
    centerOrangeRectangle8 = rotate(center[0],center[1],centerOrangeRectangle8[0],centerOrangeRectangle8[1], 360 - 34*60/7);
    orangeRectangle8 = new Pencil.Rectangle(centerOrangeRectangle8, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#F17B33",
        rotation: 34 * 0.166666/7,

    });

    var centerOrangeRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerOrangeRectangle9 = rotate(center[0],center[1],centerOrangeRectangle9[0],centerOrangeRectangle9[1], 360 - 36*60/7);
    orangeRectangle9 = new Pencil.Rectangle(centerOrangeRectangle9, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#F17B33",
        rotation: 36 * 0.166666/7,

    });
    var centerGrayRectangle11 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle11 = rotate(center[0],center[1],centerGrayRectangle11[0],centerGrayRectangle11[1], 360 - 37*60/7);
    grayRectangle11 = new Pencil.Rectangle(centerGrayRectangle11, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 37 * 0.166666/7,

    });
    var centerBlueRectangle11 = [center[0] - unit*355, center[1] - unit*32];
    centerBlueRectangle11 = rotate(center[0],center[1],centerBlueRectangle11[0],centerBlueRectangle11[1], 360 - 38*60/7);
    blueRectangle11 = new Pencil.Rectangle(centerBlueRectangle11, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#61C0C4",
        rotation: 38 * 0.166666/7,

    });
    var centerPinkRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerPinkRectangle9 = rotate(center[0],center[1],centerPinkRectangle9[0],centerPinkRectangle9[1], 360 - 39*60/7);
    pinkRectangle9 = new Pencil.Rectangle(centerPinkRectangle9, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#F985B9",
        rotation: 39 * 0.166666/7,

    });
    var centerGrayRectangle12 = [center[0] - unit*355, center[1] - unit*32];
    centerGrayRectangle12 = rotate(center[0],center[1],centerGrayRectangle12[0],centerGrayRectangle12[1], 360 - 40*60/7);
    grayRectangle12 = new Pencil.Rectangle(centerGrayRectangle12, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#DDDDDD",
        rotation: 40 * 0.166666/7,

    });
    var centerYellowRectangle9 = [center[0] - unit*355, center[1] - unit*32];
    centerYellowRectangle9 = rotate(center[0],center[1],centerYellowRectangle9[0],centerYellowRectangle9[1], 360 - 41*60/7);
    yellowRectangle9 = new Pencil.Rectangle(centerYellowRectangle9, boxWidth + 15*unit, boxWidth - 3*unit, {
        fill: "#EFDB3B",
        rotation: 41 * 0.166666/7,

    });

    var centerBlueToken = [center[0] + unit*20, center[1] - unit*25];
    blueToken = new Pencil.Circle(centerBlueToken, hexagoneRadius*0.2, {
        fill: "#0000FF",
    });

    scene.add(outerCircle, innerCircle, horizontalRectangle, diagonalRectangle, diagonalRectangle2, hexagone, greenRectangle, blueRectangle, orangeRectangle, pinkRectangle, yellowRectangle,
        orangeRectangle2, pinkRectangle2, greenRectangle2, blueRectangle2, brownRectangle, brownCheeseRectangle, yellowCheeseRectangle, brownRectangle2, orangeRectangle3, yellowRectangle2,
        greenRectangle3, pinkRectangle3, yellowRectangle3, blueRectangle3, orangeRectangle4, brownRectangle3, greenRectangle4, pinkRectangle4, orangeRectangle5, yellowRectangle4,
        blueRectangle4, brownRectangle4, greenRectangle5, brownRectangle5, pinkRectangle5, yellowRectangle5, blueRectangle5, pinkCheeseRectangle, blueCheeseRectangle, greenCheeseRectangle,
        orangeCheeseRectangle, yellowRectangle6, grayRectangle, orangeRectangle6, greenRectangle6, grayRectangle2, pinkRectangle6, pinkRectangle7, grayRectangle3, yellowRectangle7, brownRectangle7, grayRectangle4,
        greenRectangle7, greenRectangle8, greenRectangle9, brownRectangle8, brownRectangle9, brownRectangle10, yellowRectangle8, yellowRectangle9, grayRectangle5, grayRectangle6, grayRectangle7,
        grayRectangle8, grayRectangle9, grayRectangle10, grayRectangle11, grayRectangle12, pinkRectangle8, pinkRectangle9, orangeRectangle7, orangeRectangle8, orangeRectangle9, blueRectangle8, blueRectangle9,
        blueRectangle10, blueRectangle11, blueToken);

    actualScene = scene;
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
