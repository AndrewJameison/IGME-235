"use strict";

const app = new PIXI.Application({
    width: 800,
    height: 600
});
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

globalTimer;

// Setting up the game
    // set up each scene, make all but start invisible
    // set up audio and other variables
    // Create spam meter
        // one red button
        // need to repeatedly click this button, can't just hold it down
        // has a large maximum
        // reaching certain thresholds adds another bar, starts playing a more intense warning

    // Create reaction meter
        // one red button
        // reaction bool, tells the player when the button can be pressed
        // the rate should increase slower to give the player their chance, or the maximum should be higher

    // Create Numpad meter
        // 9 buttons
        // somehow has to change colors from green to red to green 
        // 'meter' has a max of 9, maybe the stability rate is instead treated as a random chance, steadily increasing over time

    // Create Grid meter
        // bounding box
        // spawns in new clickables
        // random behavior similar to the numpad meter, using the stabilty rate
        // 


// actual game loop
    // shift clock
        // simply decrease the timer on screen
        // increment the destabilize variable
        // 

    // Spam Meter
        // decrease stabilitiy by variable
        // Add new clickable every delta * destability var

    // 
