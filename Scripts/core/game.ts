let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let assets: createjs.LoadQueue;

    let exampleLabel: UIObjects.Label;
    let exampleButton: UIObjects.Button;    

    let assetManifest = 
    [
        {id:"1", src:"./Assets/images/1.png"},
        {id:"2", src:"./Assets/images/2.png"},
        {id:"3", src:"./Assets/images/3.png"},
        {id:"4", src:"./Assets/images/4.png"},
        {id:"5", src:"./Assets/images/5.png"},
        {id:"6", src:"./Assets/images/6.png"},
        {id:"backButton", src:"./Assets/images/startButton.png"},
        {id:"background", src:"./Assets/images/background.png"},
        {id:"blank", src:"./Assets/images/blank.png"},
        {id:"button", src:"./Assets/images/button.png"},
        {id:"nextButton", src:"./Assets/images/nextButton.png"},
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"resetButton", src:"./Assets/images/resetButton.png"},
        {id:"rollButton", src:"./Assets/images/rollButton.png"},
        {id:"startButton", src:"./Assets/images/startButton.png"},
        {id:"startOverButton", src:"./Assets/images/startOverButton.png"}
    ];

    function Preload():void
    {
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
    function Start():void
    {
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
    function Update():void
    {
        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");

        // Add dice 1
        exampleButton = new UIObjects.Button("1", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y -100, true);
        stage.addChild(exampleButton);

        // Label
        exampleLabel = new UIObjects.Label("1", "20px", "Consolas", "#000000", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y + 15, true);
        stage.addChild(exampleLabel);

        // Add dice 2
        exampleButton = new UIObjects.Button("2", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y -100, true);
        stage.addChild(exampleButton);

        // Label
        exampleLabel = new UIObjects.Label("2", "20px", "Consolas", "#000000", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y + 15, true);
        stage.addChild(exampleLabel);

        // Roll
        exampleButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(exampleButton);

        exampleButton.on("click", ()=>{
            console.log("Dice rolled...");

            // Dice 1
            let d1 = Math.floor(Util.Mathf.RandomRange(1, 6));
            console.log("Dice 1 is " + d1);

            // Dice 2
            let d2 = Math.floor(Util.Mathf.RandomRange(1, 6));
            console.log("Dice 1 is " + d2);
        });
    }

    window.addEventListener('load', Preload);


})();