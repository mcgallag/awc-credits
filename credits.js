/// <reference path="pixi/pixi.js" />

// aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    Loader = PIXI.loader,
    Rectangle = PIXI.Rectangle,
    Resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    width = window.innerWidth,
    height = window.innerHeight;

// create a PIXI application
let app = new Application({
  width: width,
  height: height,
  antialias: true,
  transparent: true,
  resolution: 1
});

let scenes = [];

/** {CreditsScene} - current scene displayed */
let currentScene;
let renderer;

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";

document.body.appendChild(app.view);

Loader.add("Assets/WC-credits-font.json")
      .load(setup);

function setup() {
  renderer = new TextRenderer(PIXI.loader.resources["Assets/WC-credits-font.json"].textures);

  for (const page of creditsData.pages) {
    let scene = new CreditsScene();
    console.log(page);
    
    for (let line of page.lines) {
      scene.AddLine(line);
    }
    if (page.hangtime) {
      if (page.hangtime == "Infinity")
        scene.HangTime = CreditsScene.INFINITY;
      else
        scene.HangTime = page.hangtime;
    }
    if (page.delay) {
      if (page.hangtime == "Infinity")
        scene.DelayToNext = CreditsScene.INFINITY;
      else
        scene.DelayToNext = page.delay;
    }
    scene.LineSpacing = (page.linespacing) ? page.linespacing : scene.LineSpacing;
    scene.Kerning = (page.kerning) ? page.kerning : scene.Kerning;

    scenes.push(scene);
  }

  state = renderNextScene;
  currentScene = scenes.shift();
  currentScene.TimeOut = new Date().getTime() + 2000;

  //currentScene = scenes.shift();
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  if (new Date().getTime() >= currentScene.TimeOut)
    state(delta);
}

function clearScene() {
  app.stage.removeChildren();
  let delay = currentScene.DelayToNext;

  scenes.push(currentScene);
  currentScene = scenes.shift();

  if (delay != CreditsScene.INFINITY)
    currentScene.TimeOut = new Date().getTime() + delay;
  else
    currentScene.TimeOut = Infinity;

  state = renderNextScene;
}

function renderNextScene() {
  renderer.RenderScene(currentScene, app.stage);
  
  if (currentScene.HangTime != CreditsScene.INFINITY)
    currentScene.TimeOut = new Date().getTime() + currentScene.HangTime;
  else
    currentScene.TimeOut = Infinity;

  state = clearScene;
}

// function randInt(lower, upper) {
//   return Math.floor(Math.random() * (upper - lower + 1)) + lower;
// }