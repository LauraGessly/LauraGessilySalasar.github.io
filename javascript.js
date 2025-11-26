/* ================================
   CONTROLE DO MENU (SIDEBAR)
================================ */
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

/* ================================
   CARROSSEL + POPUPS + PORTFÓLIO
================================ */

const imagens = [
  {
    src: "img/7.png",
    titulo: "Terra de Sol e Sangue",
    data: "Abril de 2025",
    descricao: "Jogo narrativo envolvendo indígenas.",
    largura: "20%",
    altura: "auto",
  },
  {
    src: "img/Bolin.png",
    titulo: "Confeitaria Bolinhos",
    data: "Dezembro de 2024",
    descricao: "Jogo de confeitaria contra o tempo.",
    largura: "20%",
    altura: "auto",
  },
  {
    src: "img/gessily.png",
    titulo: "Gessily’s Head",
    data: "Setembro de 2024",
    descricao: "Escape room psicológico criado por você.",
    largura: "20%",
    altura: "auto",
  },
  {
    src: "img/RobertDream.png",
    titulo: "Robert Dream",
    data: "Janeiro de 2025",
    descricao: "Jogo 3D da raposa tentando sobreviver ao inverno.",
    largura: "20%",
    altura: "auto",
  },
  {
    src: "img/HoneyBee.png",
    titulo: "HoneyBee",
    data: "Outubro de 2025",
    descricao: "Jogo da abelhinha. Clique na imagem para jogar!",
    largura: "20%",
    altura: "auto",
  }
];

function abrirPopupImagem(index) {
  if (index === 4) {
    abrirJogo();
    return;
  }

  const im = imagens[index];

  const popup = window.open("", "", "width=850,height=700,resizable=yes");
  popup.document.write(`
    <html>
      <head>
        <title>${im.titulo}</title>
      </head>
      <body style="font-family: Arial; padding:20px;">
        <h1>${im.titulo}</h1>
        <strong>Data:</strong> ${im.data}<br><br>
        <img src="${im.src}" style="width:${im.largura}; border-radius:8px;"><br><br>
        <p>${im.descricao}</p>
      </body>
    </html>
  `);

  popup.document.close();
}

/* ================================
            CARROSSEL
================================ */

let indiceAtual = 0;
const imagensPorTela = 3;

function exibirImagens() {
  const cont = document.getElementById("carrossel-imagens");
  cont.innerHTML = "";

  for (let i = 0; i < imagensPorTela; i++) {
    const index = (indiceAtual + i) % imagens.length;
    const info = imagens[index];

    const img = document.createElement("img");

    img.src = info.src;
    img.alt = info.titulo;
    img.style.cursor = "pointer";

    img.onclick = () => abrirPopupImagem(index);

    cont.appendChild(img);
  }
}

function mudarImagens(d) {
  indiceAtual = (indiceAtual + d * imagensPorTela + imagens.length) % imagens.length;
  exibirImagens();
}

document.addEventListener("DOMContentLoaded", exibirImagens);

/* ================================
         ABRIR / FECHAR JOGO
================================ */

function abrirJogo() {
  document.getElementById("main").style.display = "none";
  document.getElementById("areaJogo").style.display = "block";

  iniciarJogo();
}

function fecharJogo() {
  document.getElementById("areaJogo").style.display = "none";
  document.getElementById("main").style.display = "block";
}

function mudarFonte(fonte) {
    document.body.style.fontFamily = fonte;
}
