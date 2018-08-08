const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
let db = null;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

mongodb.connect('mongodb://localhost:27017').then(x => db = x.db('ygd'));

app.get('/', (req, res) => res.json('Hello World'));

app.get('/api/post/:id', (req, res) =>
  db.collection('posts')
    .findOne({ id: +req.params.id })
    .then(r => res.json(r))
);

app.post('/api/post', (req, res) =>
  db.collection('posts')
    .insert(req.body)
    .then(r => res.send('done'))
);

app.listen('8001', '0.0.0.0');