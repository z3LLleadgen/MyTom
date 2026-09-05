const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const ROUTES = {
  '/': 'swipe-desk.html',
  '/swipe-desk': 'swipe-desk.html',
  '/report': 'vietnamese-ads-report.html',
};

http.createServer((req, res) => {
  const url = req.url.split('?')[0].replace(/\/$/, '') || '/';
  const file = ROUTES[url];

  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found. Try / (Swipe Desk) or /report (analysis report).');
    return;
  }

  fs.readFile(path.join(__dirname, file), (err, html) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`${file} not found on disk`);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
}).listen(PORT, () => {
  console.log(`Serving Swipe Desk (/) and report (/report) on port ${PORT}`);
});
