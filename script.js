(function () {
  var tela = document.getElementById('tela');
  var ctx = tela.getContext('2d');
  var cena = document.getElementById('cena');
  var slider = document.getElementById('quadro');
  var W = tela.width, H = tela.height;
  var cores = [['#ff8fb8', '#c2185b'], ['#d9b8ff', '#7b4bc4'], ['#ffd1e3', '#e0709f'], ['#ffe3a3', '#e0a030'], ['#b8f0e6', '#2a9d8f']];
  var vento = 0, alvoVento = 0;
  var lento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var itens = [];

  function novo(topo) {
    var z = 0.5 + Math.random() * 0.8;           // profundidade: maior = mais perto
    return {
      x: Math.random() * W, y: topo ? -80 - Math.random() * 200 : Math.random() * H,
      z: z, rot: Math.random() * 6.28, giro: (Math.random() - 0.5) * 0.012,
      queda: 0.35 + z * 0.55, cor: cores[Math.floor(Math.random() * cores.length)]
    };
  }
  for (var i = 0; i < 26; i++) itens.push(novo(false));

  function embalagem(it) {
    var t = 74 * it.z;
    ctx.save();
    ctx.translate(it.x, it.y);
    ctx.rotate(it.rot);
    var g = ctx.createLinearGradient(-t / 2, -t / 2, t / 2, t / 2);
    g.addColorStop(0, it.cor[0]); g.addColorStop(1, it.cor[1]);
    ctx.fillStyle = g;
    ctx.beginPath();
    var r = t * 0.12, a = -t / 2, b = t / 2;
    ctx.moveTo(a + r, a); ctx.lineTo(b - r, a); ctx.quadraticCurveTo(b, a, b, a + r);
    ctx.lineTo(b, b - r); ctx.quadraticCurveTo(b, b, b - r, b); ctx.lineTo(a + r, b);
    ctx.quadraticCurveTo(a, b, a, b - r); ctx.lineTo(a, a + r); ctx.quadraticCurveTo(a, a, a + r, a);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.55)';        // bordas serrilhadas
    ctx.lineWidth = Math.max(1, t * 0.025);
    for (var k = -t / 2 + t * 0.12; k < t / 2 - t * 0.1; k += t * 0.09) {
      ctx.beginPath(); ctx.moveTo(a, k); ctx.lineTo(a + t * 0.1, k); ctx.moveTo(b, k); ctx.lineTo(b - t * 0.1, k); ctx.stroke();
    }
    ctx.lineWidth = Math.max(1.5, t * 0.05);           // anel no centro
    ctx.strokeStyle = 'rgba(255,255,255,.8)';
    ctx.beginPath(); ctx.arc(0, 0, t * 0.26, 0, 6.28); ctx.stroke();
    ctx.restore();
  }

  function quadro() {
    vento += (alvoVento - vento) * 0.04;               // resposta suave
    ctx.fillStyle = 'rgba(43,23,72,0.28)';             // rastro de câmera lenta
    ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < itens.length; i++) {
      var it = itens[i];
      it.y += it.queda;
      it.x += vento * 2.2 * it.z;
      it.rot += it.giro + vento * 0.004;
      if (it.y > H + 90) { itens[i] = novo(true); continue; }
      if (it.x > W + 90) it.x = -90;
      if (it.x < -90) it.x = W + 90;
      embalagem(it);
    }
    if (!lento) requestAnimationFrame(quadro);
  }

  function irPara(p) { alvoVento = (p - 0.5) * 2; slider.value = Math.round(alvoVento * 100); }
  cena.addEventListener('pointermove', function (e) {
    var r = cena.getBoundingClientRect();
    irPara((e.clientX - r.left) / r.width);
  });
  slider.addEventListener('input', function () { alvoVento = Number(slider.value) / 100; });

  ctx.fillStyle = '#2b1748'; ctx.fillRect(0, 0, W, H);
  quadro();
  if (lento) { for (var n = 0; n < 40; n++) quadro(); slider.addEventListener('input', function () { quadro(); }); }

  // Foto: basta colocar um arquivo foto.jpg na pasta do site
  var espaco = document.getElementById('foto-espaco');
  var foto = new Image();
  foto.onload = function () {
    espaco.textContent = '';
    foto.alt = 'Foto do autor do projeto';
    espaco.appendChild(foto);
    espaco.classList.add('com-foto');
  };
  foto.src = 'foto.jpg';
})();
