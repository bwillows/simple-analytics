import fs from 'fs';
import express from 'express';
import cookieParser from 'cookie-parser';
import { random } from './private/functions.js';

let app = express();

app.use(cookieParser());
let port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/* ROUTING */

app.get('/components/:file', (req, res) => { 
  res.setHeader('Content-Type', 'text/html');
  res.sendFile('./src/public/components/' + req.params.file, { root: '.' });
});

app.get('/', (req, res) => { res.sendFile('./src/public/index.html', { root: '.' }); });

app.get('/index', (req, res) => { res.redirect('/'); });
app.get('/index.html', (req, res) => { res.redirect('/'); });

app.get('/', (req, res) => { res.sendFile('./src/public/index.html', { root: '.' }); });

app.get('/analytics/', (req, res) => { res.sendFile('./src/public/index.html', { root: '.' }); });
app.get('/analytics.html', (req, res) => { res.redirect('/analytics'); });

app.use('/styles', express.static('./src/public/styles/'));
app.use('/scripts', express.static('./src/public/scripts/'));

app.use('/styles/components', express.static('./src/public/styles/components/'));

/* ANALYTICS */

app.get('/analytics/init/', (req, res) => {
  
  const obj = {
    session: random(7),
    session_start_token: random(11),
    clientID: undefined
  };

  res.send(obj);
});

app.use('/styles/', express.static('./src/public/styles/components/'));


/* API */

app.get('/api/analytics.json', (req, res) => { 
  res.setHeader('Content-Type', 'application/json');
  res.send(fs.readFileSync('./data/analytics.json'));
});

app.listen(port, () => {
  console.log(`START APP port ${port}`);
});
