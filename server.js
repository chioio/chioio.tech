const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const port = dev ? 3000 : process.env.PORT
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./certificates/ssl-privateKey.pem'),
  cert: fs.readFileSync('./certificates/ssl-certificate.pem')
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    switch (pathname) {
      case '/': {
        app.render(req, res, '/home', query);
        break;
      }
      default:
        handle(req, res, parsedUrl);
    }
  }).listen(port, (err, req) => {
    if (err) throw err
    console.log('> Ready on https://localhost:' + port)
  })
});
