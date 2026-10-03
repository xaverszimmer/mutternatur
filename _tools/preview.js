// Local preview server that mimics Cloudflare Workers Static Assets:
//   /page        -> page.html
//   /page.html   -> 307 redirect to /page
//   /dir/        -> dir/index.html
//   not found    -> nearest 404.html (walking up the folders), status 404
//   _redirects   -> exact-match rules are applied first
// Start:  node _tools/preview.js   then open http://localhost:8080
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT) || 8080;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
};
const isFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile();

function send(res, file, status = 200) {
  res.writeHead(status, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = decodeURIComponent(url.pathname);
  const abs = path.join(ROOT, p);
  if (!abs.startsWith(ROOT)) { res.writeHead(403); return res.end(); }

  const redirectsFile = path.join(ROOT, '_redirects');
  if (fs.existsSync(redirectsFile)) {
    for (const line of fs.readFileSync(redirectsFile, 'utf8').split('\n')) {
      const [from, to, code] = line.trim().split(/\s+/);
      if (from && !from.startsWith('#') && from === p) {
        res.writeHead(Number(code) || 302, { Location: to });
        return res.end();
      }
    }
  }
  if (p.endsWith('.html')) {
    const pretty = p.replace(/(index)?\.html$/, '');
    res.writeHead(307, { Location: pretty + url.search });
    return res.end();
  }
  if (isFile(abs)) return send(res, abs);
  if (isFile(abs + '.html')) return send(res, abs + '.html');
  if (isFile(path.join(abs, 'index.html'))) {
    if (!p.endsWith('/')) { res.writeHead(307, { Location: p + '/' + url.search }); return res.end(); }
    return send(res, path.join(abs, 'index.html'));
  }
  let dir = path.dirname(abs);
  while (dir.startsWith(ROOT)) {
    if (isFile(path.join(dir, '404.html'))) return send(res, path.join(dir, '404.html'), 404);
    dir = path.dirname(dir);
  }
  res.writeHead(404); res.end('Not found');
}).listen(PORT, () => console.log(`Preview: http://localhost:${PORT}`));
