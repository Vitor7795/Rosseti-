[README.md](https://github.com/user-attachments/files/35496353/README.md)
# Portfólio — Vitor Jesus

Portfólio pessoal de desenvolvimento web, com foco em criar sites para grandes marcas e confeitarias. A página tem um objeto 3D interativo no início, que gira conforme a rolagem e ao arrastar com o mouse.

## Seções

- **Início:** apresentação com o triângulo 3D
- **Sobre mim:** trajetória profissional
- **Experiência:** aprendiz na WorkOnGroup People LTDA
- **Projetos:** sites publicados
- **Competências:** o que aprendi na prática
- **Objetivo:** sites para grandes marcas e confeitarias
- **Referências:** inspiração do projeto
- **Contato**

## Estrutura dos arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura e textos da página |
| `style.css` | Todo o visual (cores, fontes, espaçamentos) |
| `script.js` | Menu e animações de aparecer ao rolar |
| `cena3d.js` | Cena 3D do triângulo (modelo e texturas embutidos) |
| `three.min.js` | Biblioteca three.js (não precisa editar) |
| `.nojekyll` | Evita que o GitHub Pages processe os arquivos com Jekyll |

Todos os arquivos devem ficar **na mesma pasta**, com esses nomes. A ordem em que são enviados não importa.

## Como rodar localmente

Não precisa instalar nada nem fazer build. Basta abrir o `index.html` no navegador (Chrome, Edge ou Firefox atualizados).

## Como publicar no GitHub Pages

1. Coloque os arquivos na **raiz** do repositório (apague antes o `index.html` e os arquivos do site antigo).
2. Faça o commit.
3. Em **Settings → Pages**, escolha a branch (por exemplo `main`) e a pasta `/ (root)`.
4. Aguarde 1 a 2 minutos e abra o link do site. Se aparecer a versão antiga, atualize com **Ctrl + Shift + R** ou abra em janela anônima.

## Como editar

- **Textos e links:** edite o `index.html` (nome, e-mail, projetos, descrições).
- **Cores e espaçamentos:** edite o `style.css`. As cores principais ficam no começo do arquivo, na regra `:root`.
- **Projetos:** cada projeto é um bloco `<a class="pf-proj-card" ...>` na seção `#projetos` do `index.html`. Copie um bloco para adicionar outro.

## Observações

- O 3D usa WebGL. Se o navegador não suportar, a página mostra uma imagem estática do triângulo no lugar.
- Os links dos projetos `petshop-pwa` e `Tabalho-Banco-de-Dados` seguem o padrão `vitor7795.github.io/nome-do-repositório/`. Confira se estão corretos.

## Créditos e referências

- Referência principal de visual e do objeto 3D: template **Aureon**, do [aura.build](https://www.aura.build/templates/aureon).
- Renderização 3D com [three.js](https://threejs.org/).
