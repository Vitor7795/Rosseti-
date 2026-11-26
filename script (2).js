(function () {
  var tela = document.getElementById('tela');
  var ctx = tela.getContext('2d');
  var cena = document.getElementById('cena');
  var slider = document.getElementById('quadro');
  var video = document.getElementById('video');
  var W = tela.width, H = tela.height;
  var modoVideo = false;
  var pos = 0.5, posSuave = 0.5;                 // 0 = esquerda, 1 = direita

  // ---------- Mouse, toque e controle ----------
  function irPara(p) { pos = Math.max(0, Math.min(1, p)); slider.value = Math.round(pos * 100); }
  cena.addEventListener('pointermove', function (e) {
    var r = cena.getBoundingClientRect();
    irPara((e.clientX - r.left) / r.width);
  });
  slider.addEventListener('input', function () { pos = Number(slider.value) / 100; });

  // ---------- Modo vídeo: coloque um arquivo video.mp4 na pasta do site ----------
  video.addEventListener('loadedmetadata', function () {
    modoVideo = true;
    tela.hidden = true;
    video.hidden = false;
    video.pause();
  });
  video.src = 'video.mp4';

  function girarVideo() {
    posSuave += (pos - posSuave) * 0.12;          // transição suave
    var d = video.duration;
    if (d && isFinite(d)) {
      var t = posSuave * (d - 0.05);
      if (Math.abs(video.currentTime - t) > 0.02) video.currentTime = t;
    }
    requestAnimationFrame(girarVideo);
  }
  video.addEventListener('loadedmetadata', function () { requestAnimationFrame(girarVideo); });

  // ---------- Modo reserva (sem vídeo): camisinhas desenhadas em código ----------
  var cores = [['#ff8fb8', '#c2185b'], ['#d9b8ff', '#7b4bc4'], ['#ffd1e3', '#e0709f'], ['#ffe3a3', '#e0a030'], ['#b8f0e6', '#2a9d8f']];
  var vento = 0, itens = [];
  var lento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function novo(topo) {
    var z = 0.5 + Math.random() * 0.8;
    return { x: Math.random() * W, y: topo ? -80 - Math.random() * 200 : Math.random() * H, z: z,
      rot: Math.random() * 6.28, giro: (Math.random() - 0.5) * 0.012, queda: 0.35 + z * 0.55,
      cor: cores[Math.floor(Math.random() * cores.length)] };
  }
  for (var i = 0; i < 26; i++) itens.push(novo(false));

  function embalagem(it) {
    var t = 74 * it.z, a = -t / 2, b = t / 2, r = t * 0.12;
    ctx.save(); ctx.translate(it.x, it.y); ctx.rotate(it.rot);
    var g = ctx.createLinearGradient(a, a, b, b);
    g.addColorStop(0, it.cor[0]); g.addColorStop(1, it.cor[1]);
    ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(a + r, a); ctx.lineTo(b - r, a); ctx.quadraticCurveTo(b, a, b, a + r);
    ctx.lineTo(b, b - r); ctx.quadraticCurveTo(b, b, b - r, b); ctx.lineTo(a + r, b);
    ctx.quadraticCurveTo(a, b, a, b - r); ctx.lineTo(a, a + r); ctx.quadraticCurveTo(a, a, a + r, a); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = Math.max(1, t * 0.025);
    for (var k = a + t * 0.12; k < b - t * 0.1; k += t * 0.09) {
      ctx.beginPath(); ctx.moveTo(a, k); ctx.lineTo(a + t * 0.1, k); ctx.moveTo(b, k); ctx.lineTo(b - t * 0.1, k); ctx.stroke();
    }
    ctx.lineWidth = Math.max(1.5, t * 0.05); ctx.strokeStyle = 'rgba(255,255,255,.8)';
    ctx.beginPath(); ctx.arc(0, 0, t * 0.26, 0, 6.28); ctx.stroke();
    ctx.restore();
  }

  function quadro() {
    if (modoVideo) return;
    vento += ((pos - 0.5) * 2 - vento) * 0.04;
    ctx.fillStyle = 'rgba(43,23,72,0.28)'; ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < itens.length; i++) {
      var it = itens[i];
      it.y += it.queda; it.x += vento * 2.2 * it.z; it.rot += it.giro + vento * 0.004;
      if (it.y > H + 90) { itens[i] = novo(true); continue; }
      if (it.x > W + 90) it.x = -90;
      if (it.x < -90) it.x = W + 90;
      embalagem(it);
    }
    if (!lento) requestAnimationFrame(quadro);
  }
  ctx.fillStyle = '#2b1748'; ctx.fillRect(0, 0, W, H);
  quadro();
  if (lento) { for (var n = 0; n < 40; n++) quadro(); slider.addEventListener('input', quadro); }
})();
