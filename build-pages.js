// Genera docs/index.html (la página que sirve GitHub Pages) a partir de index.html.
// index.html no lleva <!doctype>, <html> ni <head> porque así lo pide el visor de Claude;
// GitHub Pages sí los necesita, y este script se los agrega.  Uso:  node build-pages.js
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const out = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>
:root { color-scheme: light; padding: env(safe-area-inset-top, 0px) 0 env(safe-area-inset-bottom, 0px); }
body { margin: 0; font: 14px system-ui, sans-serif; }
img { max-width: 100%; }
[hidden] { display: none !important; }
</style>
</head>
<body>
${src}
</body>
</html>
`;
fs.mkdirSync(path.join(__dirname, 'docs'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'docs', 'index.html'), out);
console.log('docs/index.html generado (' + Math.round(out.length / 1024) + ' KB)');
