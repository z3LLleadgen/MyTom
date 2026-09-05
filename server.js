const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const FILE = path.join(__dirname, 'vietnamese-ads-report.html');

http.createServer((req, res) => {
  fs.readFile(FILE, (err, html) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Report file not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
}).listen(PORT, () => {
  console.log(`Serving vietnamese-ads-report.html on port ${PORT}`);
});
