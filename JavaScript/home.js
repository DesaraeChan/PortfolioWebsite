let wordIndex = 0;
let words = [];

const svgList = [
  "/css/ProductVectors/Akua.svg",
  "/css/ProductVectors/Albert.svg",
  "/css/ProductVectors/Duban.svg",
  "/css/ProductVectors/StonePond.svg"
];
let svgIndex = 0;



function updateWords() {
  if (window.innerWidth < 425) {
    words = ["playful", "reliable", "rational"];
  } else {
    words = ["playful", "reliable", "resourceful", "rational"];
  }
}

updateWords(); // run once on load
window.addEventListener("resize", updateWords);


function changeText() {
  const paragraphElement = document.getElementById("swapText");

  paragraphElement.classList.remove('animate-swap');
  void paragraphElement.offsetWidth;
  paragraphElement.classList.add('animate-swap');

  const animationDuration = 500;

  setTimeout(() => {
    wordIndex = (wordIndex + 1) % words.length;
    paragraphElement.textContent = words[wordIndex];
  }, animationDuration / 2);
}

setInterval(changeText, 1500);

function updateTime() {
  const timeElement = document.querySelector('.time');
  const options = {
    timeZone: 'America/Vancouver',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const currentTime = formatter.format(new Date());

  timeElement.textContent = currentTime;
}
updateTime();
setInterval(updateTime, 1000);

let engine, render, runner;
let container;

window.addEventListener("DOMContentLoaded", () => {

  container = document.getElementById("gravity-container");

  if (!container) {
    console.error("gravity-container not found");
    return;
  }

  setupMatter();

});

function setupMatter() {

  const width = container.clientWidth;
  const height = container.clientHeight;

  engine = Matter.Engine.create();
  runner = Matter.Runner.create();

  render = Matter.Render.create({
    element: container,
    engine: engine,
    options: {
      width: width,
      height: height,
      wireframes: false,
      background: "transparent"
    }
  });

  // invisible walls
  const floor = Matter.Bodies.rectangle(width / 2 , height + 21, width, 40, { isStatic: true });
  const leftWall = Matter.Bodies.rectangle(-21, height / 2, 40, height*2, { isStatic: true });
  const rightWall = Matter.Bodies.rectangle(width + 21, height / 2, 40, height*2, { isStatic: true });

  Matter.World.add(engine.world, [floor, leftWall, rightWall]);

  dropSVG(width);

  const mouse = Matter.Mouse.create(render.canvas);
  mouse.pixelRatio = window.devicePixelRatio;
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

  Matter.World.add(engine.world, mouseConstraint);

  // keep mouse synced with renderer
  render.mouse = mouse;

  Matter.Render.run(render);
  Matter.Runner.run(runner, engine);
}

function dropSVG(width) {

  const texture = svgList[svgIndex];

  // move to next svg
  svgIndex = (svgIndex + 1) % svgList.length;
  let body;
  if(svgIndex == 2){
    
    body = Matter.Bodies.rectangle( 
      Math.random() * width, 
      -200, 300, 150, 
      { 
        restitution: 0.6, 
        friction: 0.3, 
        render: { 
          sprite: { 

            texture: texture, 
            xScale: 1.5, 
            yScale: 1.5
          } 
        } 
      }); 
  }else if(svgIndex == 1){

    body = Matter.Bodies.rectangle( 
      Math.random() * width, 
      -200, 210, 110, 
      { 
        restitution: 0.6, 
        friction: 0.3, 
        render: { 
          sprite: { 

            texture: texture, 
            xScale: 1.5, 
            yScale: 1.5 
          } 
        } 
      }); 
  } else if(svgIndex == 3){

    body = Matter.Bodies.rectangle( 
      Math.random() * width, 
      -200, 280, 220, 
      { 
        restitution: 0.6, 
        friction: 0.3, 
        render: { 
          sprite: { 

            texture: texture, 
            xScale: 1.5, 
            yScale: 1.5 
          } 
        } 
      }); 
  } else if(svgIndex == 0){
    
    body = Matter.Bodies.rectangle( 
      Math.random() * width, 
      -200, 280, 220, 
      { 
        restitution: 0.6, 
        friction: 0.3, 
        render: { 
          sprite: { 

            texture: texture, 
            xScale: 1.25, 
            yScale: 1.25 
          } 
        } 
      }); 
  }

  

  Matter.World.add(engine.world, body);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => dropSVG(container.clientWidth), i * 600);
}

window.addEventListener("resize", () => {

  Matter.Render.stop(render);
  Matter.Runner.stop(runner);
  Matter.World.clear(engine.world);
  Matter.Engine.clear(engine);

  container.innerHTML = "";

  setupMatter();

});