console.log("snake.js");
const body = document.querySelector("body");
const parentCanvas = document.querySelector(".parent-canvas");

//modal gameOver
const mdlGameOver = document.querySelector("#modal-game-over");
const gameOverTitle = document.querySelector("#game-over-title");
const gameOverH3 = document.querySelector("#game-over-h3");
const btnRestart = document.querySelector(".btn-restart");
const listScores = document.querySelector("#list-scores");
//test
const leftBtn = document.querySelector(".left");

//formulaire
const formulaire = document.querySelector("#form-score");
const inputPseudo = document.querySelector("#pseudo-input");

const windowWidth = window.innerWidth;

let isInited = false;
let divisor = 1;

if (windowWidth < 750) {
  divisor = 2.5;
} else if (windowWidth < 1050 && windowWidth > 750) {
  divisor = 1.5;
} else {
  divisor = 1;
}

score = 0;
window.onload = () => {
  let canvas;
  let canvasWidth = 900 / divisor;
  let canvasHeight = 600 / divisor;
  let blockSize = 30 / divisor;
  let ctx;
  let colorSnake = "#ff0000";
  let delay = 100;
  let snakee;
  let applee;

  let timeOutId;

  let widthInBlocks = canvasWidth / blockSize;
  let heightInBlocks = canvasHeight / blockSize;

  init();

  // createArrow();
  // function createArrow() {
  //   const btnTop = document.createElement("button");
  //   btnTop.classList.add("btn-top");
  //   btnTop.textContent = "<>";
  //   body.appendChild(btnTop);
  // }

  function init() {
    canvas = document.createElement("canvas");
    parentCanvas.appendChild(canvas);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");
    snakee = new Snake(
      [
        [7, 4],
        [6, 4],
        [5, 4],
        [4, 4],
        [3, 4],
        [2, 4],
      ],
      "right"
    );
    // snakee = new Snake(
    //   [
    //     [20, 8],
    //     [19, 8],
    //     [18, 8],
    //     [17, 8],
    //     [16, 8],
    //     [15, 8],
    //     [14, 8],
    //     [13, 8],
    //     [12, 8],
    //     [11, 8],
    //     [10, 8],
    //     [9, 8],
    //     [8, 8],
    //     [7, 8],
    //     [6, 8],
    //     [5, 8],
    //     [4, 8],
    //     [3, 8],
    //     [3, 7],
    //     [4, 7],
    //     [5, 7],
    //     [6, 7],
    //     [7, 7],
    //     [8, 7],
    //     [9, 7],
    //     [10, 7],
    //     [11, 7],
    //     [12, 7],
    //     [13, 7],
    //     [14, 7],
    //     [15, 7],
    //     [16, 7],
    //     [17, 7],
    //     [18, 7],
    //     [19, 7],
    //     [20, 7],
    //     [20, 6],
    //     [19, 6],
    //     [18, 6],
    //     [17, 6],
    //     [16, 6],
    //     [15, 6],
    //     [14, 6],
    //     [13, 6],
    //     [12, 6],
    //     [11, 6],
    //     [10, 6],
    //     [9, 6],
    //     [8, 6],
    //     [7, 6],
    //     [6, 6],
    //     [5, 6],
    //     [4, 6],
    //     [3, 6],

    //     [3, 5],
    //     [4, 5],
    //     [5, 5],
    //     [6, 5],
    //     [7, 5],
    //     [8, 5],
    //     [9, 5],
    //     [10, 5],
    //     [11, 5],
    //     [12, 5],
    //     [13, 5],
    //     [14, 5],
    //     [15, 5],
    //     [16, 5],
    //     [17, 5],
    //     [18, 5],
    //     [19, 5],
    //     [20, 5],
    //     [21, 5],
    //     [22, 5],
    //     [23, 5],
    //     [23, 4],
    //     [22, 4],
    //     [21, 4],
    //     [20, 4],
    //     [19, 4],
    //     [18, 4],
    //     [17, 4],
    //     [16, 4],
    //     [15, 4],
    //     [14, 4],
    //     [13, 4],
    //     [12, 4],
    //     [11, 4],
    //     [10, 4],
    //     [9, 4],
    //     [8, 4],
    //     [7, 4],
    //     [6, 4],
    //     [5, 4],
    //     [4, 4],
    //     [3, 4],
    //     [2, 4],
    //   ],
    //   "right"
    // );
    applee = new Apple([27, 10]);
    // if(isInited){
    // }
    refreshCanvas();
  }

  function refreshCanvas() {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    //ici je dois appeller cleatTimeout(timeoutid) sinon charge plusieurs fois ma fonction
    //et le snakee va beaucoup plus vite, ce que je ne veux pas

    // Relancer la fonction refreshCanvas() avec le délai souhaité (300 millisecondes dans cet exemple)

    if (snakee.checkCollision()) {
      console.log(snakee.checkCollision());
      gameOver(score);
    } else if (isInited === false) {
      console.log("not inited :(");
    } else {
      if (snakee.isEatingApple(snakee.body[0], applee.position)) {
        snakee.ateApple = true;
        do {
          applee.setNewPosition();
        } while (applee.isOnSnake(snakee));
      }
      snakee.advance();

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      snakee.draw();
      applee.draw();
      drawScore();
      timeOutId = setTimeout(refreshCanvas, 100);
    }
  }

  function gameOver(score) {
    gameOverTitle.style.display = "flex";
    btnRestart.textContent = "Recommencer";
    gameOverH3.textContent =
      "Clique sur ta barre d'espace ou le bouton ci-dessous pour recommencer";

    ctx.save();
    let fontGameOver = 40 / divisor;
    ctx.font = `${fontGameOver}px Arial`;
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(92, 4, 4)";
    // ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2 - 50);
    // ctx.fillText(
    //   "Appuyer sur la touche espace ou",
    //   canvasWidth / 2,
    //   canvasHeight / 2
    // );
    // ctx.fillText(
    //   "en dehors du cadre pour rejouer.",
    //   canvasWidth / 2,
    //   canvasHeight / 2 + 50
    // );
    ctx.restore();
    mdlGameOver.style.display = "flex";
  }
  //formulaire
  formulaire.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(inputPseudo.value, score);
    dataSorted.push({pseudo: inputPseudo.value, score: score});
    createList(dataSorted);
    sendData(inputPseudo.value, score);
  });

  function restart() {
    clearTimeout(refreshCanvas);
    snakee = new Snake(
      [
        [7, 4],
        [6, 4],
        [5, 4],
        [4, 4],
        [3, 4],
        [2, 4],
      ],
      "right"
    );
    applee = new Apple([28, 9]);
    mdlGameOver.style.display = "none";
    score = 0;
    refreshCanvas();
  }

  function drawScore() {
    ctx.save();
    let fontScore = 80 / divisor;
    ctx.font = `${fontScore}px Arial`;
    const textWidth = ctx.measureText(score.toString()).width;

    ctx.fillText(
      score.toString(),
      canvasWidth / 2 - textWidth / 2,
      canvasHeight - 10
    );
    ctx.restore();
  }

  function drawBlock(ctx, position) {
    let x = position[0] * blockSize;
    let y = position[1] * blockSize;
    ctx.fillRect(x, y, blockSize, blockSize);
  }

  function Snake(bodyS, direction) {
    console.log("Snake func");
    this.body = bodyS;
    this.direction = direction;
    this.ateApple = false;
    this.draw = function () {
      console.log("draw");
      ctx.save();
      ctx.fillStyle = colorSnake;
      console.log(this.body);
      for (var i = 0; i < this.body.length; i++) {
        console.log(this.body[i]);
        drawBlock(ctx, this.body[i]);
      }
      ctx.restore();
    };

    this.advance = function () {
      let testTrue = true;
      if (testTrue) {
        let nextPosition = this.body[0].slice();
        // la coordonénés de mon nouvel élément de snakee

        switch (this.direction) {
          case "right":
            nextPosition[0]++;
            break;
          case "left":
            nextPosition[0]--;
            break;
          case "up":
            nextPosition[1]--;
            break;
          case "down":
            nextPosition[1]++;
            break;
          default:
            throw "Unvalid direction";
        }
        this.body.unshift(nextPosition);
        if (!snakee.ateApple) {
          this.body.splice(-1);
        } else {
          this.ateApple = false;
        }
        //gestion de la collision avec la pomme.
      } else {
        return;
      }
    };

    this.setDirection = function (newDirection) {
      let allowedDirections;
      switch (this.direction) {
        case "left":
          allowedDirections = ["up", "down"];
          break;
        case "right":
          allowedDirections = ["up", "down"];
          break;
        case "up":
          allowedDirections = ["left", "right"];
          break;
        case "down":
          allowedDirections = ["left", "right"];
          break;
        default:
          throw "Unvalid direction";
      }
      if (allowedDirections.indexOf(newDirection) > -1) {
        this.direction = newDirection;
      }
    };

    this.checkCollision = function () {
      let wallCollision = false;
      let snakeCollision = false;
      let head = this.body[0];
      let rest = this.body.slice(1);
      let snakeX = head[0];
      let snakeY = head[1];
      let minX = 0;
      let minY = 0;
      let maxX = widthInBlocks - 1;
      let maxY = heightInBlocks - 1;
      let isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
      let isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

      if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
        wallCollision = true;
      }

      for (let i = 0; i < rest.length; i++) {
        const el = rest[i];
        if (snakeX === el[0] && snakeY === el[1]) {
          snakeCollision = true;
        }
      }

      return wallCollision || snakeCollision;
    };

    this.isEatingApple = function (head, applePosition) {
      if (head[0] === applePosition[0] && head[1] === applePosition[1]) {
        // score++;
        // addMil(score);
        async function main() {
          await addMil(); // Attend que le score atteigne 1000
          console.log(score); // Affiche la valeur finale du score (1000)
        }
        main();
        return true;
      } else {
        return false;
      }
    };
  }

  function Apple(position) {
    this.position = position;
    this.draw = function () {
      ctx.save();
      ctx.fillStyle = "#33cc33";
      ctx.beginPath();
      let radius = blockSize / 2;
      let x = this.position[0] * blockSize + radius;
      let y = this.position[1] * blockSize + radius;

      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.fill();
      //save sert avec le restore
      ctx.restore();
    };

    this.setNewPosition = function () {
      let newX = Math.round(Math.random() * (widthInBlocks - 1));
      let newY = Math.round(Math.random() * (heightInBlocks - 1));
      this.position = [newX, newY];
    };
    //je vérifie si ma pomme n'est pas sur le serpent
    this.isOnSnake = function (snakeToCheck) {
      var isOnSnake = false;
      for (let i = 0; i < snakeToCheck.body.length; i++) {
        const el = snakeToCheck.body[i];
        console.log(snakeToCheck.body);
        console.log(el[0]);
        if (this.position[0] === el[0] && this.position[1] === el[1]) {
          isOnSnake = true;
        }
      }
      return isOnSnake;
    };
  }

  document.addEventListener("keydown", function (event) {
    let newDirection2;

    switch (event.code) {
      case "ArrowUp":
        newDirection2 = "up";

        break;
      case "ArrowUp":
        break;
      case "ArrowDown":
        newDirection2 = "down";

        break;
      case "ArrowRight":
        newDirection2 = "right";

        break;
      case "ArrowLeft":
        newDirection2 = "left";
        break;
      case "Space":
        restart();

        score = 0;
        return;
      default:
        return;
    }

    //ancienne solution avec event.key

    // if (event.key === "ArrowUp") {

    //   console.log("haut");
    //   newDirection2 = "up";

    // } else if (event.key === "ArrowDown") {
    //   newDirection2 = "down";

    //   console.log("bas");

    // } else if (event.key === "ArrowLeft") {
    //   console.log("gauche");
    //   newDirection2 = "left";

    // } else if (event.key === "ArrowRight") {
    //   newDirection2 = "right";
    //   console.log("droite");
    // }
    snakee.setDirection(newDirection2);
  });

  const interactionBtn = document.querySelectorAll(".arrow, .btn-restart");

  let newDirectionFromBtn;
  for (let arrow = 0; arrow < interactionBtn.length; arrow++) {
    const el = interactionBtn[arrow];
    el.addEventListener("click", () => {
      switch (true) {
        case el.classList.contains("arrow-left"):
          newDirectionFromBtn = "left";
          break;
        case el.classList.contains("arrow-right"):
          newDirectionFromBtn = "right";
          break;
        case el.classList.contains("arrow-up"):
          newDirectionFromBtn = "up";
          break;
        case el.classList.contains("arrow-down"):
          newDirectionFromBtn = "down";
          break;
        case el.classList.contains("btn-restart"):
          // newDirectionFromBtn = "down";
          if (isInited) {
            restart();
          } else {
            isInited = true;
            mdlGameOver.style.display = "none";
            refreshCanvas();
          }
          break;
        default:
          return;
      }
      snakee.setDirection(newDirectionFromBtn);
    });
  }
  // body.addEventListener("click", (e) => {
  //   e.stopPropagation();
  //   if (e.target === body) {
  //     //je demande si je clique bien sur body et non dans ses éléments enfants.
  //     console.log("body click");
  //     restart();
  //   }
  // });

  let intervalScore = null;

  const addMil = () => {
    return new Promise((resolve, reject) => {
      if (intervalScore === null) {
        intervalScore = setInterval(() => {
          score += 10;
          // scoreTxt.textContent = score;

          if (score % 1000 === 0) {
            clearInterval(intervalScore); // Arrêter l'intervalle lorsque le score atteint 1000
            intervalScore = null; // Remettre la référence de l'intervalle à null
            resolve(score);
          }
        }, 10);
        console.log(score);
      }
    });
  };
};

// mdlGameOver
// addNewScore("Stephane", 10000);

// function addNewScore(pseudo, score) {
//   const newLiElement = document.createElement("li");

//   // Ajouter du texte à l'intérieur de l'élément li
//   newLiElement.textContent = `${pseudo} : ${score}`;

//   // Ajouter l'élément li à la liste (élément ul ou ol)
//   listScores.appendChild(newLiElement);
// };

let dataSorted;

function createList(datas) {
  dataSorted = datas.sort((a, b) => b.score - a.score).splice(0, 5);
  //range mon tableau et garde le top 5
  console.log(dataSorted);
  writeScores(dataSorted);
}

function writeScores(datasSorted) {
  listScores.innerHTML = "";
  datasSorted.map(({ pseudo, score }, index) => {
    const newLiElement = document.createElement("li");

    newLiElement.textContent = `${index + 1} : ${pseudo} : ${score}`;

    listScores.appendChild(newLiElement);
    console.log(pseudo, score);
  });
}




//formulaire et soumission
formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
});

// function submitForm(score) {
//   formulaire.style.display = "flex";
//   formulaire.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log(inputPseudo.value, score);
//     dataSorted.push({pseudo: inputPseudo.value, score: score});
//     createList(dataSorted);
//     sendData(inputPseudo.value, score);
//   });

// }
