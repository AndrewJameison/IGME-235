WebFont.load({
    google: {
        families: ['Press Start 2P']
    },
    active: e => {
        console.log("font loaded!");
        // pre-load the images
        app.loader.
            add([
                "images/spaceship.png",
                "images/explosions.png"
            ]);

        console.log("good here too!");
        app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
        app.loader.onComplete.add(setup);
        app.loader.load();
    }
});