let bg, bg2, abelha, aranhas, flores;
let pontos = 0;
let vidas = 3;
let estadoJogo = "menu";

let imgStart = new Image();
imgStart.src = "img/start.png";
let imgGameOver = new Image();
imgGameOver.src = "img/gameover.png";
let imgWin = new Image();
imgWin.src = "img/youwin.png";

document.addEventListener("keydown", (event) => {
  if (estadoJogo === "menu" && event.key === "Enter") {
    iniciarJogo();
    return;
  }

  if ((estadoJogo === "derrota" || estadoJogo === "vitoria") && event.key.toLowerCase() === "l") {
    iniciarJogo();
    return;
  }

  if (estadoJogo === "jogando") {
    if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") abelha.dir = 15;
    if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") abelha.dir = -15;
  }
});

document.addEventListener("keyup", (event) => {
  if (["d","D","a","A","ArrowLeft","ArrowRight"].includes(event.key))
    abelha.dir = 0;
});

function iniciarJogo() {
  prepararCanvas();

  estadoJogo = "jogando";
  pontos = 0;
  vidas = 3;

  bg = new BG(0, 0, 900, 720, "img/bg.png");
  bg2 = new BG(0, -720, 900, 720, "IMG/bg.png");
  abelha = new Abelha(400, 600, 100, 100, "IMG/bee1.png");

  aranhas = [
    new Aranha(Math.random() * 750, -100, 120, 120, "img/spider1.png"),
    new Aranha(Math.random() * 750, -400, 120, 120, "img/spider1.png")
  ];

  flores = [
    new Flower(Math.random() * 800, -200, 60, 60, "img/flower1.png"),
    new Flower(Math.random() * 800, -600, 60, 60, "img/flower1.png")
  ];
}

function voltarMenuAutomatico() {
  setTimeout(() => { estadoJogo = "menu"; }, 3000);
}

function Draw() {
  bg.desenha();
  bg2.desenha();

  if (estadoJogo === "menu") { desenharMenu(); return; }
  if (estadoJogo === "vitoria") { desenharVitoria(); return; }
  if (estadoJogo === "derrota") { desenharGameOver(); return; }

  flores.forEach(f => f.desenha());
  aranhas.forEach(a => a.desenha());
  abelha.desenha();
  desenharHUD();
}

function desenharHUD() {
  pincel.font = "24px Arial";
  pincel.fillStyle = "white";
  pincel.fillText("Pontos: " + pontos, 20, 40);
  pincel.fillText("Vidas: " + vidas, 20, 70);
}

function desenharMenu() {
  pincel.drawImage(imgStart, 0, 0, 900, 720);
  pincel.font = "28px Arial";
  pincel.fillStyle = "white";
  pincel.textAlign = "center";
  pincel.fillText(" JOGO DA ABELHA ", 450, 85);
  pincel.fillText("PRESSIONE ENTER PARA COMEÇAR", 450, 585);
  pincel.font = "20px Arial";
  pincel.fillText("Use A / D ou ← / → para mover a abelha", 450, 640);
  pincel.fillText("Colete 5 flores e desvie das aranhas!", 450, 670);
  pincel.textAlign = "left";
}

function desenharGameOver() {
  pincel.drawImage(imgGameOver, 0, 0, 900, 720);
  pincel.font = "32px Arial";
  pincel.fillStyle = "white";
  pincel.textAlign = "center";
  pincel.fillText("VOCÊ PERDEU! ", 450, 90);
  pincel.font = "24px Arial";
  pincel.fillText("Voltando ao menu...", 450, 120);
  pincel.textAlign = "left";
}

function desenharVitoria() {
  pincel.drawImage(imgWin, 0, 0, 900, 720);
  pincel.font = "36px Arial";
  pincel.fillStyle = "white";
  pincel.textAlign = "center";
  pincel.fillText("VOCÊ VENCEU! ", 450, 90);
  pincel.font = "24px Arial";
  pincel.fillText("Pressione L para jogar novamente", 450, 120);
  pincel.textAlign = "left";
}

function Update() {
  if (estadoJogo !== "jogando") return;

  bg.move(12, 720, 0);
  bg2.move(12, 0, -720);

  abelha.animation("bee");
  aranhas.forEach(a => a.animation("spider"));
  flores.forEach(f => f.animation("flower"));

  abelha.move();
  aranhas.forEach(a => a.move(8));
  flores.forEach(f => f.move(6));

  flores.forEach(f => {
    if (abelha.collide(f)) {
      pontos++;
      f.y = -Math.random() * 400 - 50;
      f.x = Math.random() * 800;
      if (pontos >= 10) estadoJogo = "vitoria";
    }
  });

  aranhas.forEach(a => {
    if (abelha.collide(a)) {
      vidas--;
      a.y = -Math.random() * 400 - 100;
      a.x = Math.random() * 800;
      if (vidas <= 0) {
        estadoJogo = "derrota";
        voltarMenuAutomatico();
      }
    }
  });
}

function Main() {
  if (!pincel) return;
  pincel.clearRect(0, 0, 900, 720);
  Draw();
  Update();
}

setInterval(Main, 30);
