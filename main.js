const { OAuth2Client } = require('google-auth-library');
const opn = require('opn');
const http = require('http');
const util = require('util');
const urlLib = require('url');
const querystring = require('querystring');
const { EventEmitter } = require('events');
const { clientId, clientSecret } = require('./.config.json');

(async function main() {
  const oacClient = port =>
    new OAuth2Client({
      clientId,
      clientSecret,
      redirectUri: `http://127.0.0.1:${port}`,
    });


  const codeEmit = new EventEmitter();

  const server = http.createServer((req, res) => {
    const { query } = urlLib.parse(req.url);
    const { code } = querystring.parse(query);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`Ok`);
    if (code) codeEmit.emit('code',code)
  });


  server.listen(0);
  await util.promisify(server.on.bind(server, 'listening'));
  const { port } = server.address();
  const client = oacClient(port);
  const url = client.generateAuthUrl({
    access_type: 'offline',
    scope: [ 'https://mail.google.com' ],
    prompt: 'consent',
  });


  process.stderr.write(`Opening ${url}`)
  opn(url);

  const code = await new Promise(rs=>codeEmit.once('code',rs));

  const { tokens } = await client.getToken(code);

  process.stdout.write(JSON.stringify(tokens,null,4));

  process.exit(0);


})();
