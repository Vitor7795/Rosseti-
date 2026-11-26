# Segura — site de portfólio (loja de camisinhas)

Site estático (HTML, CSS e JS puro). Hero com animação de quadros controlada pelo mouse, pelo toque e pelo teclado.

## Como usar
1. Coloque o vídeo do Google Flow na pasta e rode: `./extrair-frames.sh video.mp4` (precisa do ffmpeg).
2. Abra `index.html` no navegador (ou use Live Server).
3. Foto: em `index.html`, troque o texto dentro de `<div class="foto">` por `<img src="foto.jpg" alt="Sua descrição">`.
4. Publicar: `git init && git add . && git commit -m "site" && git remote add origin URL && git push -u origin main`. GitHub Pages: Settings > Pages.

## Acessibilidade (meta: 95+ no WAVE e Lighthouse)
Idioma pt-BR, link de pular conteúdo, landmarks, ordem de títulos, foco visível, contraste AA, `prefers-reduced-motion`, controle por teclado (slider).
