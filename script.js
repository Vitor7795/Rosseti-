(function () {
  // Ajuste aqui se mudar a quantidade de quadros ou o nome dos arquivos.
  var TOTAL = 121;                              // quadros extraídos (0 a 120)
  var caminho = function (i) { return 'frames/frame_' + String(i + 1).padStart(4, '0') + '.jpg'; };

  var tela = document.getElementById('tela');
  var ctx = tela.getContext('2d');
  var cena = document.getElementById('cena');
  var slider = document.getElementById('quadro');
  var aviso = document.getElementById('aviso');
  var imagens = new Array(TOTAL);
  var carregadas = 0;
  var alvo = 0, atual = 0;

  slider.max = TOTAL - 1;

  function desenhar(i) {
    var img = imagens[i];
    if (img && img.complete && img.naturalWidth) {
      ctx.drawImage(img, 0, 0, tela.width, tela.height);
    }
  }

  function loop() {
    atual += (alvo - atual) * 0.15;             // suaviza a transição
    if (Math.abs(alvo - atual) < 0.01) atual = alvo;
    desenhar(Math.round(atual));
    requestAnimationFrame(loop);
  }

  function ir(p) { alvo = Math.max(0, Math.min(1, p)) * (TOTAL - 1); slider.value = Math.round(alvo); }

  cena.addEventListener('pointermove', function (e) {
    var r = cena.getBoundingClientRect();
    ir((e.clientX - r.left) / r.width);
  });
  slider.addEventListener('input', function () { alvo = Number(slider.value); });

  for (var i = 0; i < TOTAL; i++) {
    (function (n) {
      var img = new Image();
      img.onload = function () { carregadas++; if (n === 0) desenhar(0); aviso.hidden = true; };
      img.onerror = function () { if (!carregadas) aviso.hidden = false; };
      img.src = caminho(n);
      imagens[n] = img;
    })(i);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cena.style.cursor = 'default';
    slider.addEventListener('input', function () { atual = alvo; });
  }
  requestAnimationFrame(loop);
})();
