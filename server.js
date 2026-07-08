const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  // Clear favicon logging clutter
  if (req.url === '/favicon.ico') {
    let faviconPath = path.join(__dirname, 'assets', 'images', 'logo.png');
    fs.readFile(faviconPath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end();
      } else {
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      }
    });
    return;
  }

  // Normalize URL path
  let relativePath = req.url === '/' ? './index.html' : '.' + req.url;
  
  // Resolve path to prevent directory traversal
  let filePath = path.resolve(__dirname, relativePath);
  const rootPath = path.resolve(__dirname);

  if (!filePath.startsWith(rootPath)) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('403 Forbidden - Security violation');
    return;
  }

  // Check if file exists and is a file
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>404 Not Found</title>
          <style>
            body { background-color: #0d0f0e; color: #FAF7F0; font-family: sans-serif; text-align: center; padding-top: 100px; }
            h1 { color: #D49B57; font-size: 48px; }
            a { color: #FAF7F0; text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>404 Not Found</h1>
          <p>The requested file could not be found on the server.</p>
          <p><a href="/">Go back to Home</a></p>
        </body>
        </html>
      `);
      return;
    }

    // Determine content type based on extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Stream the file back
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    const stream = fs.createReadStream(filePath);
    stream.on('error', (streamErr) => {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('500 Internal Server Error');
    });
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` RACK N ROAST - LOCAL SERVER IS RUNNING`);
  console.log(`======================================================`);
  console.log(`  Access the site at: http://localhost:${PORT}`);
  console.log(`  Close this terminal to shut down the server.`);
  console.log(`======================================================\n`);
});
