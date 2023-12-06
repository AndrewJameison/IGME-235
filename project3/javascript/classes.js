"use strict";

// Meter class
    // has a function to increase stability by a certain amount
        // visual effects of the meter should be created in main rather than in this class
    // counter variable, condition if it reaches max the the game is over
    // stability rate variable, for increasing the counter every frame - needs to be consistent

class Meter {
    constructor(max, stabilityStart) {
        this.counterMax = max;
        this.counter = max;
        this.rate = stabilityStart;
    }
}


// The clickable (button) class
    // should include each button, no matter the shape
        // the dimensions of the clickable should be determined upon creation
    // including the dots on the monitor
        // each button will need stored position values so they can move

class Button extends PIXI.Graphics {
    constructor(radius, color1=0xFF0000,  color2=0xFF0000, x = 0, y = 0) {
        super();

        // Metal surrounding, 
        this.beginFill(color1);
        this.drawCircle(0, 0, radius);
        this.endFill();
        this.x = x;
        this.y = y;
        this.radius = radius;

        // The big red button portion, should shrink and become dark upon a click
        this.beginFill(color2);
        this.drawCircle(0, 0, radius);
        this.endFill();
        this.x = x;
        this.y = y;
        this.radius = radius;

        // variables
        this.fwd = getRandomUnitVector();
        this.speed = 50;
        this.isAlive = true;
    }

    // The larger buttons should shrink and change color upon clicking
    shrink() {

    }

    // Only used for the small clickable buttons within the grid
    move(dt = 1 / 60) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }

    reflectX() {
        this.fwd.x *= -1;
    }

    reflectY() {
        this.fwd.y *= -1;
    }

    changeColor(newColor) {
        // Need to somehow change the color of the red portion or otherwise tint it
    }
}
