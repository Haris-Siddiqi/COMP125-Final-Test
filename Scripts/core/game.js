"use strict";
let Game = (function () {
    // variable declarations
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let assets;
    let label1;
    let label2;
    let dice1;
    let dice2;
    let rollButton;
    let stageBackground;
    let soundID = "Thunder";
    let assetManifest = [
        { id: "1", src: "./Assets/images/1.png" },
        { id: "2", src: "./Assets/images/2.png" },
        { id: "3", src: "./Assets/images/3.png" },
        { id: "4", src: "./Assets/images/4.png" },
        { id: "5", src: "./Assets/images/5.png" },
        { id: "6", src: "./Assets/images/6.png" },
        { id: "backButton", src: "./Assets/images/startButton.png" },
        { id: "background", src: "./Assets/images/backgroundWood.png" },
        { id: "blank", src: "./Assets/images/blank.png" },
        { id: "button", src: "./Assets/images/button.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "rollButton", src: "./Assets/images/rollButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "startOverButton", src: "./Assets/images/startOverButton.png" }
    ];
    function Preload() {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Config.Game.ASSETS = assets; // make a reference to the assets in the global config
        Main();
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        stage.update();
    }
    // Register sound from assets
    function loadSound() {
        createjs.Sound.registerSound("./Assets/thunder.mp3", soundID);
    }
    // Play sound
    function playSound() {
        createjs.Sound.play(soundID);
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        // Dice variables
        let d1;
        let d2;
        // Background
        stageBackground = new Core.GameObject("background", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(stageBackground);
        // Roll button
        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(rollButton);
        // Load sound
        loadSound();
        // When roll button is clicked
        rollButton.on("click", () => {
            console.log("Dice rolled...");
            // Play sound
            playSound();
            // Dice 1
            d1 = Math.floor(Util.Mathf.RandomRange(1, 6)).toString();
            console.log("Dice 1 is " + d1);
            // Dice 2
            d2 = Math.floor(Util.Mathf.RandomRange(1, 6)).toString();
            console.log("Dice 2 is " + d2);
            // Remove objects and add updated versions
            stage.removeAllChildren();
            stage.addChild(stageBackground);
            stage.addChild(rollButton);
            // Add dice 1
            dice1 = new Core.GameObject(d1, Config.Game.CENTER_X + 150, Config.Game.CENTER_Y - 100, true);
            stage.addChild(dice1);
            // Label
            label1 = new UIObjects.Label(d1, "20px", "Consolas", "#000000", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y + 15, true);
            stage.addChild(label1);
            // Add dice 2
            dice2 = new Core.GameObject(d2, Config.Game.CENTER_X - 150, Config.Game.CENTER_Y - 100, true);
            stage.addChild(dice2);
            // Label
            label2 = new UIObjects.Label(d2, "20px", "Consolas", "#000000", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y + 15, true);
            stage.addChild(label2);
        });
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map