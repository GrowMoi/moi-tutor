const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 4000;
const app = express();
app.use(favicon(__dirname + '/src/assets/icon/favicon.png'));
app.use(express.static(path.join(__dirname, 'www')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
});
app.listen(port, () => console.log(`Running on localhost:${port}`));
